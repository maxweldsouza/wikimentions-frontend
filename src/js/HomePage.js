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
                <div className='row page-body align-center'>
                    <div className='small-12 xlarge-4 columns'>
                        <div className='callout warning'>
                            <h2><strong>WikiMentions</strong></h2>
                            Discover people, books and videos based on mentions.
                        </div>
                        <div className='callout show-for-xlarge'>
                            <h2>About</h2>
                            <p>
                                WikiMentions helps you discover people, their books and videos based on their mentions. People can mention other people, books or videos in books or videos. Content can be added and edited by anyone.
                            </p>
                        </div>
                        <div className='callout show-for-xlarge'>
                            <ul className='menu vertical row'>
                                <li><a href='/blog'>Blog</a></li>
                                <li><a rel='nofollow' href='/recent-changes'>Recent Changes</a></li>
                                <li><a rel='nofollow' href='/recent-discussions'>Recent Discussions</a></li>
                            </ul>
                        </div>
                        <div className='callout show-for-xlarge'>
                            <h2>Recent Blog Posts</h2>
                            <ul className='menu vertical row'>
                                <li><a href='/blog/first-post'>First Post</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='small-12 xlarge-8 columns'>
                        <ul className='tabs' role='tabslist'>
                            {tabs.map((x) => {
                                return <li className={this.state.tab === x ? 'tabs-title is-active' : 'tabs-title'} role='tab' title={x} aria-selected={this.state.tab === x}>
                                    <a onClick={this.onChangeTab.bind(null, x)}>{x}</a>
                                </li>;
                            })}
                        </ul>
                        {this.state.tab === 'Startups' ? <div className='card-container'>
                            <div className='card box align-middle'>
                                <div className='small-6 columns'>
                                    Randomly generated every hour
                                </div>
                                <div className='small-6 columns text-right'>
                                    <a href='/tags/Startups' className='button no-margin-bottom primary'>Browse</a>
                                </div>
                            </div>
                            {this.props.data.startups.map((x) => {
                                return <HomeItem
                                    key={x.id}
                                    id={x.id}
                                    title={x.props.title}
                                    image={x.image}
                                    description={x.props.description}
                                    type={x.props.type}
                                    slug={x.props.slug}
                                    book_count={x.book_count}
                                    video_count={x.video_count}
                                    mentioned_count={x.mentioned_count}
                                    mentioned_by_count={x.mentioned_by_count}/>;
                            })}
                        </div> : null}
                        {this.state.tab === 'Science' ? <div className='card-container'>
                            <div className='card box align-middle'>
                                <div className='small-6 columns'>
                                    Randomly generated every hour
                                </div>
                                <div className='small-6 columns text-right'>
                                    <a href='/tags/Science' className='button no-margin-bottom primary'>Browse</a>
                                </div>
                            </div>
                            {this.props.data.science.map((x) => {
                                return <HomeItem
                                    key={x.id}
                                    id={x.id}
                                    title={x.props.title}
                                    image={x.image}
                                    description={x.props.description}
                                    type={x.props.type}
                                    slug={x.props.slug}
                                    book_count={x.book_count}
                                    video_count={x.video_count}
                                    mentioned_count={x.mentioned_count}
                                    mentioned_by_count={x.mentioned_by_count}/>;
                            })}
                        </div> : null}
                        {this.state.tab === 'Programming' ? <div className='card-container'>
                            <div className='card box align-middle'>
                                <div className='small-6 columns'>
                                    Randomly generated every hour
                                </div>
                                <div className='small-6 columns text-right'>
                                    <a href='/tags/Programming' className='button no-margin-bottom primary'>Browse</a>
                                </div>
                            </div>
                            {this.props.data.programming.map((x) => {
                                return <HomeItem
                                    key={x.id}
                                    id={x.id}
                                    title={x.props.title}
                                    image={x.image}
                                    description={x.props.description}
                                    type={x.props.type}
                                    slug={x.props.slug}
                                    book_count={x.book_count}
                                    video_count={x.video_count}
                                    mentioned_count={x.mentioned_count}
                                    mentioned_by_count={x.mentioned_by_count}/>;
                            })}
                        </div> : null}
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
