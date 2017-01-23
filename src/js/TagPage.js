import _ from 'underscore';
import ButtonSelect from './ButtonSelect';
import config from './config';
import cookies from 'browser-cookies';
import Helmet from 'react-helmet';
import HomeItem from './HomeItem';
import HomeSearch from './HomeSearch';
import Mention from './Mention';
import Navbar from './Navbar';
import Pagination from './Pagination';
import React from 'react';
import requests from 'superagent';
import SignupModal from './SignupModal';
import Snackbar from './Snackbar';

class TagPage extends React.Component {
    static resources (appstate) {
        const tag = appstate.path.split('/')[1];
        const page = appstate.query.page;
        const query = page ? `?page=${page}` : '';
        return {
            api: [
                {
                    name: 'tag',
                    path: `/api/v1/tag/${tag}${query}`
                }
            ]
        };
    }
    getInitialState () {
        return {
            pageno: 0
        };
    }
    render () {
        const mentions = [];// this.state.newmentions;
        const options = ['Add New', 'Add Existing'];
        const tag = this.props.path.split('/')[1];
        const nomore = <div className='card box'>
            <div className='small-12 columns'>
                No more entries to show.
            </div>
        </div>;
        let tagCard;
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
                    titleTemplate={`%s - ${config.name}`}
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
}

export default TagPage;
