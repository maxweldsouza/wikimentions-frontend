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
        if (this.state.searchText.length > 1) {
            this.loadData();
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
    loadData () {
        requests.get('/api/v1/search/' + this.state.searchText).end((err, res) => {
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
