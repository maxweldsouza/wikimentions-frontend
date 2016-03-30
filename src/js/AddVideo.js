var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Select = require('./Select');
var cookies = require('browser-cookies');

var AddVideo = React.createClass({
    getInitialState: function() {
        return {
            opened: false
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
    onSubmit () {

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
                            <input type='text' name='title' placeholder=''/>
                        </label>
                        <label>Url
                            <input type='text' name='url' placeholder=''/>
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
