var _ = require('underscore');
var ButtonSelect = require('./ButtonSelect');
var config = require('./config');
var cookies = require('browser-cookies');
var Helmet = require('react-helmet');
var HomeItem = require('./HomeItem');
var HomeSearch = require('./HomeSearch');
var LoginModal = require('./LoginModal');
var Mention = require('./Mention');
var Navbar = require('./Navbar');
var Pagination = require('./Pagination');
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
                        name: 'stats',
                        path: '/api/v1/stats'
                    },
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
            pageno: 0,
            newmentions: this.props.data.new
        };
    },
    render () {
        var mentions = [];// this.state.newmentions;
        var stats = this.props.data.stats;
        var options = ['Add New', 'Add Existing'];
        return (
            <span>
                <Helmet
                    title={'Home'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''}
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
                            Discover people and their work based on their mentions.
                        </div>
                        <div className='callout show-for-xlarge'>
                            <HomeSearch />
                        </div>
                        <div className='callout show-for-xlarge'>
                            {this.props.loggedin ? <a onClick={Mentions.logout}>Log Out</a> : <span><LoginModal/>{' / '}<SignupModal/></span>}
                        </div>
                        <div className='callout show-for-xlarge'>
                            <ul className='menu vertical row'>
                                <li><a href='/blog'>Blog</a></li>
                                <li><a href='/recent-changes'>Recent Changes</a></li>
                                <li><a href='/recent-discussions'>Recent Discussions</a></li>
                            </ul>
                        </div>
                        <div className='callout show-for-xlarge'>
                            <h2>About</h2>
                            <ul>
                                <li>Pages are created and edited by users.</li>
                                <li>A page can be a <strong><i>person</i></strong>, <strong><i>book</i></strong> or <strong><i>video</i></strong>.</li>
                                <li>A <strong><i>person</i></strong> can mention a <strong><i>person</i></strong>, <strong><i>book</i></strong> or <strong><i>video</i></strong> in a <strong><i>book</i></strong> or <strong><i>video.</i></strong></li>
                                <li>Books and videos can have one or more authors.</li>
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
                        <div className='card-container'>
                            <div className='card box columns'>
                                <h2 className='no-margin-bottom'>Startups</h2> (Randomly generated)
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
                        </div>
                        <div className='card-container'>
                            <div className='card box columns'>
                                <h2 className='no-margin-bottom'>Science</h2> (Randomly generated)
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
                        </div>
                        <div className='card-container'>
                            <div className='card box columns'>
                                <h2 className='no-margin-bottom'>Programming</h2> (Randomly generated)
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
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
