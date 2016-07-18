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
var Placeholder = require('./Placeholder');
var Image = require('./Image');
var Modal = require('./Modal');
var Restricted = require('./Restricted');
var Markdown = require('./Markdown');
var Affiliate = require('./Affiliate');
var Time = require('./Time');

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
        this.setState({
            modalIsOpen: true
        });
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
        var tabHeading = <ul className='tabs text-left'>
            {tabs.map((x) => {
                var cls, aria;
                if (x === tab) {
                    return <li className='tabs-title is-active' key={x}>
                        <Link
                            id={thing.id}
                            slug={thing.props.slug}
                            type={thing.props.type}
                            tab={x}>{tabTitles[x]}</Link>
                    </li>;
                }
                return <li className='tabs-title' key={x}>
                    <Link
                        id={thing.id}
                        slug={thing.props.slug}
                        type={thing.props.type}
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
        var image, imageUrl;
        if (thing.image) {
            image = <a onClick={this.onOpenModal}>
                <Image className={thing.props.type === 'book' ? 'img shadow' : 'img'} id={this.props.id} md5={thing.image.md5} width={thing.image.width} height={thing.image.height}/>
            </a>;
            imageUrl = '/api/v1/static/images/' + thing.image.md5 + '-' + thing.image.width + '-' + thing.image.height + '.jpg'
        } else {
            image = <Placeholder style={{'height': 200, 'lineHeight': '200px'}}/>;
            imageUrl = '';
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
                            {thing.props.type !== 'video' ? image : null}
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onClose={this.onCloseModal}
                                className='modal-content modal-small'
                                overlayClassName='modal-overlay'>
                                {thing.image ? <div className='small-12 columns'>
                                    <h1>Image</h1>
                                    <Image
                                        id={id}
                                        width={thing.image.width}
                                        height={thing.image.height}
                                        md5={thing.image.md5}
                                        />
                                    <div>
                                        Added: <Time timestamp={thing.image.added} type='ago'/>
                                    </div>
                                    <strong>Description</strong>
                                    <div className='callout'>
                                        <Markdown markdown={thing.image.description} />
                                    </div>
                                    <button className='button' onClick={this.onCloseModal}>Close</button>
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
