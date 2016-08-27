var React = require('react');

var SubmitButton = require('./SubmitButton');
var cookies = require('browser-cookies');
var requests = require('superagent');
var Snackbar = require('./Snackbar');
var Input = require('./Input');
var IpWarning = require('./IpWarning');

var AddBookNew = React.createClass({
    getInitialState () {
        return {
            title: '',
            description: '',
            titleValid: true,
            titleMessage: '',
            formMessage: ''
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    onClear (name) {
        var temp = {};
        temp[name] = '';
        this.setState(temp);
    },
    validateForm () {
        var valid = true;
        if (!this.state.title) {
            this.setState({
                titleValid: false,
                titleMessage: 'Title cannot be empty'
            });
            valid = false;
        } else {
            this.setState({
                titleValid: true,
                titleMessage: ''
            });
        }
        return valid;
    },
    onSubmit () {
        if (this.validateForm()) {
            this.setState({
                submitting: true
            });
            requests
            .post('/api/v1/thing')
            .type('form')
            .send({
                title: this.state.title,
                description: this.state.description,
                type: 'book',
                _xsrf: cookies.get('_xsrf')
            })
            .end((err, res) => {
                if (err && err.status) {
                    this.setState({
                        formMessage: res.body.message
                    });
                } else {
                    requests
                    .post('/api/v1/thing/' + this.props.id + '/books')
                    .type('form')
                    .send({
                        book_id: res.body.id,
                        _xsrf: cookies.get('_xsrf')
                    })
                    .end((err2, res2) => {
                        this.setState({
                            submitting: false,
                            title: '',
                            description: ''
                        });
                        if (err2 && err2.status) {
                            this.setState({
                                formMessage: res2.body.message
                            });
                        } else {
                            this.setState({
                                formMessage: ''
                            });
                            Snackbar({message: 'Book added'});
                            history.pushState(null, null, window.location.pathname + window.location.search);
                            Mentions.route(window.location.pathname + window.location.search);
                        }
                    });
                }
            });
        }
    },
    render () {
        return (
            <form method='post' action={'/api/v1/thing/' + this.props.id + '/books'}>
                {this.state.formMessage ? <div className='callout alert'>
                    {this.state.formMessage}
                </div> : null}
                Title
                <Input
                    type='text'
                    name='title'
                    value={this.state.title}
                    onChange={this.onChangeText}
                    onClear={this.onClear}
                    valid={this.state.titleValid}
                    message={this.state.titleMessage}/>
                Description (Optional)
                <Input
                    type='text'
                    name='description'
                    value={this.state.description}
                    onChange={this.onChangeText} />
                <IpWarning loggedin={this.props.loggedin}/>
                <SubmitButton title='Create' className='button primary float-right' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
            </form>
        );
    }
});

module.exports = AddBookNew;
