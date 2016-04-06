var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var requests = require('superagent');
var _ = require('underscore');

var ThingMentionTab = require('./ThingMentionTab');
var ThingMentionedByTab = require('./ThingMentionedByTab');
var ThingBookTab = require('./ThingBookTab');
var ThingVideoTab = require('./ThingVideoTab');
var AddAuthors = require('./AddAuthors');

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
            tab: 'mentioned',
        };
    },
    changeTab (x) {
        this.setState({
            tab: x
        });
    },
    render () {
        var thing = this.props.data.thing;
        var id = Number(thing.id);
        var authors = [];
        if (this.props.data.bookauthors.length > 0) {
            authors = this.props.data.bookauthors;
        } else if (this.props.data.videoauthors.length > 0) {
            authors = this.props.data.videoauthors;
        }
        var authorCount = authors.length;
        if (authors.length > 0) {
            authors = <span>
                {'by '}
                {authors.map(function (x, i) {
                    var path = '/pages/' + x.id + '/' + x.slug;
                    return <a href={path} key={x.title}>
                        {x.title}{i === authorCount - 1 ? '' : ', '}
                    </a>;
                })}
                <AddAuthors id={id}/>
            </span>;
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
        var tab = <ul className="tabs">
            {tabs.map((x) => {
                var cls, aria;
                if (x === this.state.tab) {
                    return <li className='tabs-title is-active' key={x}>
                        <a aria-selected="true" onClick={this.changeTab.bind(null, x)}>{tabTitles[x]}</a>
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
                            mentions={mentions}
                            id={id}
                            />;
        } else if (this.state.tab === 'mentionedby') {
            tabContent = <ThingMentionedByTab
                            id={id}
                            mentionedby={mentionedby}
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
                    <div className='small-12 columns'>
                        <div className='row'>
                            <div className='small-12 large-4 columns'>
                                {thing.type !== 'video' ?
                                <img className="" src="/assets/placeholder.png" alt=""/> : null}
                            </div>
                            <div className='small-12 large-8 columns'>
                                <h1 className='page-title'>{thing.title}</h1>
                                <span className='thing-description'>
                                    {thing.description}
                                    {authors}
                                </span>
                                <div className='edit-links'>
                                    <a href={'/edit/' + id + '/' + thing.slug}>Edit</a>
                                    {' | '}
                                    <a href={'/history/' + id + '/' + thing.slug}>History</a>
                                    {' | '}
                                    <a href={'/discuss/' + id + '/' + thing.slug}>Discuss</a>
                                </div>
                                {thing.type === 'video' ? <div>
                                    <a href={thing.url}><img className="" src="/assets/video.png" alt=""/></a>
                                </div> : null}
                                {tab}
                                <div className="tabs-content">
                                    <div className="tabs-panel is-active">
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
