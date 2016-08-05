var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Select = require('./Select');
var cookies = require('browser-cookies');
var requests = require('superagent');
var Snackbar = require('./Snackbar');
var Restricted = require('./Restricted');
var LoginModal = require('./LoginModal');
var SubmitButton = require('./SubmitButton');

var AddMention = React.createClass({
    getInitialState () {
        return {
            mentioned_by: this.props.mentioned_by,
            mentioned_in: this.props.mentioned_in,
            mentioned: this.props.mentioned,
            description: '',
            references: '',
            submiting: false
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    onSubmit () {
        if (!this.state.mentioned_by) {
            Snackbar({message: 'Mentioned By is empty'});
        } else if (!this.state.mentioned) {
            Snackbar({message: 'Mentioned is empty'});
        } else {
            this.setState({
                submitting: true
            });
            requests
            .post('/api/v1/mentions')
            .type('form')
            .send({
                action: 'create',
                description: this.state.description,
                references: this.state.references,
                mentioned_by: this.state.mentioned_by,
                mentioned_in: this.state.mentioned_in,
                mentioned: this.state.mentioned,
                _xsrf: cookies.get('_xsrf')
            })
            .end((err, res) => {
                this.setState({
                    submiting: false
                });
                if (err && err.status) {
                    Snackbar({message: res.body.message});
                } else {
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
        var loggedOutMessage = <span>You need to <LoginModal/> to add a Mention.</span>;
        return <div className='small-12 columns'>
            <Restricted message={loggedOutMessage}>
                <h2>Add mention</h2>
                <div className='row'>
                    <div className='small-12 large-4 large-order-2 columns'>
                        <div className='callout warning'>
                            These can only be pages that exist on WikiMentions. You need to <a href='/create'>Create</a> them if they don't.
                        </div>
                    </div>
                    <div className='small-12 large-8 large-order-1 columns'>
                            {this.props.mentioned_by ? null : <span>
                                Mentioned By (Person)
                                <Select
                                name='mentioned_by'
                                onSelectValue={this.onChangeMentionedBy}
                                types={['person']}/>
                            </span>}
                            {this.props.mentioned ? null : <span>
                                Mentioned (Person or Book or Video)
                                <Select
                                    name='mentioned'
                                    onSelectValue={this.onChangeMentioned}/>
                            </span>}
                            {this.props.mentioned_in ? null : <span>
                                Mentioned In (Book or Video)
                                <Select
                                name='mentioned_in'
                                onSelectValue={this.onChangeMentionedIn}
                                types={['book', 'video']}/>
                            </span>}
                            <div className='button-group float-right'>
                                <SubmitButton type='button' className='button primary' submitting={this.state.submitting} onSubmit={this.onSubmit} title='Add' />
                            </div>
                    </div>
                </div>
            </Restricted>
        </div>;
    }
});

module.exports = AddMention;
