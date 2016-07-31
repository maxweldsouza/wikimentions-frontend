var React = require('react');

var SubmitButton = require('./SubmitButton');
var cookies = require('browser-cookies');
var requests = require('superagent');
var Snackbar = require('./Snackbar');
var Input = require('./Input');

var AddBookNew = React.createClass({
    getInitialState () {
        return {
            title: '',
            description: '',
            titleValid: true,
            titleMessage: ''
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
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
                action: 'create',
                _xsrf: cookies.get('_xsrf')
            })
            .end((err, res) => {
                if (err && err.status) {
                    Snackbar({message: res.body.message});
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
                            Snackbar({message: res2.body.message});
                        } else {
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
                Title
                <Input type='text' name='title' value={this.state.title} onChange={this.onChangeText} valid={this.state.titleValid} message={this.state.titleMessage}/>
                Description (Optional)
                <input type='text' name='description' value={this.state.description} onChange={this.onChangeText} />
                <SubmitButton title='Create' className='button primary' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
            </form>
        );
    }
});

module.exports = AddBookNew;
