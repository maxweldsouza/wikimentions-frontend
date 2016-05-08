var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var Signup = require('./Signup');
var cookies = require('browser-cookies');
var ButtonSelect = require('./ButtonSelect');
var Notification = require('./Notification');
var requests = require('superagent');
var SubmitButton = require('./SubmitButton');
var config = require('./config');

var HomePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    getInitialState () {
        return {
            type: 'person',
            title: '',
            description: '',
            isbn: '',
            isbn13: '',
            url: '',
            submiting: false,
            error: false,
            message: ''
        };
    },
    onChangeType (x) {
        this.setState({
            type: x
        });
    },
    onChangeText (e) {
        var temp = {
            error: false,
            message: ''
        };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    onCloseError () {
        this.setState({
            error: false,
            message: ''
        });
    },
    validateForm () {
        var message;
        if (!this.state.title) {
            message = 'You need to provide a title';
        }
        if (message) {
            this.setState({
                error: true,
                message: message
            });
            return false;
        }
        return true;
    },
    onSubmit () {
        if (!this.validateForm()) {
            return;
        }
        this.setState({
            submiting: true
        });
        requests
        .post('/api/v1/thing')
        .type('form')
        .send({
            title: this.state.title,
            description: this.state.description,
            type: this.state.type,
            isbn: this.state.isbn,
            isbn13: this.state.isbn13,
            url: this.state.url,
            action: 'create',
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submiting: false
            });
            if (err && err.status) {
                this.setState({
                    error: true,
                    message: res.body.message
                });
            } else {
                Mentions.route(res.body.redirect);
            }
        });
    },
    render () {
        var options = [{name: 'Person', value: 'person'},
            {name: 'Book', value: 'book'},
            {name: 'Video', value: 'video'}];
        return (
            <span>
                <Helmet
                    title={'Create Page'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url + this.props.path}
                    ]}
                    />
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <form action='/api/v1/thing' method='post'>
                            <h1 className='page-title'>Create Page</h1>
                            <Notification level='alert' message={this.state.message} showing={this.state.error} onClose={this.onCloseError} closeable/>
                            <input type='text' name='title' placeholder='Title' value={this.state.title} onChange={this.onChangeText} required/>
                            <input type='text' name='description' placeholder='Description (Optional)' value={this.state.description} onChange={this.onChangeText}/>
                            <div className='row'>
                                <div className='small-12 columns'>
                                    Type
                                    <ButtonSelect
                                        name='type'
                                        options={options}
                                        onChange={this.onChangeType}/>
                                    {this.state.type === 'book' ? <input type='text' name='isbn' placeholder='ISBN' value={this.state.isbn} onChange={this.onChangeText}/> : null}
                                    {this.state.type === 'book' ? <input type='text' name='isbn13' placeholder='ISBN-13' value={this.state.isbn13} onChange={this.onChangeText}/> : null}
                                    {this.state.type === 'video' ? <input type='text' name='url' placeholder='Url' value={this.state.url} onChange={this.onChangeText}/> : null}
                                </div>
                            </div>
                            <div>
                                <SubmitButton title='Create' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
                            </div>
                        </form>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
