var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var DATA = require('./dummy');
var _ = require('underscore');

var EditPage = React.createClass({
    statics: {
        resources (appstate) {
            var data;
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'thing',
                        path: '/api/v1/thing/' + id
                    }
                ]
            };
        }
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var entry = this.props.data.thing;
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
                        <h1 className='page-title'>Edit</h1>
                        <span className='edit-links'>
                            {'Edit | '}
                            <a href={'/discuss/' + id + '/' + entry.slug}>Discuss</a>
                            {' | '}
                            <a href={'/history/' + id + '/' + entry.slug}>History</a>
                        </span>
                        <form action='' method='post'>
                            <div className="row">
                                <div className="small-12 columns">
                                    <label>Title
                                        <input type="text"></input>
                                    </label>
                                </div>
                                <div className="small-12 columns">
                                    <label>Type
                                        <input type="text"></input>
                                    </label>
                                </div>
                                <div className="small-12 columns">
                                    <label>Url
                                        <input type="text"></input>
                                    </label>
                                    <button type='button' className='button'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = EditPage;
