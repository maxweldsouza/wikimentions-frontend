var React = require('react');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var cookies = require('browser-cookies');

var DeleteAccount = React.createClass({
    getInitialState () {
        return {
            submitting: false,
            password: ''
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    deleteAccount () {
        if (!this.state.password) {
            Snackbar({message: 'Password is empty'});
        } else {
            this.setState({
                submiting: true
            });
            requests
            .post('/api/v1/user/' + this.props.id + '/delete')
            .type('form')
            .send({
                password: this.state.password,
                _xsrf: cookies.get('_xsrf')
            })
            .end((err, res) => {
                this.setState({
                    submiting: false
                });
                if (err && err.status) {
                    Snackbar({message: res.body.message});
                } else {
                    Snackbar({message: 'Account permanently deleted'});
                    history.pushState(null, null, '/');
                    Mentions.route('/');
                }
            });
        }
    },
    render () {
        return (
            <div className='tabs-panel is-active' role='tabpanel'>
                <div className='row'>
                    <div className='large-8 columns'>
                        <div className='columns box'>
                            <h2>Delete Account</h2>
                            <div className='callout warning'>
                                If you delete your account all your account information will be deleted. Any edits/contributions will NOT be deleted. This cannot be undone.
                            </div>
                            Password
                            <input type='password' name='password' onChange={this.onChangeText} value={this.state.password}/>
                            <SubmitButton title='Delete Account' className='button alert float-right' submitting={this.state.submitting} onSubmit={this.deleteAccount}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DeleteAccount;
