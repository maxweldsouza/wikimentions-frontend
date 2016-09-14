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
var parseUrl = require('url-parse');
var queryString = require('query-string');

var VideoPage = React.createClass({
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
    getInitialState () {
        return {
            embeddable: false,
            videoImage: ''
        };
    },
    componentWillMount () {
        var parsed = parseUrl(this.props.data.thing.props.url);
        if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
            var queryObject = queryString.parse(parsed.query);
            this.setState({
                videoImage: 'https://i.ytimg.com/vi/' + queryObject.v + '/0.jpg'
            });
        }
    },
    componentDidMount () {
        var parsed = parseUrl(this.props.data.thing.props.url);
        if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
            var queryObject = queryString.parse(parsed.query);
            requests.get('https://www.googleapis.com/youtube/v3/videos?part=status,snippet&fields=items(snippet/thumbnails/high,status(embeddable,privacyStatus,uploadStatus))&id=' + queryObject.v + '&key=' + config.keys.youtube).end((err, res) => {
                if (err) {
                    return;
                }
                try {
                    if (res.body.items[0].status.embeddable
                        && res.body.items[0].status.privacyStatus === 'public'
                        && res.body.items[0].status.uploadStatus === 'processed') {
                        this.setState({
                            embeddable: true
                        });
                        this.setState({
                            videoImage: res.body.items[0].snippet.thumbnails.high.url
                        });
                    }
                } catch (e) {
                    return;
                }
            });
        }
    },
    render () {
        var [type, id, slug, tab] = this.props.path.split('/');
        var thing = this.props.data.thing;
        id = Number(thing.id);
        var defaultTab = 'mentioned';

        tab = tab ? tab : defaultTab;

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
            'mentionedby': 'People who have mentioned ' + thing.props.title
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
        var pageTitle, pageDescription;
        if (tab === 'mentioned') {
            tabContent = <ThingMentionTab
                            loggedin={this.props.loggedin}
                            mentions={mentions}
                            id={id}
                            path={this.props.path}
                            page={this.props.query.page}
                            count={thing.mentioned_count}
                            type={thing.props.type}
                        />;
            pageTitle = 'Mentioned - ' + thing.props.title;
            pageDescription = 'People, books or videos mentioned in ' + thing.props.title;
        } else if (tab === 'mentionedby') {
            tabContent = <ThingMentionedByTab
                            loggedin={this.props.loggedin}
                            id={id}
                            mentionedby={mentionedby}
                            path={this.props.path}
                            page={this.props.query.page}
                            count={thing.mentioned_by_count}
                            type={thing.props.type}
                        />;
            pageTitle = 'Mentioned by - ' + thing.props.title;
            pageDescription = 'People who have mentioned ' + thing.props.title;
        }
        return (
            <span>
                <Helmet
                    title={pageTitle}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': pageDescription},
                        {name: 'twitter:card', content: 'summary'},
                        {name: 'twitter:site', content: config.twitter},
                        {name: 'twitter:title', content: pageTitle},
                        {name: 'twitter:description', content: pageDescription},
                        {name: 'twitter:image', content: this.state.videoImage},
                        {property: 'og:title', content: pageTitle},
                        {property: 'og:type', content: 'article'},
                        {property: 'og:url', content: config.url + this.props.path},
                        {property: 'og:description', content: ''},
                        {property: 'og:image', content: this.state.videoImage},
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
                                    <VideoEmbed url={this.props.data.thing.props.url} embeddable={this.state.embeddable}/>
                                </div>
                                <h1><a href={this.props.data.thing.props.url} target='_blank'>{thing.props.title} <sup><span className='ion-android-open'/></sup></a></h1>
                                <span className='thing-description'>
                                    {thing.description}
                                    {authors}
                                </span>
                                <div className='row'>
                                    <div className='small-6 columns'>
                                        <PageBar
                                        id={id}
                                        slug={thing.props.slug}
                                        type='video'
                                        noPage
                                        />
                                    </div>
                                    <div className='small-6 columns text-right'>
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

module.exports = VideoPage;
