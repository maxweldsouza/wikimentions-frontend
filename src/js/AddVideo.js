var React = require('react');
var ButtonSelect = require('./ButtonSelect');
var AddVideoNew = require('./AddVideoNew');
var AddVideoExisting = require('./AddVideoExisting');
var Restricted = require('./Restricted');
var LoginModal = require('./LoginModal');

var AddVideo = React.createClass({
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
        var loggedOutMessage = <span>You need to <LoginModal/> to add a Video.</span>;
        return (
            <Restricted message={loggedOutMessage}>
                <div>
                    <h2>Add video</h2>
                    <ButtonSelect
                        options={options}
                        default={this.state.type}
                        onChange={this.onChangeType}
                        />
                    {this.state.type !== 'New' ? <div>
                        <AddVideoExisting id={this.props.id}/>
                    </div> : <span>
                        <AddVideoNew id={this.props.id}/>
                    </span>}
                </div>
            </Restricted>
        );
    }
});

module.exports = AddVideo;
