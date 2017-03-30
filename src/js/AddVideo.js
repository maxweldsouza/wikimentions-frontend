import React from 'react';
import ButtonSelect from './ButtonSelect';
import AddVideoNew from './AddVideoNew';
import AddVideoExisting from './AddVideoExisting';
import Restricted from './Restricted';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import IpWarning from './IpWarning';
import autoBind from 'react-autobind';

class AddVideo extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            type: 'Existing'
        };
    }
    onChangeType(x) {
        this.setState({
            type: x
        });
    }
    render() {
        const options = [
            { name: 'Existing', value: 'Existing' },
            { name: 'New', value: 'New' }
        ];
        const loggedOutMessage = (
            <span>
                You need to <LoginModal /> / <SignupModal /> to add a Video.
            </span>
        );
        return (
            <Restricted message={loggedOutMessage}>
                <h2>Add video</h2>
                <div className="row">
                    <div className="small-12 large-4 large-order-2 columns">
                        <div className="callout warning">
                            Check whether a video already exists before adding a new one. Adding a new video will create a separate page.
                        </div>
                    </div>
                    <div className="small-12 large-8 large-order-1 columns">
                        <IpWarning loggedin={this.props.loggedin} />
                        <ButtonSelect
                            options={options}
                            default={this.state.type}
                            onChange={this.onChangeType}
                        />
                        {this.state.type !== 'New'
                            ? <div>
                                  <AddVideoExisting
                                      id={this.props.id}
                                      loggedin={this.props.loggedin}
                                  />
                              </div>
                            : <span>
                                  <AddVideoNew
                                      id={this.props.id}
                                      loggedin={this.props.loggedin}
                                  />
                              </span>}
                    </div>
                </div>
            </Restricted>
        );
    }
}

export default AddVideo;
