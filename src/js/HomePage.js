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
var utils = require('./utils');

var HomePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: [
                    {
                        name: 'home',
                        path: '/api/v1/home'
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
        var featuredVideo = this.props.data.home.featuredVideo;
        var video2 = this.props.data.home.video2;
        var video3 = this.props.data.home.video3;
        var books = this.props.data.home.books;
        var people = this.props.data.home.people;
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
                                    <Link
                                        id={featuredVideo.id}
                                        slug={featuredVideo.props.slug}
                                        className='secondary'
                                        type={featuredVideo.props.type}>
                                        <img className='home-video-thumb' src={utils.youtubeThumb(featuredVideo.props.url, 'max')} />
                                        <h1 className='video-title'>
                                            {featuredVideo.props.title}
                                        </h1>
                                    </Link>
                                </div>
                                <div className='small-12 large-4 columns'>
                                    <div className='row'>
                                        <div className='small-12 medium-6 large-12 columns margin-bottom'>
                                            <Link
                                                id={video2.id}
                                                slug={video2.props.slug}
                                                className='secondary'
                                                type={video2.props.type}>
                                                <img className='home-video-thumb' src={utils.youtubeThumb(video2.props.url)} />
                                                <strong className='video-title'>
                                                    {video2.props.title}
                                                </strong>
                                            </Link>
                                        </div>
                                        <div className='small-12 medium-6 large-12 columns margin-bottom'>
                                            <div className='callout warning'>
                                                WikiMentions helps you discover books and people mentioned by prominent people. People can mention other people, books or videos in books or videos. Content can be added and edited by anyone.
                                            </div>
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
                                    <div className='small-12 columns'>
                                        <a
                                        href='/tags/Programming'
                                        className='secondary tag-card'>
                                        <img src='/assets/images/pexels-photo-90807.jpeg' />
                                            <span className='label'>Programming</span>
                                        </a>
                                    </div>
                                </div>
                                <div className='small-12 medium-6 large-4 columns text-center'>
                                    <div className='small-12 columns'>
                                        <a
                                        href='/tags/Science'
                                        className='secondary tag-card'>
                                        <img src='/assets/images/sky-earth-space-working.jpg' />
                                            <span className='label'>Science</span>
                                        </a>
                                    </div>
                                </div>
                                <div className='small-12 medium-6 large-4 columns text-center'>
                                    <div className='small-12 columns'>
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
                </div>
                <div className='full-width'>
                    <div className='row'>
                        <div className='small-12 columns margin-bottom'>
                            <div className='row'>
                                <div className='small-12 medium-4 columns'>
                                        <h2 className='home-section'>Lists</h2>
                                        <div><a href='/lists/1/best-python-talks'>Best Python Talks</a></div>
                                </div>
                                <div className='small-12 medium-8 columns'>
                                        <h2 className='home-section'>Quotes</h2>
                                        <blockquote>
                                            It doesn't matter how beautiful your theory is, it doesn't matter how smart you are. If it doesn't agree with experiment, it's wrong. --<a href='/quotes/116/richard-feynman'>Richard Feynman</a>
                                        </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='small-12 columns margin-bottom'>
                            <h2 className='home-section'>Featured books</h2>
                            <div className='row'>
                                {books.map((x) => {
                                    return <div key={x.id} className='small-6 medium-4 large-3 xlarge-2 columns text-center'>
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
                                                offset={10000}
                                                displayHeight={200} />
                                        </Link>
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='small-12 columns margin-bottom'>
                            <h2 className='home-section'>Featured people</h2>
                            <div className='row'>
                                {people.map((x) => {
                                    return <div key={x.id} className='small-12 medium-6 large-4 xlarge-3 columns text-center'>
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
                                                        offset={10000}
                                                        displayWidth={120} />
                                                </span>
                                                <span className='person-card-title'>{x.props.title}</span>
                                            </Link>
                                            <div className='person-card-description' title={x.props.description}>{x.props.description}</div>
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
