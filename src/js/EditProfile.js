var React = require('react');
var cookies = require('browser-cookies');

var EditProfile = React.createClass({
    getInitialState: function() {
        return {
            old: '',
            new: ''
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    changePassword () {
        requests
        .post('/api/v1/changepassword')
        .type('form')
        .send({
            old: this.state.old,
            new: this.state.new,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submiting: false
            });
            if (err && err.status) {
                Snackbar({message: res.body.message});
            } else {
                Snackbar({message: 'Password changed'});
                history.pushState(null, null, res.body.redirect);
                Mentions.route(res.body.redirect);
            }
        });
    },
    render () {
        return (
            <div className='card'>
                <div className='small-12 columns'>
                    <h2>Change Password</h2>
                    <form action='/api/v1/changepassword' method='post'>
                        <input type='password' name='old' placeholder='Old Password' onChange={this.onChangeText}/>
                        <input type='password' name='new' placeholder='New Password' onChange={this.onChangeText}/>
                        <input type='password' name='repeat' placeholder='Repeat Password' onChange={this.onChangeText}/>
                        <button type='submit' className='button'>Change Password</button>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = EditProfile;
