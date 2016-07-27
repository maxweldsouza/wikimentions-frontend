var React = require('react');
var ButtonSelect = require('./ButtonSelect');
var AddBookNew = require('./AddBookNew');
var AddBookExisting = require('./AddBookExisting');
var Restricted = require('./Restricted');
var LoginModal = require('./LoginModal');

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
        var loggedOutMessage = <span>You need to <LoginModal/> to add a Book.</span>;
        return (
            <Restricted message={loggedOutMessage}>
                <div>
                    <h2>Add book</h2>
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
            </Restricted>
        );
    }
});

module.exports = AddBook;
