var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var moment = require('moment');
var DATA = require('./dummy');
var Comment = require('./Comment');
var _ = require('underscore');

var DiscussPage = React.createClass({
    statics: {
        resources (appstate) {
            var data;
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'discuss',
                        path: '/api/v1/thing/' + id
                    }
                ]
            };
        }
    },
    render () {
        var discuss = this.props.data.discuss;
        var parts = this.props.path.split('/');
        var id = Number(parts[1]);
        var slug = parts[2];
        var discussions = discuss;
        var main;
        if (discussions.length > 0) {
            main = <div>
                {discussions.map((x) => {
                    return <Comment
                        id={x.id}
                        user={x.user_id}
                        name={x.username}
                        text={x.text}
                        posted={x.posted}
                        />;
                })}
            </div>;
        } else {
            main = <div className='discuss-empty callout primary'>
                There are no discussions here. You can start one !
            </div>;
        }
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
                        <h1 className='page-title'>Page Discussion</h1>
                        <span className='edit-links'>
                            <a href={'/edit/' + id + '/' + slug}>Edit</a>
                            {' | Discuss | '}
                            <a href={'/history/' + id + '/' + slug}>History</a>
                        </span>
                        {main}
                        <div className="row">
                            <div className='discuss-reply small-12 columns'>
                                <form action='' method='post'>
                                    <div className="row">
                                        <div className="small-12 columns">
                                            <label>Reply
                                                <input type="text"></input>
                                            </label>
                                        </div>
                                        <div className="small-12 columns">
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

module.exports = DiscussPage;
