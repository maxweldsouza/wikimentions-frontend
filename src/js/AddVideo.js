var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Select = require('./Select');

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
                <div className='row page-body'>
                    <div className='small-12 large-8 large-centered columns'>
                        <form action={'/api/v1/videos/' + id} method='post'>
                            <h1 className='page-title'>Add Video</h1>
                            <label>Video Url
                                <input type='text' name='url' placeholder=''/>
                            </label>
                            <label>Video Platform
                                <input type='text' name='platform' placeholder=''/>
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
