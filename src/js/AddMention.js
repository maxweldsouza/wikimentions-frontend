var cookies = require('browser-cookies');
var Helmet = require('react-helmet');
var Input = require('./Input');
var IpWarning = require('./IpWarning');
var LoginModal = require('./LoginModal');
var Navbar = require('./Navbar');
var parseUrl = require('url-parse');
var React = require('react');
var requests = require('superagent');
var Restricted = require('./Restricted');
var Select = require('./Select');
var SignupModal = require('./SignupModal');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');

var AddMention = React.createClass({
    getInitialState () {
        return {
            mentioned_by: this.props.mentioned_by,
            mentionedByValid: true,
            mentionedByMessage: '',
            mentioned_in: this.props.mentioned_in,
            mentionedInValid: true,
            mentionedInMessage: '',
            mentioned: this.props.mentioned,
            mentionedValid: true,
            mentionedMessage: '',
            description: '',
            reference: '',
            formMessage: '',
            submitting: false
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    validateForm () {
        var valid = true;
        if (!this.state.mentioned_by) {
            this.setState({
                mentionedByValid: false,
                mentionedByMessage: 'Mentioned By is empty'
            });
            valid = false;
        } else {
            this.setState({
                mentionedByValid: true,
                mentionedByMessage: ''
            });
        }
        if (!this.state.mentioned_in && this.props.type !== 'person') {
            this.setState({
                mentionedInValid: false,
                mentionedInMessage: 'Mentioned In is empty'
            });
            valid = false;
        } else {
            this.setState({
                mentionedInValid: true,
                mentionedInMessage: ''
            });
        }
        if (!this.state.mentioned) {
            this.setState({
                mentionedValid: false,
                mentionedMessage: 'Mentioned is empty'
            });
            valid = false;
        } else {
            this.setState({
                mentionedValid: true,
                mentionedMessage: ''
            });
        }
        return valid;
    },
    onSubmit (e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.setState({
                submitting: true
            });
            requests
            .post('/api/v1/mentions')
            .type('form')
            .send({
                description: this.state.description,
                reference: this.state.reference,
                mentioned_by: this.state.mentioned_by,
                mentioned_in: this.state.mentioned_in,
                mentioned: this.state.mentioned,
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
                    Snackbar({message: 'Mention added'});
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    },
    onChangeMentionedBy (x) {
        this.setState({
            mentioned_by: x.id
        });
    },
    onChangeMentionedIn (x) {
        this.setState({
            mentioned_in: x.id
        });
    },
    onChangeMentioned (x) {
        this.setState({
            mentioned: x.id
        });
    },
    render () {
        var id = this.props.id;
        var loggedOutMessage = <span>You need to <LoginModal/> / <SignupModal/> to add a Mention.</span>;
        var parsed;
        if (this.state.reference) {
            parsed = parseUrl(this.state.reference);
        }
        return <div className='small-12 columns'>
            <Restricted message={loggedOutMessage}>
                <h2>Add mention</h2>
                <IpWarning loggedin={this.props.loggedin}/>
                {this.state.formMessage ? <div className='callout alert'>
                    {this.state.formMessage}
                </div> : null}
                <div className='row'>
                    <div className='small-12 large-4 large-order-2 columns'>
                        <div className='callout warning'>
                            People, books and videos must have existing pages on WikiMentions. <a href='/create' target='_blank'>Create</a> a page if it doesn't already exist.
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit} className='small-12 large-8 large-order-1 columns'>
                        {this.props.mentioned_by ? null : <span>
                            Mentioned By (Person)
                            <Select
                                name='mentioned_by'
                                valid={this.state.mentionedByValid}
                                message={this.state.mentionedByMessage}
                                onSelectValue={this.onChangeMentionedBy}
                                types={['person']}/>
                        </span>}
                        {this.props.mentioned ? null : <span>
                            Mentioned (Person or Book or Video)
                            <Select
                                valid={this.state.mentionedValid}
                                message={this.state.mentionedMessage}
                                name='mentioned'
                                onSelectValue={this.onChangeMentioned}/>
                        </span>}
                        {this.props.mentioned_in ? null : <span>
                            Mentioned In (Book or Video)
                            <Select
                                valid={this.state.mentionedInValid}
                                message={this.state.mentionedInMessage}
                                placeholder={this.props.type === 'person' ? 'Optional' : ''}
                                name='mentioned_in'
                                onSelectValue={this.onChangeMentionedIn}
                                types={['book', 'video']}/>
                        </span>}
                        {this.props.type === 'person' ? <span>
                            Reference (If mention isn't in a book or video)
                            {this.state.reference && parsed.hostname === 'www.youtube.com' ? <div className='callout warning'>
                                Videos belong on separate pages. Create a page for this video if it doesn't already exist and add it to "Mentioned In"
                            </div> : null}
                            <Input
                                type='text'
                                name='reference'
                                placeholder='http://'
                                value={this.state.reference}
                                onChange={this.onChangeText}
                                onClear={this.onClear}
                                valid={true}
                                message={true}/>
                        </span> : null}
                        <div className='button-group float-right'>
                            <SubmitButton
                                type='button'
                                className='button primary'
                                submitting={this.state.submitting}
                                title='Add' />
                        </div>
                    </form>
                </div>
            </Restricted>
        </div>;
    }
});

module.exports = AddMention;
