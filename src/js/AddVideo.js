var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Select = require('./Select');
var cookies = require('browser-cookies');

var AddVideo = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render () {
        var parts = this.props.path.split('/');
        var id = Number(parts[1]);
        return (
            <span>
                <Helmet
                    title={'Mentions'}
                    titleTemplate='%s - Mentions'
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': ''}
                    ]}
                    />
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <form action={'/api/v1/thing/' + id + '/videos'} method='post'>
                            <input type='hidden' name='_xsrf' value={cookies.get('_xsrf')}/>
                            <input type='hidden' name='action' value='create'/>
                            <h1 className='page-title'>Add Video</h1>
                            <label>Title
                                <input type='text' name='title' placeholder=''/>
                            </label>
                            <label>Url
                                <input type='text' name='url' placeholder=''/>
                            </label>
                            <button type='submit' className='success button'>Save</button>
                        </form>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = AddVideo;
