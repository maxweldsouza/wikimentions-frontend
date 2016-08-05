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
var Thumbnail = require('./Thumbnail');
var Modal = require('./Modal');
var Restricted = require('./Restricted');
var Markdown = require('./Markdown');
var Affiliate = require('./Affiliate');
var Time = require('./Time');
import CopyToClipboard from 'react-copy-to-clipboard';

var ThingPage = React.createClass({
    statics: {
        resources (appstate) {
            var [type, id, slug, tab] = appstate.path.split('/');
            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            var api = [{
                name: 'thing',
                path: '/api/v1/thing/' + id + '?slug=' + slug
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
    getInitialState () {
        return {
            modalIsOpen: false
        };
    },
    onOpenModal (e) {
        if (this.props.data.thing.image) {
            this.setState({
                modalIsOpen: true
            });
        }
        e.preventDefault();
    },
    onCloseModal () {
        this.setState({modalIsOpen: false});
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

        var authors = [];
        if (thing.props.type === 'book' && this.props.data.bookauthors.length > 0) {
            authors = this.props.data.bookauthors;
        } else if (thing.props.type === 'video' && this.props.data.videoauthors.length > 0) {
            authors = this.props.data.videoauthors;
        }
        if (thing.props.type === 'book' || thing.props.type === 'video') {
            authors = <Authors authors={authors} id={id} type={thing.props.type}/>;
        }
        var mentions = this.props.data.mentions;
        var mentionedby = this.props.data.mentionedby;
        var tabs = [];
        var books;
        var videos;
        if (thing.props.type === 'person') {
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
        var tabTooltips = {
            'mentioned': 'People, books or videos mentioned by ' + thing.props.title,
            'mentionedby': 'People who mention ' + thing.props.title,
            'books': 'Books by ' + thing.props.title,
            'videos': 'Videos by ' + thing.props.title
        };
        var tabHeading = <ul className='tabs text-left' role='tablist'>
            {tabs.map((x) => {
                var cls, aria;
                if (x === tab) {
                    return <li className='tabs-title is-active' role='tab' key={x} title={tabTooltips[x]} aria-selected={true}>
                        <Link
                            id={thing.id}
                            slug={thing.props.slug}
                            type={thing.props.type}
                            tab={x}>{tabTitles[x]}</Link>
                    </li>;
                }
                return <li className='tabs-title' role='tab' key={x} title={tabTooltips[x]} aria-selected={false}>
                    <Link
                        id={thing.id}
                        slug={thing.props.slug}
                        type={thing.props.type}
                        tab={x}>{tabTitles[x]}</Link>
                </li>;
            })}
        </ul>;
        var metaRobots = {'name': 'robots', 'content': 'index'};
        if (thing.video_count === 0
            && thing.book_count === 0
            && thing.mentioned_count === 0
            && thing.mentioned_by_count === 0) {
            metaRobots = {'name': 'robots', 'content': 'noindex'};
        }
        if (thing.props.type === 'person') {
            if (tab === 'books' && thing.book_count === 0) {
                metaRobots = {'name': 'robots', 'content': 'noindex'};
            }
            if (tab === 'mentioned' && thing.mentioned_count === 0) {
                metaRobots = {'name': 'robots', 'content': 'noindex'};
            }
            if (tab === 'mentionedby' && thing.mentioned_by_count === 0) {
                metaRobots = {'name': 'robots', 'content': 'noindex'};
            }
        } else {
            if (thing.mentioned_count === 0
                && thing.mentioned_by_count === 0) {
                metaRobots = {'name': 'robots', 'content': 'noindex'};
            }
            if (tab === 'mentionedby' && thing.mentioned_by_count === 0) {
                metaRobots = {'name': 'robots', 'content': 'noindex'};
            }
        }
        var tabContent;
        if (tab === 'mentioned') {
            tabContent = <ThingMentionTab
                id={id}
                mentions={mentions}
                count={thing.mentioned_count}
                type={thing.props.type}
                path={this.props.path}
                page={this.props.query.page}
                />;
        } else if (tab === 'mentionedby') {
            tabContent = <ThingMentionedByTab
                id={id}
                mentionedby={mentionedby}
                count={thing.mentioned_by_count}
                type={thing.props.type}
                path={this.props.path}
                page={this.props.query.page}
                />;
        } else if (tab === 'books' && thing.props.type === 'person') {
            tabContent = <ThingBookTab
                id={id}
                books={books}
                count={thing.book_count}
                path={this.props.path}
                page={this.props.query.page}
                />;
        } else if (tab === 'videos' && thing.props.type === 'person') {
            tabContent = <ThingVideoTab
                id={id}
                videos={videos}
                count={thing.video_count}
                path={this.props.path}
                page={this.props.query.page}
                />;
        }
        var imageUrl;
        if (thing.image) {
            imageUrl = '/api/v1/static/images/' + thing.image.md5 + '-' + thing.image.width + '-' + thing.image.height + '.jpg';
        }
        return (
        <span>
            <Helmet
                title={thing.props.title}
                titleTemplate={'%s - ' + config.name}
                meta={[
                    {'name': 'description', 'content': ''},
                    metaRobots,
                    {name: 'twitter:card', content: 'summary'},
                    {name: 'twitter:site', content: config.twitter},
                    {name: 'twitter:title', content: thing.props.title},
                    {name: 'twitter:description', content: ''},
                    {name: 'twitter:image', content: imageUrl},
                    {property: 'og:title', content: thing.props.title},
                    {property: 'og:type', content: 'article'},
                    {property: 'og:url', content: config.url + this.props.path},
                    {property: 'og:description', content: ''},
                    {property: 'og:image', content: imageUrl},
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
                    <div className='row'>
                        <div className='small-12 large-3 columns'>
                            {thing.props.type !== 'video' ? <a onClick={this.onOpenModal}>
                                {thing.props.type === 'book' ? <Thumbnail
                                alt={thing.props.title}
                                type={thing.props.type}
                                image={thing.image}
                                shadow={true}
                                bordered={true}
                                displayHeight={200} /> : <Thumbnail
                                alt={thing.props.title}
                                type={thing.props.type}
                                image={thing.image}
                                bordered={true}
                                displayWidth={200} />}
                            </a> : null}
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onClose={this.onCloseModal}
                                className='modal-content modal-small'
                                overlayClassName='modal-overlay'>
                                {thing.image ? <div>
                                    <h1>Image</h1>
                                        {thing.props.type === 'book' ? <Thumbnail
                                        alt={thing.props.title}
                                        type={thing.props.type}
                                        image={thing.image}
                                        shadow={true}
                                        displayHeight={200} /> : <Thumbnail
                                        type={thing.props.type}
                                        image={thing.image}
                                        displayWidth={200} />}
                                    <div>
                                        Added: <Time timestamp={thing.image.added} type='ago'/>
                                    </div>
                                    <div className='row align-middle'>
                                        <div className='small-6 columns'>
                                            <strong>Description</strong>
                                        </div>
                                        <div className='small-6 columns'>
                                            <CopyToClipboard text={thing.image.description}>
                                                <button className='button secondary small float-right' title='Copy Markdown'><span className='ion-clipboard' />{'  Copy markdown'}</button>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                                    <div className='callout'>
                                        <Markdown markdown={thing.image.description} />
                                    </div>
                                    <button className='button float-right' onClick={this.onCloseModal}>Close</button>
                                </div> : null}
                            </Modal>
                            {thing.props.type === 'book' ? <Affiliate title={thing.props.title} isbn={thing.props.isbn}/> : null}
                        </div>
                            <div className='small-12 large-9 columns'>
                                <h1>{thing.props.title}</h1>
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <span className='thing-description'>
                                            {thing.props.description}
                                            {authors}
                                        </span>
                                        <Share title={thing.props.title} path={this.props.path}/>
                                        <PageBar
                                            id={id}
                                            slug={thing.props.slug}
                                            type={thing.props.type}
                                            noPage
                                            />
                                    </div>
                                </div>
                                {thing.props.type === 'video' ? <div>
                                    <a href={thing.url}><img className='' src='/assets/video.png' alt=''/></a>
                                </div> : null}
                                {tabHeading}
                                <div className='tabs-content text-left'>
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
