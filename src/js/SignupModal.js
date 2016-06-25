var React = require('react');
var Modal = require('react-modal');
var cookies = require('browser-cookies');
var Xsrf = require('./Xsrf');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var Snackbar = require('./Snackbar');

var SignupModal = React.createClass({
    getInitialState () {
        return {
            modalIsOpen: false,
            username: '',
            password: '',
            email: '',
            retypePassword: ''
        };
    },
    onOpenModal () {
        this.setState({
            modalIsOpen: true
        });
    },
    closeModal () {
        this.setState({modalIsOpen: false});
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    signup () {
        if (this.state.password !== this.state.retypePassword) {
            Snackbar({message: 'Passwords do not match'});
            return;
        }
        this.setState({
            submiting: true
        });
        requests
        .post('/api/v1/signup')
        .type('form')
        .send({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submiting: false
            });
            if (err && err.status) {
                Snackbar({message: 'Something went wrong'});
            } else {
                this.closeModal();
                Snackbar({message: 'Signup'});
                history.pushState(null, null, '/');
                Mentions.route('/');
            }
        });
    },
    render () {
        return (
            <a onClick={this.onOpenModal}>
                Sign up
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className='modal-content'
                    overlayClassName='modal-overlay'>
                    <div className='small-12 columns'>
                        <h1>Sign Up</h1>
                        You will be user #TODO if you sign up now
                        <form action='/api/v1/signup' method='post'>
                            <Xsrf/>
                            <input type='text' name='username' placeholder='Username' onChange={this.onChangeText} />
                            <input type='text' name='email' placeholder='E-mail (optional)' />
                            <input type='password' name='password' placeholder='Password'  onChange={this.onChangeText}/>
                            <input type='password' name='retypePassword' placeholder='Retype Password'  onChange={this.onChangeText}/>
                            <SubmitButton title='Signup' className='expanded button' submitting={this.state.submitting} onSubmit={this.signup}/>
                        </form>
                    </div>
                </Modal>
            </a>
        );
    }
});

module.exports = SignupModal;
