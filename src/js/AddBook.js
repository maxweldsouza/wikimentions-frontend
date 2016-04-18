var React = require('react');
var ButtonSelect = require('./ButtonSelect');
var AddBookNew = require('./AddBookNew');
var AddBookExisting = require('./AddBookExisting');
var Notification = require('./Notification');

var AddBook = React.createClass({
    getInitialState: function() {
        return {
            type: 'New'
        };
    },
    onChangeType (x) {
        this.setState({
            type: x
        });
    },
    render () {
        var options = [{name:'New', value: 'New'}, {name: 'Existing', value:'Existing'}];
        return (
            <div>
                Add a book by this author
                <ButtonSelect
                    options={options}
                    default={this.state.type}
                    onChange={this.onChangeType}
                    />
                {this.state.type === 'New' ? <div>
                    <AddBookNew id={this.props.id}/>
                </div> : <span>
                    <AddBookExisting id={this.props.id}/>
                </span>}
            </div>
        );
    }
});

module.exports = AddBook;
