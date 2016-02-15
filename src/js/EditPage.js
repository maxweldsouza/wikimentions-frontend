var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var DATA = require('./dummy');

var EditPage = React.createClass({
    statics: {
        resources (appstate) {
            var data;
            var id = appstate.url.split('/')[2];
            return {
                api: []
            };
        }
    },
    render () {
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
                <div className='row'>
                    <div className='small-12 columns'>
                        <div className='row'>
                            <div className='small-12 medium-4 columns'>
                                <img className="thumbnail" src="/assets/placeholder.png" alt="Photo of Pluto."/>
                            </div>
                            <div className='small-12 medium-8 columns'>
                                <h1>Edit Page</h1>
                                <form action='' method='post'>
                                    <div className="row">
                                        <div className="small-12 columns">
                                            <label>Page Title
                                                <input type="text"></input>
                                            </label>
                                        </div>
                                        <div className="small-12 columns">
                                            <label>Page Type
                                                <input type="text"></input>
                                            </label>
                                        </div>
                                        <div className="small-12 columns">
                                            <label>Page Url
                                                <input type="text"></input>
                                            </label>
                                            <button type='button' className='button'>Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = EditPage;
