var _ = require('underscore');
var ButtonSelect = require('./ButtonSelect');
var config = require('./config');
var cookies = require('browser-cookies');
var Helmet = require('react-helmet');
var HomeItem = require('./HomeItem');
var HomeSearch = require('./HomeSearch');
var Mention = require('./Mention');
var Navbar = require('./Navbar');
var React = require('react');
var requests = require('superagent');
var SignupModal = require('./SignupModal');
var Snackbar = require('./Snackbar');
var VideoEmbed = require('./VideoEmbed');
var Link = require('./Link');
var Thumbnail = require('./Thumbnail');

var HomePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: [
                    {
                        name: 'startups',
                        path: '/api/v1/tag/Startups'
                    },
                    {
                        name: 'science',
                        path: '/api/v1/tag/Science'
                    },
                    {
                        name: 'programming',
                        path: '/api/v1/tag/Programming'
                    }
                ]
            };
        }
    },
    getInitialState () {
        return {
            tab: 'Startups'
        };
    },
    onChangeTab (x) {
        this.setState({tab: x});
    },
    render () {
        var tabs = ['Startups', 'Science', 'Programming'];
        var featuredVideo = {
            "book_count": 0,
            "deleted": 0,
            "id": 193,
            "mentioned_by_count": 0,
            "mentioned_count": 0,
            "props": {
                "slug": "brief-candle-in-the-dark-with-richard-dawkins",
                "title": "Brief Candle in the Dark - with Richard Dawkins",
                "type": "video",
                "url": "https://www.youtube.com/watch?v=jYqMWP2wxW4"
            },
            "video_count": 0
        };
        var video2 = {
            "book_count": 0,
            "deleted": 0,
            "id": 194,
            "mentioned_by_count": 0,
            "mentioned_count": 0,
            "props": {
                "slug": "head-to-head-dawkins-on-religion-is-religion-good-or-evil",
                "title": "Head to Head - Dawkins on religion: Is religion good or evil?",
                "type": "video",
                "url": "https://www.youtube.com/watch?v=U0Xn60Zw03A"
            },
            "video_count": 0
        };
        var video3 = {
            "book_count": 0,
            "deleted": 0,
            "id": 195,
            "mentioned_by_count": 0,
            "mentioned_count": 4,
            "props": {
                "slug": "richard-dawkins-conversation-with-neil-degrasse-tyson-at-hayden-planetarium",
                "title": "Richard Dawkins Conversation with Neil deGrasse Tyson at Hayden Planetarium",
                "type": "video",
                "url": "https://www.youtube.com/watch?v=4z4gISBuDVU"
            },
            "video_count": 0
        };
        var books = [
            {
                "book_count": 0,
                "deleted": 0,
                "id": 1,
                "image": {
                    "added": "2016-08-02T17:16:40+05:30",
                    "description": "Source: [Richard Dawkins Foundation](https://richarddawkins.net/richarddawkins/)  \r\nLicense: Non-free, fair use, cover art",
                    "height": 200,
                    "id": 1106,
                    "md5": "8cc4d2aa8b4546756bdd736e73e763e7",
                    "thumb_height": 120,
                    "thumb_md5": "bfa6bde4c5b902a0ad8abe04c39b2492",
                    "thumb_width": 75,
                    "width": 125
                },
                "mentioned_by_count": 0,
                "mentioned_count": 7,
                "props": {
                    "description": "",
                    "isbn": "0618918248",
                    "isbn13": "978-0618918249",
                    "slug": "the-god-delusion",
                    "title": "The God Delusion",
                    "type": "book"
                },
                "video_count": 0
            },
            {
                "book_count": 0,
                "deleted": 0,
                "id": 6,
                "image": {
                    "added": "2016-08-05T00:34:43+05:30",
                    "description": "Source: [simonandschuster](http://www.simonandschuster.com/books/The-Magic-of-Reality/Richard-Dawkins/9781451675047)  \r\nLicense: Non-free, fair use, cover art",
                    "height": 200,
                    "id": 1185,
                    "md5": "571edb767df7c94a05cc8d8e9e7d9dcf",
                    "thumb_height": 114,
                    "thumb_md5": "44d63087a2028cd622664cb7355a0b68",
                    "thumb_width": 75,
                    "width": 131
                },
                "mentioned_by_count": 0,
                "mentioned_count": 0,
                "props": {
                    "description": "",
                    "isbn": "1451675046",
                    "isbn13": "978-1451675047",
                    "slug": "the-magic-of-reality",
                    "title": "The Magic of Reality",
                    "type": "book"
                },
                "video_count": 0
            },
            {
                "book_count": 0,
                "deleted": 0,
                "id": 9,
                "image": {
                    "added": "2016-08-02T16:53:04+05:30",
                    "description": "Source: [simonandschuster](http://www.simonandschuster.com/books/The-Greatest-Show-on-Earth/Richard-Dawkins/9781416594796)  \r\nLicense: Non-free, fair use, cover art",
                    "height": 200,
                    "id": 1104,
                    "md5": "4c3cf388c7baf3ae44ef9a76fa57516c",
                    "thumb_height": 116,
                    "thumb_md5": "38ae3bccff725ed055054264981d5337",
                    "thumb_width": 75,
                    "width": 129
                },
                "mentioned_by_count": 0,
                "mentioned_count": 0,
                "props": {
                    "description": "",
                    "isbn": "1416594795",
                    "isbn13": "978-1416594796",
                    "slug": "the-greatest-show-on-earth",
                    "title": "The Greatest Show on Earth",
                    "type": "book"
                },
                "video_count": 0
            },
            {
                "book_count": 0,
                "deleted": 0,
                "id": 10,
                "image": {
                    "added": "2016-08-02T17:02:15+05:30",
                    "description": "Source: [Richard Dawkins Foundation](https://richarddawkins.net/afw/)  \r\nLicense: Non-free, fair use, cover art",
                    "height": 200,
                    "id": 1105,
                    "md5": "f195b9b1b7eaa54caba20be4f5d7ab47",
                    "thumb_height": 113,
                    "thumb_md5": "157a0248fb07bfaf48279da0396f48d8",
                    "thumb_width": 75,
                    "width": 132
                },
                "mentioned_by_count": 0,
                "mentioned_count": 0,
                "props": {
                    "description": "",
                    "isbn": "0062225804",
                    "isbn13": "978-0062225801",
                    "slug": "an-appetite-for-wonder",
                    "title": "An Appetite for Wonder",
                    "type": "book"
                },
                "video_count": 0
            }
        ];
        var people = [
            {
                "book_count": 4,
                "deleted": 0,
                "id": 137,
                "image": {
                    "added": "2016-07-14T19:16:49+05:30",
                    "description": "Source: https://commons.wikimedia.org/wiki/File:Derren_Victor_Brown.jpg  \r\nAuthor:  [Cen2s2s](https://en.wikipedia.org/wiki/User:Cen2s2s)\r\nLicense: Public domain",
                    "height": 250,
                    "id": 811,
                    "md5": "daeca2fbec59b2caf34e26e224eaab4f",
                    "thumb_height": 75,
                    "thumb_md5": "46440345b87b80c5879312bd95622429",
                    "thumb_width": 75,
                    "width": 250
                },
                "mentioned_by_count": 0,
                "mentioned_count": 4,
                "props": {
                    "description": "Mentalist",
                    "slug": "derren-brown",
                    "title": "Derren Brown",
                    "type": "person",
                    "url": "http://derrenbrown.co.uk/"
                },
                "tags": [
                    "Magic"
                ],
                "video_count": 9
            },
            {
                "book_count": 13,
                "deleted": 0,
                "id": 108,
                "image": {
                    "added": "2016-07-12T19:35:25+05:30",
                    "description": "Richard Dawkins at New York City's Cooper Union to discuss his book The Greatest Show on Earth: The Evidence for Evolution  \r\nSource: https://en.wikipedia.org/wiki/Richard_Dawkins#/media/File:Richard_Dawkins_Cooper_Union_Shankbone.jpg  \r\nAuthor: [David Shankbone](http://blog.shankbone.org/)  \r\nLicense: [CC BY 3.0](http://creativecommons.org/licenses/by/3.0)",
                    "height": 250,
                    "id": 746,
                    "md5": "ca7858b0ac61655d19cc7aef5fa93f8e",
                    "thumb_height": 75,
                    "thumb_md5": "9d4b26bf646997b5b8964517bd3a321b",
                    "thumb_width": 75,
                    "width": 250
                },
                "mentioned_by_count": 6,
                "mentioned_count": 22,
                "props": {
                    "description": "Evolutionary Biologist",
                    "slug": "richard-dawkins",
                    "title": "Richard Dawkins",
                    "type": "person"
                },
                "tags": [
                    "Science"
                ],
                "video_count": 18
            },
            {
                "book_count": 25,
                "deleted": 0,
                "id": 530,
                "image": {
                    "added": "2016-08-02T23:58:40+05:30",
                    "description": "http://www.mynewsdesk.com/se/images/christopher-hitchens-29854 under http://creativecommons.org/licenses/by/3.0/",
                    "height": 250,
                    "id": 1112,
                    "md5": "6191eeb128621a70afc9d3298793bea7",
                    "thumb_height": 75,
                    "thumb_md5": "1f9ea503d23a5c2a22118df69d1584f0",
                    "thumb_width": 75,
                    "width": 250
                },
                "mentioned_by_count": 1,
                "mentioned_count": 34,
                "props": {
                    "description": "Author",
                    "slug": "christopher-hitchens",
                    "title": "Christopher Hitchens",
                    "type": "person"
                },
                "video_count": 2
            }
        ];
        return (
            <span>
                <Helmet
                    title={'Home'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': 'Discover people, books and videos based on mentions'}
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
                <div className='full-width'>
                    <div className='row'>
                        <div className='small-12 columns margin-bottom'>
                            <div className='row'>
                                <div className='small-12 large-8 columns margin-bottom'>
                                    <VideoEmbed autoplay={false} url={featuredVideo.props.url} embeddable={true} width={640} height={360}/>
                                    <h1><strong><Link
                                        id={featuredVideo.id}
                                        slug={featuredVideo.props.slug}
                                        className='secondary'
                                        type={featuredVideo.props.type}>{featuredVideo.props.title}</Link></strong></h1>
                                        <div className='callout warning'>
                                            <p>
                                            WikiMentions helps you discover books and people mentioned by prominent people. People can mention other people, books or videos in books or videos. Content can be added and edited by anyone.
                                            </p>
                                        </div>
                                </div>
                                <div className='small-12 large-4 columns'>
                                    <div className='row'>
                                        <div className='small-12 columns margin-bottom'>
                                            <VideoEmbed autoplay={false} url={video2.props.url} embeddable={true} width={640} height={360}/>
                                            <strong><Link
                                                id={video2.id}
                                                slug={video2.props.slug}
                                                className='secondary'
                                                type={video2.props.type}>{video2.props.title}</Link></strong>
                                        </div>
                                        <div className='small-12 columns margin-bottom'>
                                            <VideoEmbed autoplay={false} url={video3.props.url} embeddable={true} width={640} height={360}/>
                                            <strong><Link
                                                id={video3.id}
                                                slug={video3.props.slug}
                                                className='secondary'
                                                type={video3.props.type}>{video3.props.title}</Link></strong>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='full-width white'>
                    <div className='row'>
                        <div className='small-12 columns margin-bottom'>
                            <h2 className='home-section'>Browse Tags</h2>
                            <div className='row'>
                                <div className='small-12 medium-6 large-4 columns text-center'>
                                    <a
                                    href='/tags/Programming'
                                    className='secondary tag-card'>
                                    <img src='/assets/images/pexels-photo-90807.jpeg' />
                                        <span className='label'>Programming</span>
                                    </a>
                                </div>
                                <div className='small-12 medium-6 large-4 columns text-center'>
                                    <a
                                    href='/tags/Science'
                                    className='secondary tag-card'>
                                    <img src='/assets/images/sky-earth-space-working.jpg' />
                                        <span className='label'>Science</span>
                                    </a>
                                </div>
                                <div className='small-12 medium-6 large-4 columns text-center'>
                                    <a
                                    href='/tags/Startups'
                                    className='secondary tag-card'>
                                    <img src='/assets/images/pexels-photo.jpg' />
                                        <span className='label'>Startups</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='full-width'>
                    <div className='row'>
                        <div className='small-12 columns margin-bottom'>
                            <h2 className='home-section'>Featured books</h2>
                            <div className='row'>
                                {books.map((x) => {
                                    return <div className='small-12 medium-6 large-3 columns text-center'>
                                        <Link
                                        id={x.id}
                                        slug={x.props.slug}
                                        className='home-books'
                                        type={x.props.type}>
                                            <Thumbnail
                                                alt={x.props.title}
                                                type={x.props.type}
                                                image={x.image}
                                                shadow={true}
                                                bordered={true}
                                                marginBottom={true}
                                                displayHeight={200} />
                                        </Link>
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='full-width'>
                    <div className='row'>
                        <div className='small-12 columns margin-bottom'>
                            <h2 className='home-section'>Featured people</h2>
                            <div className='row'>
                                {people.map((x) => {
                                    return <div className='small-12 large-4 columns text-center'>
                                        <div className='person-card'>
                                            <Link
                                                id={x.id}
                                                className='secondary'
                                                slug={x.props.slug}
                                                type={x.props.type}>
                                                <span className='person-card-img'>
                                                    <Thumbnail
                                                        alt={x.props.title}
                                                        type={x.props.type}
                                                        image={x.image}
                                                        shadow={false}
                                                        round={true}
                                                        bordered={true}
                                                        marginBottom={true}
                                                        displayWidth={200} />
                                                </span>
                                                <span className='person-card-title'>{x.props.title}</span>
                                            </Link>
                                            <div className='person-card-description'>{x.props.description}</div>
                                        </div>
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
