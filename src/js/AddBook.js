var React = require('react');
var ButtonSelect = require('./ButtonSelect');
var AddBookNew = require('./AddBookNew');
var AddBookExisting = require('./AddBookExisting');
var Restricted = require('./Restricted');
var LoginModal = require('./LoginModal');
var SignupModal = require('./SignupModal');

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
        var loggedOutMessage = <span>You need to <LoginModal/> / <SignupModal/> to add a Book.</span>;
        return (
            <Restricted message={loggedOutMessage}>
                <h2>Add book</h2>
                <div className='row'>
                    <div className='small-12 large-4 large-order-2 columns'>
                        <div className='callout warning'>
                            Check whether a book already exists before adding a new one. Adding a new book will create a separate page.
                        </div>
                    </div>
                    <div className='small-12 large-8 large-order-1 columns'>
                        <ButtonSelect
                            options={options}
                            default={this.state.type}
                            onChange={this.onChangeType}
                            />
                        {this.state.type !== 'New' ? <div>
                            <AddBookExisting id={this.props.id} loggedin={this.props.loggedin}/>
                        </div> : <span>
                            <AddBookNew id={this.props.id} loggedin={this.props.loggedin}/>
                        </span>}
                    </div>
                </div>
            </Restricted>
        );
    }
});

module.exports = AddBook;
