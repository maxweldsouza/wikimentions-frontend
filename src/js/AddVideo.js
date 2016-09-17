var React = require('react');
var ButtonSelect = require('./ButtonSelect');
var AddVideoNew = require('./AddVideoNew');
var AddVideoExisting = require('./AddVideoExisting');
var Restricted = require('./Restricted');
var LoginModal = require('./LoginModal');
var SignupModal = require('./SignupModal');
var IpWarning = require('./IpWarning');

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
        var loggedOutMessage = <span>You need to <LoginModal/> / <SignupModal/> to add a Video.</span>;
        return (
            <Restricted message={loggedOutMessage}>
                <h2>Add video</h2>
                <div className='row'>
                    <div className='small-12 large-4 large-order-2 columns'>
                        <div className='callout warning'>
                            Check whether a video already exists before adding a new one. Adding a new video will create a separate page.
                        </div>
                    </div>
                    <div className='small-12 large-8 large-order-1 columns'>
                        <IpWarning loggedin={this.props.loggedin}/>
                        <ButtonSelect
                            options={options}
                            default={this.state.type}
                            onChange={this.onChangeType}
                            />
                        {this.state.type !== 'New' ? <div>
                            <AddVideoExisting id={this.props.id} loggedin={this.props.loggedin}/>
                        </div> : <span>
                            <AddVideoNew id={this.props.id} loggedin={this.props.loggedin}/>
                        </span>}
                    </div>
                </div>
            </Restricted>
        );
    }
});

module.exports = AddVideo;
