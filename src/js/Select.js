var React = require('react');
var requests = require('superagent');
var _ = require('underscore');

var Select = React.createClass({
    getInitialState: function() {
        return {
            searchText: '',
            value: '',
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
            value: x.id
        });
    },
    loadData (x) {
        requests.get('/api/v1/search/' + x).end((err, res) => {
            this.setState({
                options: res.body
            });
        })
    },
    onClear () {
        this.setState({
            searchText: '',
            options: []
        });
    },
    render () {
        return (
            <label style={{position: 'relative'}}>
                    <input
                        type='text'
                        role='combobox'
                        value={this.state.searchText}
                        onChange={this.onSearchTextChanged}></input>
                    {this.state.searchText.length > 0 ? <span onClick={this.onClear} className='ion-backspace select-clear'/> : null}
                    <input
                        name={this.props.name}
                        type='hidden'
                        value={this.state.value}
                    />
                    {this.state.options.length > 0 ? <div className='select-options'>
                        {this.state.options.map((x) => {
                            return <div
                                        className='select-option'
                                        value={x.id}
                                        onClick={this.onSelectValue.bind(null, x)}
                                        >{x.title}</div>;
                        })}
                    </div> : null}
            </label>
        );
    }
});

module.exports = Select;
