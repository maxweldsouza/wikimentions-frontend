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
            var id = appstate.url.split('/')[2];
            return {
                api: []
            };
        }
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var entry = _.find(DATA.things, function (x) {
            return x.id === id;
        });
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
                    <div className='small-12 large-6 large-centered columns'>
                        <h1 className='page-title'>Edit Page</h1>
                        <a href={'/discuss/' + id + '/' + entry.slug}>Discuss</a>
                        {' | '}
                        <a href={'/history/' + id + '/' + entry.slug}>History</a>
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
            </span>
        );
    }
});

module.exports = EditPage;
