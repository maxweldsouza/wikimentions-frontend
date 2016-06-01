var React = require('react');
var ButtonSelect = require('./ButtonSelect');
var AddBookNew = require('./AddBookNew');
var AddBookExisting = require('./AddBookExisting');
var Notification = require('./Notification');

var AddBook = React.createClass({
    getInitialState () {
        return {
            type: 'Existing'
        };
    },
    onChangeType (x) {
        this.setState({
            type: x
        });
    },
    render () {
        var options = [{ name: 'Existing', value: 'Existing' }, { name: 'New', value: 'New' }];
        return (
            <div>
                Add a book by this author
                <ButtonSelect
                    options={options}
                    default={this.state.type}
                    onChange={this.onChangeType}
                    />
                {this.state.type !== 'New' ? <div>
                    <AddBookExisting id={this.props.id}/>
                </div> : <span>
                    <AddBookNew id={this.props.id}/>
                </span>}
            </div>
        );
    }
});

module.exports = AddBook;
