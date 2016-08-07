var React = require('react');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var MarkdownHelp = require('./MarkdownHelp');

var EditProfile = React.createClass({
    getInitialState () {
        return {
            submitting: false,
            email: '',
            about: '',

        };
    },
    componentDidMount () {
        requests
        .get('/api/v1/user/' + this.props.id)
        .end((err, res) => {
            this.setState({
                email: res.body.email,
                about: res.body.about
            });
        });
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    updateProfile () {
        this.setState({
            submiting: true
        });
        requests
        .post('/api/v1/user/' + this.props.id)
        .type('form')
        .send({
            email: this.state.email,
            about: this.state.about,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submiting: false
            });
            if (err && err.status) {
                Snackbar({message: res.body.message});
            } else {
                Snackbar({message: 'Profile updated'});
            }
        });
    },
    render () {
        return (
            <div className='tabs-panel is-active' role='tabpanel'>
                <div className='row'>
                    <div className='large-8 columns'>
                        <h2>Profile</h2>
                        Email
                        <input type='text' name='email' onChange={this.onChangeText} value={this.state.email}/>
                        About <MarkdownHelp />
                        <textarea type='text' name='about' onChange={this.onChangeText} value={this.state.about} rows={6}/>
                        <SubmitButton title='Save' className='button primary float-right' submitting={this.state.submitting} onSubmit={this.updateProfile}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = EditProfile;
