var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Select = require('./Select');
var cookies = require('browser-cookies');
var requests = require('superagent');

var AddMention = React.createClass({
    getInitialState: function() {
        return {
            opened: false,
            mentioned_id: null,
            mentioned: null,
            description: '',
            references: ''
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
        requests
        .post('/api/v1/mentions/' + this.props.id)
        .type('form')
        .send({
            action: 'create',
            description: this.state.description,
            references: this.state.references,
            mentioned_in: this.state.mentioned_in,
            mentioned: this.state.mentioned,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            if (!err) {
                Mentions.route(window.location.pathname + window.location.search);
            }
        })
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
                Mention: TODO
                <label>Mentioned In
                    <Select
                        name='mentioned_in'
                        onSelectValue={this.onChangeMentionedIn}
                        />
                </label>
                <label>Mentioned
                    <Select
                        name='mentioned'
                        onSelectValue={this.onChangeMentioned}
                        />
                </label>
                <label>Description
                    <input type='text' name='description' placeholder='' onChange={this.onChangeText}/>
                </label>
                <label>References
                    <input type='text' name='references' placeholder='' onChange={this.onChangeText}/>
                </label>
                <div className="small button-group">
                    <button type="button" className="button" onClick={this.onSubmit}>Submit</button>
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
