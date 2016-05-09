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
        var id = Number(thing.id);
        var authors = this.props.data.videoauthors;
        if (authors.length > 0) {
            authors = <Authors authors={authors} id={id}/>;
        }
        var mentions = this.props.data.mentions;
        var mentionedby = this.props.data.mentionedby;
        var tabs = [];
        tabs = tabs.concat(['mentioned', 'mentionedby']);
        var tabTitles = {
            'mentioned': 'Mentioned',
            'mentionedby': 'Mentioned By'
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
                        {property: 'og:title', content: thing.title},
                        {property: 'og:type', content: 'article'},
                        {property: 'og:url', content: config.url + this.props.path},
                        {property: 'og:description', content: ''},
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
                                    <VideoEmbed url={this.props.data.thing.url}/>
                                </div>
                                <h1 className='page-title'>{thing.title}</h1>
                                <span className='thing-description'>
                                    {thing.description}
                                    {authors}
                                </span>
                                <PageBar
                                    id={id}
                                    slug={thing.slug}
                                    type='video'
                                    />
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <Share />
                                    </div>
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
