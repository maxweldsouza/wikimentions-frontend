var React = require('react');
var requests = require('superagent');
var _ = require('underscore');
var Thumbnail = require('./Thumbnail');
var Input = require('./Input');

var Select = React.createClass({
    getDefaultProps () {
        return {
            autocomplete: true,
            className: '',
            valid: true,
            autoFocus: false,
            message: ''
        };
    },
    getInitialState () {
        return {
            focus: -1,
            editable: true,
            searchText: this.props.initialLabel ? this.props.initialLabel : '',
            value: this.props.initialValue ? this.props.initialValue : '',
            options: [],
            loading: false,
            error: false,
            visible: false
        };
    },
    componentDidMount () {
        window.addEventListener('click', this._hideDropdown, false);
    },
    componentWillUnmount () {
        window.removeEventListener('click', this._hideDropdown, false);
    },
    _hideDropdown () {
        this.setState({
            visible: false
        });
    },
    onSearchTextChanged (e) {
        if (this.props.onSearchTextChanged) {
            this.props.onSearchTextChanged(e.target.value);
        }
        if (e.target.value.length > 1) {
            this.loadData(e.target.value);
            this.setState({
                loading: true,
                searchText: e.target.value,
                visible: true,
                value: ''
            });
        } else if (e.target.value.length >= 0) {
            this.setState({
                options: [],
                searchText: e.target.value,
                visible: false,
                value: ''
            });
        }
    },
    onSelectValue (x) {
        this.setState({
            options: [],
            searchText: x.props.title,
            editable: false,
            value: x.id,
            visible: false
        });
        if (this.props.onSelectValue) {
            this.props.onSelectValue(x);
        }
    },
    focusNext () {
        var next;
        if (this.state.focus >= this.state.options.length - 1) {
            next = -1;
        } else {
            next = this.state.focus + 1;
        }
        this.setState({
            focus: next
        });
    },
    focusPrev () {
        var prev;
        if (this.state.focus <= -1) {
            prev = this.state.options.length - 1;
        } else {
            prev = this.state.focus - 1;
        }
        this.setState({
            focus: prev
        });
    },
    handleKeys (event) {
        switch (event.key) {
            case 'ArrowDown':
                this.focusNext();
                event.preventDefault();
                break;
            case 'ArrowUp':
                this.focusPrev();
                event.preventDefault();
                break;
            case 'Enter':
                if (this.state.focus === -1 && this.props.moreResults) {
                    this.onClickMoreResults();
                }
                if (this.state.focus >= 0) {
                    this.onSelectValue(this.state.options[this.state.focus]);
                }
                break;
            default:
                return;
        }
    },
    loadData: _.throttle(function (x) {
        var typeQuery;
        if (this.props.types) {
            typeQuery = '?types=' + this.props.types.join(',');
        } else {
            typeQuery = '';
        }
        if (this.props.autocomplete) {
            requests.get('/api/v1/autocomplete/' + encodeURIComponent(x) + typeQuery).end((err, res) => {
                if (err && err.status) {
                    this.setState({
                        loading: false,
                        options: [],
                        error: true
                    });
                } else {
                    this.setState({
                        loading: false,
                        options: res.body,
                        error: false
                    });
                }
            });
        } else {
            requests.get('/api/v1/search/' + encodeURIComponent(x) + typeQuery).end((err, res) => {
                if (err && err.status) {
                    this.setState({
                        loading: false,
                        options: [],
                        error: true
                    });
                } else {
                    this.setState({
                        loading: false,
                        options: res.body.results,
                        error: false
                    });
                }
            });
        }
    }, 1000),
    onClear () {
        this.setState({
            searchText: '',
            options: [],
            visible: false
        });
    },
    onClickMoreResults () {
        var path = '/search?q=' + this.state.searchText;
        this.onClear();
        history.pushState(null, null, path);
        Mentions.route(path);
    },
    render () {
        return (
            <div style={{position: 'relative'}} onKeyDown={this.handleKeys}>
                <Input
                    type='text'
                    role='combobox'
                    aria-haspopup={true}
                    aria-expanded={this.state.visible}
                    style={{width: this.props.width}}
                    className={this.props.className}
                    value={this.state.searchText}
                    valid={this.props.valid}
                    message={this.props.message}
                    placeholder={this.props.placeholder}
                    autoComplete='off'
                    spellCheck='false'
                    aria-label='Search'
                    autoFocus={this.props.autoFocus}
                    onChange={this.onSearchTextChanged}
                    onKeyDown={this.handleKeys}/>
                {this.state.searchText.length > 0 ? <span onClick={this.onClear} className='ion-backspace select-clear'/> : null}
                <input
                    name={this.props.name}
                    type='hidden'
                    value={this.state.value}
                    required={this.props.required}
                    />
                {this.state.visible ? <div className='select-options'>
                    {!this.state.loading && this.state.options.length === 0 ? <div className='select-option select-option-message'>
                        No results
                    </div> : null}
                    {this.state.loading && this.state.options.length === 0 ? <div className='select-option select-option-message'>
                        Loading...
                    </div> : null}
                    {this.state.options.map((entry, i) => {
                        var focused = i === this.state.focus;
                        focused = focused ? {'background': '#f3f3f3'} : {};

                        return <div
                            key={entry.id}
                            className='select-option'
                            value={entry.id}
                            style={focused}
                            onClick={this.onSelectValue.bind(null, entry)}
                            >
                            <div className='select-option-image'>
                                <Thumbnail
                                    alt={entry.props.title}
                                    type={entry.props.type}
                                    image={entry.image}
                                    url={entry.props.url}
                                    displayWidth={50} />
                            </div>
                            <div className=''>
                                {entry.props.title}
                                <div className='select-option-type'>
                                    {entry.props.type}
                                </div>
                            </div>
                        </div>;
                    })}
                    {this.state.error ? <div className='select-option'>
                        Search failed
                    </div> : null}
                    {this.props.moreResults ? <div className='select-option select-more-results' onClick={this.onClickMoreResults}>
                        <a className='secondary'>More Results</a>
                    </div> : null}
                </div> : null}
            </div>
        );
    }
});

module.exports = Select;
