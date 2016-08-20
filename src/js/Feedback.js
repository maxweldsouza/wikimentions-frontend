var config = require('./config');
var cookies = require('browser-cookies');
var React = require('react');
var requests = require('superagent');
var Snackbar = require('./Snackbar');
var Input = require('./Input');

var Feedback = React.createClass({
    getInitialState () {
        return {
            step: 'rate',
            feedback: '',
            email: ''
        };
    },
    onChangeText (e) {
        var temp = {
            error: false,
            message: ''
        };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    onClear (name) {
        var temp = {};
        temp[name] = '';
        this.setState(temp);
    },
    onRate (rate) {
        requests
        .post('/api/v1/feedback')
        .type('form')
        .send({
            positive: rate,
            platform: window.navigator.platform,
            useragent: window.navigator.userAgent,
            url: window.location.pathname + window.location.search,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            if (err) {
                Snackbar({message: res.body.message});
            } else {
                this.setState({
                    step: 'feedback',
                    token: res.body.token
                });
            }
        });
    },
    onFeedback () {
        requests
        .post('/api/v1/feedback')
        .type('form')
        .send({
            token: this.state.token,
            feedback: this.state.feedback,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            if (err) {
                Snackbar({message: res.body.message});
            } else {
                this.setState({
                    step: 'email'
                });
            }
        });
    },
    onEmail () {
        requests
        .post('/api/v1/feedback')
        .type('form')
        .send({
            email: this.state.email,
            token: this.state.token,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            if (err) {
                Snackbar({message: res.body.message});
            } else {
                this.setState({
                    step: 'done'
                });
            }
        });
    },
    startOver () {
        this.setState({
            step: 'rate'
        });
    },
    render () {
        var main;
        if (this.state.step === 'rate') {
            main = <div style={{textAlign: 'right'}}>
                {config.name + ' is '}
                <span>
                    <button className='button small secondary no-margin-bottom' onClick={this.onRate.bind(null, 'good')}>
                        <i className='ion-checkmark'/> Great
                    </button>{' '}
                    <button className='button small secondary no-margin-bottom' onClick={this.onRate.bind(null, 'bad')}>
                        <i className='ion-close'/> Needs Work
                    </button>
                </span>
            </div>;
        } else if (this.state.step === 'feedback') {
            main = <div>
                How can we improve ?
                <textarea type='text' className='form-control' name='feedback' onChange={this.onChangeText}/>
                <div className='float-right small button-group'>
                    <button
                        className='button secondary no-margin-bottom'
                        onClick={this.startOver} role='button'>Cancel</button>
                    <button
                        className='button no-margin-bottom'
                        onClick={this.onFeedback} role='button'>Send Feedback</button>{' '}
                </div>
            </div>;
        } else if (this.state.step === 'email') {
            main = <div className=''>
                Would you like to leave your email?
                <Input
                    type='email'
                    className='form-control'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    valid={true}
                    message={''}/>
                <div className='float-right small button-group'>
                    <button
                        className='button secondary no-margin-bottom'
                        onClick={this.startOver} role='button'>No Thanks</button>
                    <button
                        className='button no-margin-bottom'
                        onClick={this.onEmail} role='button'>Save</button>{' '}
                </div>
            </div>;
        } else if (this.state.step === 'done') {
            main = <div>Thanks for your feedback! <button className='button small secondary no-margin-bottom' onClick={this.startOver}>Start Over</button></div>;
        }
        return main;
    }
});

module.exports = Feedback;
