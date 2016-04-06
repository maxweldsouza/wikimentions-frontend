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
var YoutubeEmbed = require('./YoutubeEmbed');
var queryString = require('query-string');

var parseUrl = function (url) {
    var parser = document.createElement('a');
    parser.href = url;
    return {
        hostname: parser.hostname,
        search: parser.search
    };
}

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
                        name: 'mentions',
                        path: '/api/v1/mentions/' + id
                    },
                    {
                        name: 'mentionedby',
                        path: '/api/v1/mentionedby/' + id
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
        authors = this.props.data.videoauthors;
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
        tabs = tabs.concat(['mentioned', 'mentionedby']);
        var tabTitles = {
            'mentioned': 'Mentioned',
            'mentionedby': 'Mentioned By',
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
        }
        var embed;
        var parsed = parseUrl(this.props.data.thing.url);
        if (parsed.hostname === 'www.youtube.com') {
            var queryObject = queryString.parse(parsed.search);
            embed = <YoutubeEmbed videoId={queryObject.v}/>;
        } else {
            embed = <a href={thing.url}><img className="" src="/assets/videolarge.png" alt=""/></a>;
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
                        <div className='row align-center'>
                            <div className='small-12 large-8 columns'>
                                <div>
                                    {embed}
                                </div>
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
