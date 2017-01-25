import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import requests from 'superagent';
import _ from 'underscore';
import ThingMentionTab from './ThingMentionTab';
import ThingMentionedByTab from './ThingMentionedByTab';
import ThingBookTab from './ThingBookTab';
import ThingVideoTab from './ThingVideoTab';
import Authors from './Authors';
import PageBar from './PageBar';
import Share from './Share';
import config from './config';
import Link from './Link';
import Thumbnail from './Thumbnail';
import Modal from './Modal';
import Markdown from './Markdown';
import Affiliate from './Affiliate';
import Time from './Time';
import CopyButton from './CopyButton';
import EditTags from './EditTags';
import autoBind from 'react-autobind';

class ThingPage extends React.Component {
    static resources (appstate) {
        let [type, id, slug, tab] = appstate.path.split('/');
        const page = appstate.query.page;
        const query = page ? `?page=${page}` : '';
        const api = [{
            name: 'thing',
            path: `/api/v1/thing/${id}?slug=${slug}`
        }];
        let defaultTab;

        if (type === 'people') {
            defaultTab = 'videos';
        } else {
            defaultTab = 'mentioned';
        }

        tab = tab ? tab : defaultTab;

        if (type === 'videos') {
            api.push({
                name: 'videoauthors',
                path: `/api/v1/thing/${id}/videosby`
            });
        } else if (type === 'books') {
            api.push({
                name: 'bookauthors',
                path: `/api/v1/thing/${id}/booksby`
            });
        }

        if (tab === 'videos') {
            api.push({
                name: 'videos',
                path: `/api/v1/thing/${id}/videos${query}`
            });
        }
        if (tab === 'books') {
            api.push({
                name: 'books',
                path: `/api/v1/thing/${id}/books${query}`
            });
        }
        if (tab === 'mentioned') {
            api.push({
                name: 'mentions',
                path: `/api/v1/mentions/${id}${query}`
            });
        }
        if (tab === 'mentionedby') {
            api.push({
                name: 'mentionedby',
                path: `/api/v1/mentionedby/${id}${query}`
            });
        }
        return {
            api
        };
    }
    constructor (props) {
        super(props);
    autoBind(this);
        this.state = {
            modalIsOpen: false
        };
    }
    onOpenModal (e) {
        if (this.props.data.thing.image) {
            this.setState({
                modalIsOpen: true
            });
        }
        e.preventDefault();
    }
    onCloseModal () {
        this.setState({modalIsOpen: false});
    }
    render () {
        let [type, id, slug, tab] = this.props.path.split('/');
        const thing = this.props.data.thing;
        id = Number(thing.id);
        let defaultTab;

        if (type === 'people') {
            defaultTab = 'videos';
        } else {
            defaultTab = 'mentioned';
        }
        tab = tab ? tab : defaultTab;

        let authors = [];
        if (thing.props.type === 'book' && this.props.data.bookauthors.length > 0) {
            authors = this.props.data.bookauthors;
        } else if (thing.props.type === 'video' && this.props.data.videoauthors.length > 0) {
            authors = this.props.data.videoauthors;
        }
        if (thing.props.type === 'book' || thing.props.type === 'video') {
            authors = <Authors authors={authors} id={id} type={thing.props.type}/>;
        }
        const mentions = this.props.data.mentions;
        const mentionedby = this.props.data.mentionedby;
        let tabs = [];
        let books;
        let videos;
        if (thing.props.type === 'person') {
            tabs.push('videos');
            tabs.push('books');
            books = this.props.data.books;
            videos = this.props.data.videos;
        }
        tabs = tabs.concat(['mentioned', 'mentionedby']);
        const tabTitles = {
            'mentioned': 'Mentioned',
            'mentionedby': 'Mentioned By',
            'books': 'Books',
            'videos': 'Videos'
        };
        const tabCounts = {
            'mentioned': 'mentioned_count',
            'mentionedby': 'mentioned_by_count',
            'books': 'book_count',
            'videos': 'video_count'
        };
        const tabTooltips = {
            'mentioned': `People, books or videos mentioned by ${thing.props.title}`,
            'mentionedby': `People who have mentioned ${thing.props.title}`,
            'books': `Books by ${thing.props.title}`,
            'videos': `Videos by ${thing.props.title}`
        };
        const tabHeading = <ul className='tabs text-left' role='tablist'>
            {tabs.map((x) => {
                let cls;
                let aria;
                if (x === tab) {
                    return <li className='tabs-title is-active' role='tab' key={x} title={tabTooltips[x]} aria-selected={true}>
                        <Link
                            id={thing.id}
                            slug={thing.props.slug}
                            type={thing.props.type}
                            tab={x}>{tabTitles[x]} <span className="badge">{thing[tabCounts[x]]}</span></Link>
                    </li>;
                }
                return <li className='tabs-title' role='tab' key={x} title={tabTooltips[x]} aria-selected={false}>
                    <Link
                        id={thing.id}
                        slug={thing.props.slug}
                        type={thing.props.type}
                        tab={x}>{tabTitles[x]} <span className="badge">{thing[tabCounts[x]]}</span></Link>
                </li>;
            })}
        </ul>;
        let metaRobots = {'name': 'robots', 'content': 'index'};
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
        let tabContent;
        let pageTitle;
        let pageDescription;
        if (tab === 'mentioned') {
            tabContent = <ThingMentionTab
                loggedin={this.props.loggedin}
                id={id}
                mentions={mentions}
                count={thing.mentioned_count}
                type={thing.props.type}
                path={this.props.path}
                page={this.props.query.page}
                />;
            pageTitle = `Mentioned - ${thing.props.title}`;
            if (thing.props.type === 'person') {
                pageDescription = `People, books or videos mentioned by ${thing.props.title}`;
            } else {
                pageDescription = `People, books or videos mentioned in ${thing.props.title}`;
            }
        } else if (tab === 'mentionedby') {
            tabContent = <ThingMentionedByTab
                loggedin={this.props.loggedin}
                id={id}
                mentionedby={mentionedby}
                count={thing.mentioned_by_count}
                type={thing.props.type}
                path={this.props.path}
                page={this.props.query.page}
                />;
            pageTitle = `Mentioned by - ${thing.props.title}`;
            pageDescription = `People, books or videos that mention ${thing.props.title}`;
        } else if (tab === 'books' && thing.props.type === 'person') {
            tabContent = <ThingBookTab
                loggedin={this.props.loggedin}
                id={id}
                books={books}
                count={thing.book_count}
                path={this.props.path}
                page={this.props.query.page}
                />;
            pageTitle = `Books - ${thing.props.title}`;
            pageDescription = `Books authored by ${thing.props.title}`;
        } else if (tab === 'videos' && thing.props.type === 'person') {
            tabContent = <ThingVideoTab
                loggedin={this.props.loggedin}
                id={id}
                videos={videos}
                count={thing.video_count}
                path={this.props.path}
                page={this.props.query.page}
                />;
            pageTitle = `Videos - ${thing.props.title}`;
            pageDescription = `A collection of videos of ${thing.props.title}`;
        }
        pageDescription = thing.props.description ? `${pageDescription}, ${thing.props.description}` : pageDescription;
        let imageUrl;
        if (thing.image) {
            imageUrl = `${config.url}api/v1/static/images/${thing.image.md5}-${thing.image.width}-${thing.image.height}.jpg`;
        }
        return (
        <span>
            <Helmet
                title={pageTitle}
                titleTemplate={`%s - ${config.name}`}
                meta={[
                    {'name': 'description', 'content': pageDescription},
                    metaRobots,
                    {name: 'twitter:card', content: 'summary'},
                    {name: 'twitter:site', content: config.twitter},
                    {name: 'twitter:title', content: pageTitle},
                    {name: 'twitter:description', content: pageDescription},
                    {name: 'twitter:image', content: imageUrl},
                    {property: 'og:title', content: pageTitle},
                    {property: 'og:type', content: 'article'},
                    {property: 'og:url', content: config.url + this.props.path},
                    {property: 'og:description', content: pageDescription},
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
                            <div>
                            {thing.props.type !== 'video' ? <a onClick={this.onOpenModal}>
                                {thing.props.type === 'book' ? <Thumbnail
                                alt={thing.props.title}
                                type={thing.props.type}
                                image={thing.image}
                                shadow={true}
                                bordered={true}
                                marginBottom={true}
                                displayHeight={200} /> : <Thumbnail
                                alt={thing.props.title}
                                type={thing.props.type}
                                image={thing.image}
                                bordered={true}
                                marginBottom={true}
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
                                    <div className='row'>
                                        <div className='small-6 columns'>
                                            <strong>Description</strong>
                                        </div>
                                        <div className='small-6 columns text-right'>
                                            <Time
                                                hintDirection='bottom-left'
                                                timestamp={thing.image.added}
                                                type='ago'/>
                                        </div>
                                    </div>
                                    <div className='callout'>
                                        <Markdown markdown={thing.image.description} />
                                    </div>
                                    <CopyButton
                                        className='button secondary'
                                        hintDirection='right'
                                        text={thing.image.description}
                                        ariaLabel='Copy description as markdown'/>
                                    <button className='button float-right' onClick={this.onCloseModal}>Close</button>
                                </div> : null}
                            </Modal>
                            </div>
                        </div>
                            <div className='small-12 large-9 columns'>
                                <h1>
                                    {thing.props.title}
                                    {thing.props.url ? <a className='secondary' href={thing.props.url} target='_blank'>
                                        {' '}
                                        <span className='ion-link'/>
                                    </a> : null}
                                </h1>
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <span className='thing-description'>
                                            {thing.props.description}
                                            {authors}
                                        </span>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='shrink columns'>
                                        <Share title={thing.props.title} path={this.props.path}/>
                                    </div>
                                    <div className='columns'>
                                        {thing.props.type === 'book' ? <Affiliate
                                        authors={this.props.data.bookauthors}
                                        title={thing.props.title}
                                        isbn={thing.props.isbn}/> : null}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='small-12 columns'>
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
                                <div>
                                    Tags:
                                    {thing.tags ? <span>
                                        {thing.tags.map((x) => {
                                            return <a key={x} className='tag secondary round small no-margin-bottom' href={`/tags/${x}`}>
                                                {x}
                                        </a>;
                                        })}
                                    </span> : null}
                                    <EditTags tags={thing.tags} id={id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}

export default ThingPage;
