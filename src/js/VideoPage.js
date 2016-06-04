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
                    path: '/api/v1/thing/' + id
                },
                {
                    name: 'videoauthors',
                    path: '/api/v1/thing/' + id + '/videosby'
                }
            ];
            var defaultTab;

            if (type === 'pages') {
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
        if (authors.length > 0) {
            authors = <Authors authors={authors} id={id} type='video' />;
        }
        var mentions = this.props.data.mentions;
        var mentionedby = this.props.data.mentionedby;
        var tabs = [];
        tabs = tabs.concat(['mentioned', 'mentionedby']);
        var tabTitles = {
            'mentioned': 'Mentioned',
            'mentionedby': 'Mentioned By'
        };
        var tabHeading = <ul className='tabs'>
            {tabs.map((x) => {
                var cls, aria;
                if (x === tab) {
                    return <li className='tabs-title is-active' key={x}>
                        <Link
                            id={thing.id}
                            slug={thing.slug}
                            type={thing.type}
                            tab={x}>{tabTitles[x]}</Link>
                    </li>;
                }
                return <li className='tabs-title' key={x}>
                    <Link
                        id={thing.id}
                        slug={thing.slug}
                        type={thing.type}
                        tab={x}>{tabTitles[x]}</Link>
                </li>;
            })}
        </ul>;
        var tabContent;
        if (tab === 'mentioned') {
            tabContent = <ThingMentionTab
                            mentions={mentions}
                            id={id}
                            path={this.props.path}
                            page={this.props.query.page}
                            count={thing.mentioned_count}
                            type={thing.type}
                        />;
        } else if (tab === 'mentionedby') {
            tabContent = <ThingMentionedByTab
                            id={id}
                            mentionedby={mentionedby}
                            path={this.props.path}
                            page={this.props.query.page}
                            count={thing.mentioned_by_count}
                            type={thing.type}
                        />;
        }
        return (
            <span>
                <Helmet
                    title={thing.title}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''},
                        {name: 'twitter:card', content: 'summary'},
                        {name: 'twitter:site', content: config.twitter},
                        {name: 'twitter:title', content: thing.title},
                        {name: 'twitter:description', content: ''},
                        {name: 'twitter:image', content: image},
                        {property: 'og:title', content: thing.title},
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
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 columns'>
                        <div className='row align-center'>
                            <div className='small-12 large-8 columns'>
                                <div>
                                    <VideoEmbed url={this.props.data.thing.props.url}/>
                                </div>
                                <h1 className='page-title'><a href={this.props.data.thing.props.url} target='_blank'>{thing.title}<span className='ion-android-open'/></a></h1>
                                <span className='thing-description'>
                                    {thing.description}
                                    {authors}
                                </span>
                                <PageBar
                                    id={id}
                                    slug={thing.slug}
                                    type='video'
                                    noPage
                                    />
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <Share title={thing.title} path={this.props.path}/>
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
