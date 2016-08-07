var React = require('react');
var cookies = require('browser-cookies');

var ChangePassword = require('./ChangePassword');
var DeleteAccount = require('./DeleteAccount');
var EditProfile = require('./EditProfile');

var Profile = React.createClass({
    getInitialState () {
        return {
            tab: 'Edit Profile'
        };
    },
    changeTab (tab) {
        this.setState({
            tab: tab
        });
    },
    render () {
        var tabs = ['Edit Profile', 'Change Password', 'Delete Account']
        return (
            <div className='row collapse'>
                <div className='small-12 large-3 columns'>
                    <ul className="tabs vertical">
                        {tabs.map((x) => {
                            return <li
                                key={x}
                                role='presentation'
                                className={this.state.tab === x ? 'tabs-title is-active' : 'tabs-title'}
                                onClick={this.changeTab.bind(null, x)}><a
                                aria-selected={this.state.tab === x}
                                role='tab'>{x}</a>
                            </li>;
                        })}
                    </ul>
                </div>
                <div className='large-9 columns'>
                    <div className='tabs-content vertical'>
                        {this.state.tab === 'Edit Profile' ? <EditProfile id={this.props.id}/> : null}
                        {this.state.tab === 'Change Password' ? <ChangePassword /> : null}
                        {this.state.tab === 'Delete Account' ? <DeleteAccount id={this.props.id}/> : null}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Profile;
