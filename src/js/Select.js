var React = require('react');
var requests = require('superagent');
var _ = require('underscore');
var Image = require('./Image');
var Placeholder = require('./Placeholder');

var Select = React.createClass({
    getDefaultProps () {
        return {
            autocomplete: true,
            className: ''
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
                searchText: e.target.value,
                visible: true
            });
        } else if (e.target.value.length >= 0) {
            this.setState({
                options: [],
                searchText: e.target.value,
                visible: false
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
    loadData: _.debounce(function (x) {
        this.setState({
            loading: true
        });
        var typeQuery;
        if (this.props.types) {
            typeQuery = '?types=' + this.props.types.join(',');
        } else {
            typeQuery = '';
        }
        if (this.props.autocomplete) {
            requests.get('/api/v1/autocomplete/' + x + typeQuery).end((err, res) => {
                if (err && err.status) {
                    this.setState({
                        loading: false,
                        options: [],
                        visible: true,
                        error: true
                    });
                } else {
                    this.setState({
                        loading: false,
                        options: res.body,
                        visible: true
                    });
                }
            });
        } else {
            requests.get('/api/v1/search/' + x + typeQuery).end((err, res) => {
                if (err && err.status) {
                    this.setState({
                        loading: false,
                        options: [],
                        visible: true,
                        error: true
                    });
                } else {
                    this.setState({
                        loading: false,
                        options: res.body.results,
                        visible: true
                    });
                }
            });
        }
    }, 500),
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
                <input
                    type='text'
                    role='combobox'
                    aria-haspopup={true}
                    aria-expanded={this.state.visible}
                    style={{width: this.props.width}}
                    className={this.props.className}
                    value={this.state.searchText}
                    placeholder={this.props.placeholder}
                    onChange={this.onSearchTextChanged}
                    onKeyDown={this.handleKeys}>
                </input>
                {this.state.searchText.length > 0 ? <span onClick={this.onClear} className='ion-backspace select-clear'/> : null}
                <input
                    name={this.props.name}
                    type='hidden'
                    value={this.state.value}
                    required={this.props.required}
                    />
                {this.state.visible ? <div className='select-options'>
                    {this.state.options.map((entry, i) => {
                        var focused = i === this.state.focus;
                        focused = focused ? {'background': '#f3f3f3'} : {};

                        var image = entry.image;
                        if (image) {
                            image = <Image className='img' id={entry.id} md5={image.thumb_md5} width={image.thumb_width} height={image.thumb_height} displayWidth={50} displayHeight={50}/>;
                        } else {
                            image = <Placeholder style={{ height: 50, lineHeight: '50px', width: 50}}/>;
                        }
                        return <div
                            key={entry.id}
                            className='select-option'
                            value={entry.id}
                            style={focused}
                            onClick={this.onSelectValue.bind(null, entry)}
                            >
                            <div className='select-option-image'>
                                {image}
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
                    {this.props.moreResults ? <div className='select-option' onClick={this.onClickMoreResults}>
                        <a className='secondary'>More Results</a>
                    </div> : null}
                </div> : null}
            </div>
        );
    }
});

module.exports = Select;
