var React = require('react');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var MarkdownHelp = require('./MarkdownHelp');
var MarkdownInput = require('./MarkdownInput');
var cookies = require('browser-cookies');
var Snackbar = require('./Snackbar');
var Input = require('./Input');

var EditProfile = React.createClass({
    getInitialState () {
        return {
            submitting: false,
            email: '',
            about: '',
            preview: false,
            formMessage: ''
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
        if (e.target.name === 'about') {
            temp.preview = true;
        }
        this.setState(temp);
    },
    onClear (name) {
        var temp = {};
        temp[name] = '';
        this.setState(temp);
    },
    updateProfile (e) {
        e.preventDefault();
        this.setState({
            submitting: true
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
                submitting: false
            });
            if (err && err.status) {
                this.setState({
                    formMessage: res.body.message
                });
            } else {
                this.setState({
                    formMessage: ''
                });
                Snackbar({message: 'Profile updated'});
            }
        });
    },
    render () {
        return (
            <div className='tabs-panel is-active' role='tabpanel'>
                <div className='row'>
                    <div className='large-8 columns'>
                        <form className='columns box'>
                            <h2>Profile</h2>
                            {this.state.formMessage ? <div className='callout alert'>
                                {this.state.formMessage}
                            </div> : null}
                            Email
                            <Input
                                type='text'
                                name='email'
                                onChange={this.onChangeText}
                                value={this.state.email}
                                onClear={this.onClear}
                                valid={true}
                                message={''}/>
                            <MarkdownInput
                                name='about'
                                placeholder='Write something about yourself (Markdown is supported)'
                                label='About'
                                rows='5'
                                content={this.state.about}
                                onChange={this.onChangeText}
                                sideBySide={false}
                                maxLength={255} />
                            <SubmitButton
                                title='Save'
                                className='button primary float-right'
                                submitting={this.state.submitting}
                                onSubmit={this.updateProfile}/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = EditProfile;
