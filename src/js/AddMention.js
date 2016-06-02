var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Select = require('./Select');
var cookies = require('browser-cookies');
var requests = require('superagent');
var Snackbar = require('./Snackbar');

var AddMention = React.createClass({
    getInitialState () {
        return {
            opened: false,
            mentioned_by: this.props.mentioned_by,
            mentioned_in: this.props.mentioned_in,
            mentioned: this.props.mentioned,
            description: '',
            references: '',
            submiting: false
        };
    },
    onOpen () {
        this.setState({
            opened: true
        });
    },
    onClose () {
        this.setState({
            opened: false
        });
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
        var result;
        if (this.state.opened) {
            result = <div className='small-12 columns'>
                {this.props.mentioned_by ? null : <Select
                    name='mentioned_by'
                    placeholder='Mentioned By (Person)'
                    onSelectValue={this.onChangeMentionedBy}/>}
                {this.props.mentioned ? null : <Select
                    name='mentioned'
                    placeholder='Mentioned (Person or Book or Video)'
                    onSelectValue={this.onChangeMentioned}/>}
                {this.props.mentioned_in ? null : <Select
                    name='mentioned_in'
                    placeholder='Mentioned In (Book or Video)'
                    onSelectValue={this.onChangeMentionedIn}/>}
                <input type='text' name='description' placeholder='Description' onChange={this.onChangeText}/>
                <input type='text' name='references' placeholder='References' onChange={this.onChangeText}/>
                <div className="button-group">
                    <button type="button" className="button" onClick={this.onSubmit}>Add</button>
                    <button type="button" className="button" onClick={this.onClose}>Close</button>
                </div>
            </div>;
        } else {
            result = <div className='small-12 columns'>
                <button onClick={this.onOpen} className='button'>Add</button>
            </div>;
        }
        return result;
    }
});

module.exports = AddMention;
