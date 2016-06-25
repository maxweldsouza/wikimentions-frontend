var React = require('react');
var Modal = require('react-modal');
var cookies = require('browser-cookies');
var Xsrf = require('./Xsrf');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');
var Snackbar = require('./Snackbar');

var LoginModal = React.createClass({
    getInitialState () {
        return {
            modalIsOpen: false,
            submitting: false
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
    login () {
        this.setState({
            submiting: true
        });
        requests
        .post('/api/v1/login')
        .type('form')
        .send({
            username: this.state.username,
            password: this.state.password,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submiting: false
            });
            if (err && err.status) {
                Snackbar({message: 'Login failed'});
            } else {
                this.closeModal();
                Snackbar({message: 'Logged in'});
                history.pushState(null, null, '/');
                Mentions.route('/');
            }
        });
    },
    render () {
        return (
            <a onClick={this.onOpenModal}>
                Login
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className='modal-content'
                    overlayClassName='modal-overlay'>
                    <div className='small-12 columns'>
                        <form action='/api/v1/login' method='post'>
                            <h1>Login</h1>
                            <input type='text' name='username' placeholder='Username' onChange={this.onChangeText}/>
                            <input type='password' name='password' placeholder='Password' onChange={this.onChangeText}/>
                            <SubmitButton title='Login' className='expanded button' submitting={this.state.submitting} onSubmit={this.login}/>
                        </form>
                    </div>
                </Modal>
            </a>
        );
    }
});

module.exports = LoginModal;
