var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var requests = require('superagent');
var _ = require('underscore');

var ThingMentionTab = require('./ThingMentionTab');
var ThingMentionedByTab = require('./ThingMentionedByTab');
var ThingBookTab = require('./ThingBookTab');
var ThingVideoTab = require('./ThingVideoTab');
var Authors = require('./Authors');
var VideoEmbed = require('./VideoEmbed');
var PageBar = require('./PageBar');
var Share = require('./Share');
var config = require('./config');
var Link = require('./Link');

var ThingPage = React.createClass({
    statics: {
        resources (appstate) {
            var [type, id, slug, tab] = appstate.path.split('/');
            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            var api = [
                {
                    name: 'thing',
                    path: '/api/v1/thing/' + id + '?slug=' + slug
                },
                {
                    name: 'videoauthors',
                    path: '/api/v1/thing/' + id + '/videosby'
                }
            ];
            var defaultTab;

            if (type === 'people') {
                defaultTab = 'videos';
            } else {
                defaultTab = 'mentioned';
            }

            tab = tab ? tab : defaultTab;

            if (tab === 'mentioned') {
                api.push({
                    name: 'mentions',
                    path: '/api/v1/mentions/' + id + query
                });
            }
            if (tab === 'mentionedby') {
                api.push({
                    name: 'mentionedby',
                    path: '/api/v1/mentionedby/' + id + query
                });
            }
            return {
                api: api
            };
        }
    },
    render () {
        var [type, id, slug, tab] = this.props.path.split('/');
        var thing = this.props.data.thing;
        id = Number(thing.id);
        var defaultTab = 'mentioned';

        tab = tab ? tab : defaultTab;

        var image = '/assets/videolarge.png';
        var authors = this.props.data.videoauthors;
        authors = <Authors authors={authors} id={id} type='video' />;
        var mentions = this.props.data.mentions;
        var mentionedby = this.props.data.mentionedby;
        var tabs = [];
        tabs = tabs.concat(['mentioned', 'mentionedby']);
        var tabTitles = {
            'mentioned': 'Mentioned',
            'mentionedby': 'Mentioned By'
        };
        var tabCounts = {
            'mentioned': 'mentioned_count',
            'mentionedby': 'mentioned_by_count',
            'books': 'book_count',
            'videos': 'video_count'
        };
        var tabTooltips = {
            'mentioned': 'People, books or videos mentioned in ' + thing.props.title,
            'mentionedby': 'People who mention ' + thing.props.title
        };
        var tabHeading = <ul className='tabs' role='tablist'>
            {tabs.map((x) => {
                var cls, aria;
                if (x === tab) {
                    return <li className='tabs-title is-active' key={x} title={tabTooltips[x]} role='tab'>
                        <Link
                            id={thing.id}
                            slug={thing.props.slug}
                            type={thing.props.type}
                            tab={x}>{tabTitles[x]} <span className="badge">{thing[tabCounts[x]]}</span></Link>
                    </li>;
                }
                return <li className='tabs-title' key={x} title={tabTooltips[x]}>
                    <Link
                        id={thing.id}
                        slug={thing.props.slug}
                        type={thing.props.type}
                        tab={x}>{tabTitles[x]} <span className="badge">{thing[tabCounts[x]]}</span></Link>
                </li>;
            })}
        </ul>;
        var metaRobots = {'name': 'robots', 'content': 'index'};
        if (thing.mentioned_count === 0
            && thing.mentioned_by_count === 0) {
            metaRobots = {'name': 'robots', 'content': 'noindex'};
        }
        if (tab === 'mentionedby' && thing.mentioned_by_count === 0) {
            metaRobots = {'name': 'robots', 'content': 'noindex'};
        }
        var tabContent;
        if (tab === 'mentioned') {
            tabContent = <ThingMentionTab
                            mentions={mentions}
                            id={id}
                            path={this.props.path}
                            page={this.props.query.page}
                            count={thing.mentioned_count}
                            type={thing.props.type}
                        />;
        } else if (tab === 'mentionedby') {
            tabContent = <ThingMentionedByTab
                            id={id}
                            mentionedby={mentionedby}
                            path={this.props.path}
                            page={this.props.query.page}
                            count={thing.mentioned_by_count}
                            type={thing.props.type}
                        />;
        }
        return (
            <span>
                <Helmet
                    title={thing.props.title}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''},
                        {name: 'twitter:card', content: 'summary'},
                        {name: 'twitter:site', content: config.twitter},
                        {name: 'twitter:title', content: thing.props.title},
                        {name: 'twitter:description', content: ''},
                        {name: 'twitter:image', content: image},
                        {property: 'og:title', content: thing.props.title},
                        {property: 'og:type', content: 'article'},
                        {property: 'og:url', content: config.url + this.props.path},
                        {property: 'og:description', content: ''},
                        {property: 'og:image', content: image},
                        {property: 'og:site_name', content: config.name}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url + this.props.path}
                    ]}
                    />
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}/>
                <div className='row page-body align-center'>
                    <div className='small-12 columns'>
                        <div className='row align-center'>
                            <div className='small-12 large-8 columns'>
                                <div>
                                    <VideoEmbed url={this.props.data.thing.props.url} embeddable={this.props.data.thing.props.embeddable}/>
                                </div>
                                <h1><a href={this.props.data.thing.props.url} target='_blank'>{thing.props.title} <sup><span className='ion-android-open'/></sup></a></h1>
                                <span className='thing-description'>
                                    {thing.description}
                                    {authors}
                                </span>
                                <PageBar
                                    id={id}
                                    slug={thing.props.slug}
                                    type='video'
                                    noPage
                                    />
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <Share title={thing.props.title} path={this.props.path}/>
                                    </div>
                                </div>
                                {tabHeading}
                                <div className='tabs-content'>
                                    <div className='tabs-panel is-active'>
                                        {tabContent}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = ThingPage;
