import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import cookies from 'browser-cookies';
import ButtonSelect from './ButtonSelect';
import snackbar from './snackbar';
import requests from 'superagent';
import SubmitButton from './SubmitButton';
import config from './config';
import Restricted from './Restricted';
import Input from './Input';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import IpWarning from './IpWarning';
import autoBind from 'react-autobind';

class HomePage extends React.Component {
    static resources() {
        return {
            api: []
        };
    }
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            type: 'person',
            title: this.props.query.title ? this.props.query.title : '',
            titleValid: true,
            titleMessage: '',
            description: '',
            isbn: '',
            isbn13: '',
            url: '',
            urlValid: true,
            urlMessage: '',
            submitting: false,
            formMessage: ''
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.query.title) {
            this.setState({
                title: nextProps.query.title
            });
        }
    }
    onChangeType(x) {
        this.setState({
            type: x
        });
    }
    onChangeText(e) {
        const temp = {
            error: false,
            message: ''
        };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    }
    onClear(name) {
        const temp = {};
        temp[name] = '';
        this.setState(temp);
    }
    validateForm() {
        let valid = true;
        if (!this.state.title) {
            this.setState({
                titleValid: false,
                titleMessage: 'Title cannot be empty'
            });
            valid = false;
        }
        if (this.state.type === 'video' && !this.state.url) {
            this.setState({
                urlValid: false,
                urlMessage: 'Url cannot be empty'
            });
            valid = false;
        }
        return valid;
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.setState({
                submitting: true
            });
            const data = {
                title: this.state.title,
                description: this.state.description,
                type: this.state.type,
                _xsrf: cookies.get('_xsrf')
            };
            if (this.state.type === 'book') {
                data.isbn = this.state.isbn;
                data.isbn13 = this.state.isbn13;
            } else if (
                this.state.type === 'video' || this.state.type === 'person'
            ) {
                data.url = this.state.url;
            }
            requests
                .post('/api/v1/thing')
                .type('form')
                .send(data)
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
                        snackbar({ message: 'Page created' });
                        history.pushState(null, null, res.body.redirect);
                        Mentions.route(res.body.redirect);
                    }
                });
        }
    }
    render() {
        const options = [
            { name: 'Person', value: 'person' },
            { name: 'Book', value: 'book' },
            { name: 'Video', value: 'video' }
        ];
        const loggedOutMessage = (
            <span>
                You need to <LoginModal /> / <SignupModal /> to create a page.
            </span>
        );
        return (
            <span>
                <Helmet
                    title={'Create Page'}
                    titleTemplate={`%s - ${config.name}`}
                    meta={[
                        {
                            name: 'description',
                            content: 'Create a new page on WikiMentions'
                        }
                    ]}
                    link={[
                        { rel: 'canonical', href: config.url + this.props.path }
                    ]}
                />
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}
                />
                <div className="row page-body white">
                    <div className="small-12 columns">
                        <div>
                            <h1>Create Page</h1>
                            {this.state.formMessage
                                ? <div className="callout alert">
                                      {this.state.formMessage}
                                  </div>
                                : null}
                            <Restricted message={loggedOutMessage}>
                                <div className="row">
                                    <div
                                        className="small-12 large-4 large-order-2 columns"
                                    >
                                        <div className="callout warning">
                                            Search to check whether a page already exists before adding a new one. Make sure you have read our
                                            {' '}
                                            <a href="/guidelines">Guidelines</a>
                                        </div>
                                    </div>
                                    <div
                                        className="small-12 large-8 large-order-1  columns"
                                    >
                                        <IpWarning
                                            loggedin={this.props.loggedin}
                                        />
                                        <form onSubmit={this.onSubmit}>
                                            Type
                                            <ButtonSelect
                                                name="type"
                                                options={options}
                                                default={'person'}
                                                onChange={this.onChangeType}
                                            />
                                            Title (Name of person, book or video)
                                            <Input
                                                type="text"
                                                name="title"
                                                value={this.state.title}
                                                onChange={this.onChangeText}
                                                onClear={this.onClear}
                                                valid={this.state.titleValid}
                                                message={
                                                    this.state.titleMessage
                                                }
                                            />
                                            {this.state.type === 'video'
                                                ? <span>
                                                      Url
                                                      <Input
                                                          type="text"
                                                          name="url"
                                                          value={this.state.url}
                                                          onChange={
                                                              this.onChangeText
                                                          }
                                                          onClear={this.onClear}
                                                          valid={
                                                              this.state.urlValid
                                                          }
                                                          placeholder="http://"
                                                          message={
                                                              this.state.urlMessage
                                                          }
                                                      />
                                                  </span>
                                                : null}
                                            {this.state.type === 'person'
                                                ? <span>
                                                      Description (Optional)
                                                      <Input
                                                          type="text"
                                                          name="description"
                                                          value={
                                                              this.state.description
                                                          }
                                                          onChange={
                                                              this.onChangeText
                                                          }
                                                          onClear={this.onClear}
                                                      />
                                                  </span>
                                                : null}
                                            {this.state.type === 'person'
                                                ? <span>
                                                      Url (Optional)
                                                      <Input
                                                          type="text"
                                                          name="url"
                                                          value={this.state.url}
                                                          onChange={
                                                              this.onChangeText
                                                          }
                                                          onClear={this.onClear}
                                                          valid={
                                                              this.state.urlValid
                                                          }
                                                          placeholder="http://"
                                                          message={
                                                              this.state.urlMessage
                                                          }
                                                      />
                                                  </span>
                                                : null}
                                            <SubmitButton
                                                title="Create"
                                                className="button primary float-right"
                                                submitting={
                                                    this.state.submitting
                                                }
                                            />
                                        </form>
                                    </div>
                                </div>
                            </Restricted>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}

export default HomePage;
