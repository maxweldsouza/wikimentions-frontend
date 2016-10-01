var _ = require('underscore');
var ButtonSelect = require('./ButtonSelect');
var config = require('./config');
var cookies = require('browser-cookies');
var Helmet = require('react-helmet');
var HomeItem = require('./HomeItem');
var HomeSearch = require('./HomeSearch');
var Mention = require('./Mention');
var Navbar = require('./Navbar');
var Pagination = require('./Pagination');
var React = require('react');
var requests = require('superagent');
var SignupModal = require('./SignupModal');
var Snackbar = require('./Snackbar');

var TagPage = React.createClass({
    statics: {
        resources (appstate) {
            var tag = appstate.path.split('/')[1];
            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            return {
                api: [
                    {
                        name: 'tag',
                        path: '/api/v1/tag/' + tag + query
                    }
                ]
            };
        }
    },
    getInitialState () {
        return {
            pageno: 0
        };
    },
    render () {
        var mentions = [];// this.state.newmentions;
        var options = ['Add New', 'Add Existing'];
        var tag = this.props.path.split('/')[1];
        var nomore = <div className='card box'>
            <div className='small-12 columns'>
                No more entries to show.
            </div>
        </div>;
        var tagCard;
        if (tag === 'Programming') {
            tagCard = <a
                href='/tags/Programming'
                className='secondary tag-card'>
                <img src='/assets/images/pexels-photo-90807.jpeg' />
                    <span className='label'>Programming</span>
                </a>;
        } else if (tag === 'Science') {
            tagCard = <a
                href='/tags/Science'
                className='secondary tag-card'>
                <img src='/assets/images/sky-earth-space-working.jpg' />
                    <span className='label'>Science</span>
                </a>;
        } else if (tag === 'Startups') {
            tagCard = <a
                href='/tags/Startups'
                className='secondary tag-card'>
                <img src='/assets/images/pexels-photo.jpg' />
                    <span className='label'>Startups</span>
                </a>;
        }
        return (
            <span>
                <Helmet
                    title={tag}
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
                        <div className='show-for-xlarge'>
                            {tagCard}
                        </div>
                        <div className='callout show-for-xlarge'>
                            <h2>Tags</h2>
                            <span className='tag'>
                                <a className='secondary' href='/tags/Programming'>Programming</a>
                            </span>{' '}
                            <span className='tag'>
                                <a className='secondary' href='/tags/Science'>Science</a>
                            </span>{' '}
                            <span className='tag'>
                                <a className='secondary' href='/tags/Startups'>Startups</a>
                            </span>
                        </div>
                        <div className='callout show-for-xlarge'>
                            <h2>About</h2>
                            <p>
                                WikiMentions helps you discover people, their books and videos based on their mentions. People can mention other people, books or videos in books or videos. Content can be added and edited by anyone.
                            </p>
                        </div>
                    </div>
                    <div className='small-12 xlarge-8 columns'>
                        <div className='card-container'>
                            {this.props.data.tag.map((x) => {
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
                            {this.props.data.tag.length === 0 ? nomore : null}
                            <div className='small-12 columns box'>
                                <Pagination path={this.props.path} page={this.props.query.page} count={this.props.data.tag.length}/>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = TagPage;
