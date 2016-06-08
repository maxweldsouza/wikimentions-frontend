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
            var api = [{
                name: 'thing',
                path: '/api/v1/thing/' + id
            }];
            var defaultTab;

            if (type === 'people') {
                defaultTab = 'videos';
            } else {
                defaultTab = 'mentioned';
            }

            tab = tab ? tab : defaultTab;

            if (type === 'videos') {
                api.push({
                    name: 'videoauthors',
                    path: '/api/v1/thing/' + id + '/videosby'
                });
            } else if (type === 'books') {
                api.push({
                    name: 'bookauthors',
                    path: '/api/v1/thing/' + id + '/booksby'
                });
            }

            if (tab === 'videos') {
                api.push({
                    name: 'videos',
                    path: '/api/v1/thing/' + id + '/videos' + query
                });
            }
            if (tab === 'books') {
                api.push({
                    name: 'books',
                    path: '/api/v1/thing/' + id + '/books' + query
                });
            }
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
        var defaultTab;

        if (type === 'people') {
            defaultTab = 'videos';
        } else {
            defaultTab = 'mentioned';
        }
        tab = tab ? tab : defaultTab;

        var image = '/assets/placeholder.png';
        var authors = [];
        if (thing.type === 'book' && this.props.data.bookauthors.length > 0) {
            authors = this.props.data.bookauthors;
        } else if (thing.type === 'video' && this.props.data.videoauthors.length > 0) {
            authors = this.props.data.videoauthors;
        }
        if (thing.type === 'book' || thing.type === 'video') {
            authors = <Authors authors={authors} id={id} type={thing.type}/>;
        }
        var mentions = this.props.data.mentions;
        var mentionedby = this.props.data.mentionedby;
        var tabs = [];
        var books;
        var videos;
        if (thing.type === 'person') {
            tabs.push('videos');
            tabs.push('books');
            books = this.props.data.books;
            videos = this.props.data.videos;
        }
        tabs = tabs.concat(['mentioned', 'mentionedby']);
        var tabTitles = {
            'mentioned': 'Mentioned',
            'mentionedby': 'Mentioned By',
            'books': 'Books',
            'videos': 'Videos'
        };
        var tabCounts = {
            'mentioned': 'mentioned_count',
            'mentionedby': 'mentioned_by_count',
            'books': 'book_count',
            'videos': 'video_count'
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
                            id={id}
                            mentions={mentions}
                            count={thing.mentioned_count}
                            type={thing.type}
                            path={this.props.path}
                            page={this.props.query.page}
                            />;
        } else if (tab === 'mentionedby') {
            tabContent = <ThingMentionedByTab
                            id={id}
                            mentionedby={mentionedby}
                            count={thing.mentioned_by_count}
                            type={thing.type}
                            path={this.props.path}
                            page={this.props.query.page}
                            />;
        } else if (tab === 'books' && thing.type === 'person') {
            tabContent = <ThingBookTab
                            id={id}
                            books={books}
                            count={thing.book_count}
                            path={this.props.path}
                            page={this.props.query.page}
                            />;
        } else if (tab === 'videos' && thing.type === 'person') {
            tabContent = <ThingVideoTab
                            id={id}
                            videos={videos}
                            count={thing.video_count}
                            path={this.props.path}
                            page={this.props.query.page}
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
                        <div className='row'>
                            <div className='small-12 large-4 columns'>
                                {thing.type !== 'video' ?
                                <img className='' src={image} alt={thing.title}/> : null}
                            </div>
                            <div className='small-12 large-8 columns'>
                                <h1 className='page-title'>{thing.title}</h1>
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <span className='thing-description'>
                                            {thing.props.description}
                                            {authors}
                                        </span>
                                        <Share title={thing.title} path={this.props.path}/>
                                        <PageBar
                                            id={id}
                                            slug={thing.slug}
                                            type={thing.type}
                                            noPage
                                            />
                                    </div>
                                </div>
                                {thing.type === 'video' ? <div>
                                    <a href={thing.url}><img className='' src='/assets/video.png' alt=''/></a>
                                </div> : null}
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
