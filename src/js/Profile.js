import React from 'react';
import cookies from 'browser-cookies';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import EditProfile from './EditProfile';
import Markdown from './Markdown';
import autoBind from 'react-autobind';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            tab: 'Profile'
        };
    }
    changeTab(tab) {
        this.setState({
            tab
        });
    }
    render() {
        const tabs = ['Profile', 'Change Password', 'Delete Account'];
        return (
            <div className="row">
                <div className="small-12 large-3 columns">
                    <ul className="tabs vertical">
                        {tabs.map(x => {
                            return (
                                <li
                                    key={x}
                                    role="presentation"
                                    className={
                                        this.state.tab === x
                                            ? 'tabs-title is-active'
                                            : 'tabs-title'
                                    }
                                    onClick={this.changeTab.bind(null, x)}
                                >
                                    <a
                                        aria-selected={this.state.tab === x}
                                        tabIndex={0}
                                        role="tab"
                                    >
                                        {x}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="large-9 columns">
                    <div className="tabs-content vertical">
                        {this.state.tab === 'Profile'
                            ? <EditProfile id={this.props.id} />
                            : null}
                        {this.state.tab === 'Change Password'
                            ? <ChangePassword />
                            : null}
                        {this.state.tab === 'Delete Account'
                            ? <DeleteAccount id={this.props.id} />
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
