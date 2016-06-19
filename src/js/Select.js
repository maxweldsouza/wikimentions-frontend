var React = require('react');
var requests = require('superagent');
var _ = require('underscore');
var Image = require('./Image');
var Placeholder = require('./Placeholder');

var Select = React.createClass({
    getInitialState () {
        return {
            focus: 0,
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
            next = 0;
        } else {
            next = this.state.focus + 1;
        }
        this.setState({
            focus: next
        });
    },
    focusPrev () {
        var prev;
        if (this.state.focus === 0) {
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
            break;
            case 'ArrowUp':
            this.focusPrev();
            break;
            case 'Enter':
            this.onSelectValue(this.state.options[this.state.focus]);
            break;
            default:
            return;
        }
    },
    loadData (x) {
        requests.get('/api/v1/autocomplete/' + x).end((err, res) => {
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
                    onKeyDown={this.handleKeys}
                    />
                {this.state.options.length > 0 ? <div className='select-options'>
                    {this.state.options.map((entry, i) => {
                        var focused = i === this.state.focus;
                        focused = focused ? {'background': '#f3f3f3'} : {};

                        var image;
                        var imagedata = _.find(entry.images, function (x) {
                            return x.width === 75 && x.height === 75;
                        });
                        if (imagedata) {
                            image = <Image className='img-person' id={this.props.id} md5={imagedata.md5} width={75} height={75} displayWidth={50} displayHeight={50}/>;
                        } else {
                            image = <Placeholder style={{'height': 50, 'lineHeight': '50px', 'width': 50}}/>;
                        }
                        return <div
                            key={entry.id}
                            className='select-option'
                            value={entry.id}
                            style={focused}
                            onClick={this.onSelectValue.bind(null, entry)}
                            >
                            <div className='row'>
                                <div className='shrink columns'>
                                    {image}
                                </div>
                                <div className='columns'>
                                    {entry.title}
                                    <div className='select-option-type'>
                                        {entry.type}
                                    </div>
                                </div>
                            </div>
                        </div>;
                    })}
                </div> : null}
            </div>
        );
    }
});

module.exports = Select;
