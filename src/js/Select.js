var React = require('react');
var requests = require('superagent');
var _ = require('underscore');
var Image = require('./Image');
var Placeholder = require('./Placeholder');

var Select = React.createClass({
    getInitialState () {
        return {
            focus: -1,
            editable: true,
            searchText: this.props.initialLabel ? this.props.initialLabel : '',
            value: this.props.initialValue ? this.props.initialValue : '',
            options: []
        };
    },
    onSearchTextChanged (e) {
        if (e.target.value.length > 1) {
            this.loadData(e.target.value);
        } else {
            this.setState({
                options: []
            });
        }
        this.setState({
            searchText: e.target.value
        });
    },
    onSelectValue (x) {
        this.setState({
            options: [],
            searchText: x.title,
            editable: false,
            value: x.id
        });
        if (this.props.onSelectValue) {
            this.props.onSelectValue(x);
        }
    },
    focusNext () {
        var next;
        if (this.state.focus === this.state.options.length - 1) {
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
        if (this.state.focus === -1) {
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
            if (this.state.focus >= 0) {
                this.onSelectValue(this.state.options[this.state.focus]);
            }
            break;
            default:
            return;
        }
    },
    loadData (x) {
        var typeQuery;
        if (this.props.types) {
            typeQuery = '?types=' + this.props.types.join(',');
        } else {
            typeQuery = '';
        }
        requests.get('/api/v1/autocomplete/' + x + typeQuery).end((err, res) => {
            this.setState({
                options: res.body
            });
        });
    },
    onClear () {
        this.setState({
            searchText: '',
            options: []
        });
    },
    render () {
        return (
            <div style={{position: 'relative'}} onKeyDown={this.handleKeys}>
                <input
                    type='text'
                    role='combobox'
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
                {this.state.options.length > 0 ? <div className='select-options'>
                    {this.state.options.map((entry, i) => {
                        var focused = i === this.state.focus;
                        focused = focused ? {'background': '#f3f3f3'} : {};

                        var image;
                        var imagedata = _.find(entry.images, function (x) {
                            if (entry.type === 'person') {
                                return x.width === 75 && x.height === 75;
                            } else {
                                return x.width === 150;
                            }
                        });
                        if (imagedata) {
                            image = <Image className='img' id={this.props.id} md5={imagedata.md5} width={imagedata.width} height={imagedata.height} displayWidth={50} displayHeight={50}/>;
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
                                {entry.title}
                                <div className='select-option-type'>
                                    {entry.type}
                                </div>
                            </div>
                        </div>;
                    })}
                    {this.props.moreOptions ? <div className='select-option'>
                        <a className='secondary' href={'/search?q=' + this.state.searchText}>More Results</a>
                    </div> : null}
                </div> : null}
            </div>
        );
    }
});

module.exports = Select;
