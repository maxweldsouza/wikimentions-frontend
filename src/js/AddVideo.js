var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Select = require('./Select');
var cookies = require('browser-cookies');
var requests = require('superagent');

var AddVideo = React.createClass({
    getInitialState: function() {
        return {
            opened: false,
            title: '',
            url: ''
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
        .post('/api/v1/thing/' + this.props.id + '/videos')
        .type('form')
        .send({
            title: this.state.title,
            url: this.state.url,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            if (!err) {
                Mentions.route(window.location.pathname + window.location.search);
            }
        })
    },
    render () {
        var id = this.props.id;
        var result;
        if (this.state.opened) {
            result = <div className='small-12 columns'>
                <form action={'/api/v1/thing/' + id + '/videos'} method='post'>
                    <input type='hidden' name='_xsrf' value={cookies.get('_xsrf')}/>
                    <input type='hidden' name='action' value='create'/>
                    <label>Title
                        <input type='text' name='title' placeholder='' onChange={this.onChangeText}/>
                    </label>
                    <label>Url
                        <input type='text' name='url' placeholder='' onChange={this.onChangeText}/>
                    </label>
                    <div className="small button-group">
                        <button type="button" className="button" onClick={this.onSubmit}>Submit</button>
                        <button type="button" className="button" onClick={this.onClose}>Close</button>
                    </div>
                </form>
            </div>;
        } else {
            result = <div className='small-12 columns'>
                <button onClick={this.onOpen} className='button'>Add</button>
            </div>;
        }
        return result;
    }
});

module.exports = AddVideo;
