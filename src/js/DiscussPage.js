var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var moment = require('moment');
var Comment = require('./Comment');
var _ = require('underscore');
var DiscussReply = require('./DiscussReply');
var PageBar = require('./PageBar');
var config = require('./config');

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
                    },
                    {
                        name: 'thing',
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
        var nodata;
        if (discussions.length === 0) {
            nodata = <div className='card'>
                    <div className='small-12 columns'>
                    There are no discussions here. You can start one !
                    </div>
            </div>;
        }
        return (
            <span>
                <Helmet
                    title={'Discussion - ' + this.props.data.thing.title}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url + this.props.path}
                    ]}
                    />
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <h1 className='page-title'>{'Discussion - ' + this.props.data.thing.title}</h1>
                        <PageBar
                            id={id}
                            slug={slug}
                            />
                        <div className='small-12 columns'>
                            <div className='card-container'>
                                {discussions.map((x) => {
                                        return <Comment
                                            id={x.id}
                                            key={x.id}
                                            user={x.user}
                                            name={x.username}
                                            text={x.content}
                                            posted={x.created}
                                            />;
                                    })}
                                {nodata}
                                <DiscussReply id={id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = DiscussPage;
