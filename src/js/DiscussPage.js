var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var moment = require('moment');
var Comment = require('./Comment');
var _ = require('underscore');
var DiscussReply = require('./DiscussReply');

var DiscussPage = React.createClass({
    statics: {
        resources (appstate) {
            var data;
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'discuss',
                        path: '/api/v1/discuss/' + id
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
                        user={x.user}
                        name={x.username}
                        text={x.content}
                        posted={x.created}
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
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <h1 className='page-title'>Page Discussion</h1>
                        <span className='edit-links'>
                            <a href={'/pages/' + id + '/' + slug}>Page</a>
                            {' | '}
                            <a href={'/edit/' + id + '/' + slug}>Edit</a>
                            {' | Discuss | '}
                            <a href={'/history/' + id + '/' + slug}>History</a>
                        </span>
                        <div className='discuss-card'>
                            {main}
                            <DiscussReply id={id}/>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = DiscussPage;
