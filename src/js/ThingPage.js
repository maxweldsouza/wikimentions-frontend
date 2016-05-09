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

var ThingPage = React.createClass({
    statics: {
        resources (appstate) {
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'thing',
                        path: '/api/v1/thing/' + id
                    },
                    {
                        name: 'books',
                        path: '/api/v1/thing/' + id + '/books'
                    },
                    {
                        name: 'videos',
                        path: '/api/v1/thing/' + id + '/videos'
                    },
                    {
                        name: 'mentions',
                        path: '/api/v1/mentions/' + id
                    },
                    {
                        name: 'mentionedby',
                        path: '/api/v1/mentionedby/' + id
                    },
                    {
                        name: 'bookauthors',
                        path: '/api/v1/thing/' + id + '/booksby'
                    },
                    {
                        name: 'videoauthors',
                        path: '/api/v1/thing/' + id + '/videosby'
                    }
                ]
            };
        }
    },
    getInitialState () {
        return {
            tab: 'mentioned'
        };
    },
    changeTab (x) {
        this.setState({
            tab: x
        });
    },
    render () {
        var thing = this.props.data.thing;
        var image = '/assets/placeholder.png';
        var id = Number(thing.id);
        var authors = [];
        if (this.props.data.bookauthors.length > 0) {
            authors = this.props.data.bookauthors;
        } else if (this.props.data.videoauthors.length > 0) {
            authors = this.props.data.videoauthors;
        }
        if (thing.type === 'book' || thing.type === 'video') {
            authors = <Authors authors={authors} id={id}/>;
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
        var tab = <ul className='tabs'>
            {tabs.map((x) => {
                var cls, aria;
                if (x === this.state.tab) {
                    return <li className='tabs-title is-active' key={x}>
                        <a aria-selected='true' onClick={this.changeTab.bind(null, x)}>{tabTitles[x]}</a>
                    </li>;
                }
                return <li className='tabs-title' key={x}>
                    <a onClick={this.changeTab.bind(null, x)}>{tabTitles[x]}</a>
                </li>;
            })}
        </ul>;
        var tabContent;
        var options;
        options = _.map(this.state.books, function (x) {
            return {
                value: x.id,
                label: x.title
            };
        });
        if (this.state.tab === 'mentioned') {
            tabContent = <ThingMentionTab
                            id={id}
                            mentions={mentions}
                            type={thing.type}
                            />;
        } else if (this.state.tab === 'mentionedby') {
            tabContent = <ThingMentionedByTab
                            id={id}
                            mentionedby={mentionedby}
                            type={thing.type}
                            />;
        } else if (this.state.tab === 'books' && thing.type === 'person') {
            tabContent = <ThingBookTab
                            id={id}
                            books={books}
                            />;
        } else if (this.state.tab === 'videos' && thing.type === 'person') {
            tabContent = <ThingVideoTab
                            id={id}
                            videos={videos}
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
                                            {thing.description}
                                            {authors}
                                        </span>
                                        <Share title={thing.title} path={this.props.path}/>
                                        <PageBar
                                            id={id}
                                            slug={thing.slug}
                                            type={thing.type}
                                            />
                                    </div>
                                </div>
                                {thing.type === 'video' ? <div>
                                    <a href={thing.url}><img className='' src='/assets/video.png' alt=''/></a>
                                </div> : null}
                                {tab}
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
