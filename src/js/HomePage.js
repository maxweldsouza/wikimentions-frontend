import _ from 'underscore';
import ButtonSelect from './ButtonSelect';
import config from './config';
import cookies from 'browser-cookies';
import Helmet from 'react-helmet';
import HomeItem from './HomeItem';
import HomeSearch from './HomeSearch';
import Mention from './Mention';
import Navbar from './Navbar';
import React from 'react';
import requests from 'superagent';
import SignupModal from './SignupModal';
import snackbar from './snackbar';
import VideoEmbed from './VideoEmbed';
import Link from './Link';
import Thumbnail from './Thumbnail';
import utils from './utils';
import autoBind from 'react-autobind';

class HomePage extends React.Component {
    static resources (appstate) {
        return {
            api: [
                {
                    name: 'home',
                    path: '/api/v1/home'
                }
            ]
        };
    }
    constructor (props) {
        super(props);
        autoBind(this);
        this.state = {
            tab: 'Startups'
        };
    }
    onChangeTab (x) {
        this.setState({tab: x});
    }
    render () {
        const featuredVideo = this.props.data.home.featuredVideo;
        const video2 = this.props.data.home.video2;
        const video3 = this.props.data.home.video3;
        const books = this.props.data.home.books;
        const people = this.props.data.home.people;
        return (
            <span>
                <Helmet
                    title={'Home'}
                    titleTemplate={`%s - ${config.name}`}
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
                                        <div className='home-video'>
                                            <img className='home-video-thumb' src={utils.youtubeThumb(featuredVideo.props.url, 'max')} />
                                            <h1 className='video-title'>
                                                {featuredVideo.props.title}
                                            </h1>
                                        </div>
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
                                                <div className='home-video'>
                                                    <img className='home-video-thumb' src={utils.youtubeThumb(video2.props.url)} />
                                                    <strong className='video-title'>
                                                        {video2.props.title}
                                                    </strong>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className='small-12 medium-6 large-12 columns margin-bottom'>
                                            <Link
                                                id={video3.id}
                                                slug={video3.props.slug}
                                                className='secondary'
                                                type={video3.props.type}>
                                                <div className='home-video'>
                                                    <img className='home-video-thumb' src={utils.youtubeThumb(video3.props.url)} />
                                                    <strong className='video-title'>
                                                        {video3.props.title}
                                                    </strong>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='small-12 columns margin-bottom'>
                            <div className='home-tagline'>
                                Discover books and people mentioned by prominent people.
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
                                        <div><a href='/lists/1/best-science-books'>Science books</a></div>
                                        <div><a href='/lists/4/programmers-that-created-programming-languages'>Programmers that created programming languages</a></div>
                                        <div><a href='/lists/2/best-programming-books'>Programming books</a></div>
                                        <div><a href='/lists/3/best-programming-talks'>Programming talks</a></div>
                                </div>
                                <div className='small-12 medium-8 columns'>
                                        <h2 className='home-section'>Quotes</h2>
                                        <blockquote>
                                            It doesn't matter how beautiful your theory is, it doesn't matter how smart you are. If it doesn't agree with experiment, it's wrong. --<a href='/quotes/116/richard-feynman'>Richard Feynman</a>
                                        </blockquote>
                                        <blockquote>
                                            I would like to die on mars. Just not on impact. --<a href='/quotes/339/elon-musk'>Elon Musk</a>
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
}

export default HomePage;
