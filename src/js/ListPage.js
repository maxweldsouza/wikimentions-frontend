import _ from 'underscore';
import Book from './Book';
import config from './config';
import cookies from 'browser-cookies';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import Pagination from './Pagination';
import Person from './Person';
import React from 'react';
import requests from 'superagent';
import Select from './Select';
import snackbar from './snackbar';
import SubmitButton from './SubmitButton';
import Video from './Video';
import autoBind from 'react-autobind';

class ListPage extends React.Component {
    static resources (appstate) {
        const [type, id, slug] = appstate.path.split('/');
        const page = appstate.query.page;
        const query = page ? `?page=${page}` : '';
        return {
            api: [
                {
                    name: 'list',
                    path: `/api/v1/lists/${id}`
                },
                {
                    name: 'items',
                    path: `/api/v1/lists/items/${id}${query}`
                }
            ]
        };
    }
    constructor (props) {
        super(props);
        autoBind(this);
        this.state = {
            id: null,
            submitting: false,
            formMessage: '',
            valid: true,
            message: ''
        };
    }
    onSelect (x) {
        this.setState({
            id: x.id
        });
    }
    onSubmit (e) {
        const [type, id, slug] = this.props.path.split('/');
        e.preventDefault();
        this.setState({
            submitting: true
        });
        requests
        .post(`/api/v1/lists/items/${id}`)
        .type('form')
        .send({
            obj_id: this.state.id,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submitting: false
            });
            if (err && err.status) {
                this.setState({
                    formMessage: res.body.message
                });
            } else {
                this.setState({
                    formMessage: ''
                });
                snackbar({message: 'Added item'});
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    }
    render () {
        const list = this.props.data.items.items;
        const title = this.props.data.list.title;
        const description = this.props.data.list.description;
        const total = this.props.data.items.total;

        const page = this.props.query.page ? this.props.query.page : 1;
        const start = (page - 1) * list.length + 1;
        const end = page * list.length;
        let metaRobots;
        if (total === 0) {
            metaRobots = {'name': 'robots', 'content': 'noindex'};
        } else {
            metaRobots = {'name': 'robots', 'content': 'index'};
        }
        return (
            <div className='flex-wrapper'>
                <Helmet
                    title={title}
                    titleTemplate={`%s - ${config.name} - Lists`}
                    meta={[
                        metaRobots
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
                <div className='row page-body white'>
                    <div className='small-12 large-8 columns'>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <div className=''>
                                    <h1>List - {title}</h1>
                                    {description}
                                    <hr className='no-margin-bottom'/>

                                    <div className='margin-bottom'>
                                        {list.map((x) => {
                                            if (x.props.type === 'video') {
                                                return <Video
                                                        key={x.id}
                                                        id={x.id}
                                                        type={x.props.type}
                                                        slug={x.props.slug}
                                                        title={x.props.title}
                                                        mentioned_count={x.mentioned_count}
                                                        mentioned_by_count={x.mentioned_by_count}
                                                        image={x.image}
                                                        url={x.props.url}/>;
                                            } else if (x.props.type === 'book') {
                                                return <Book
                                                    key={x.id}
                                                    id={x.id}
                                                    image={x.image}
                                                    type={x.props.type}
                                                    slug={x.props.slug}
                                                    title={x.props.title}
                                                    description={x.props.description}
                                                    mentioned_count={x.mentioned_count}
                                                    mentioned_by_count={x.mentioned_by_count}
                                                    isbn={x.isbn}
                                                    isbn13={x.isbn13}
                                                    />;
                                            }
                                            return <Person
                                                key={x.id}
                                                id={x.id}
                                                image={x.image}
                                                type={x.props.type}
                                                slug={x.props.slug}
                                                title={x.props.title}
                                                description={x.props.description}
                                                book_count={x.book_count}
                                                video_count={x.video_count}
                                                mentioned_count={x.mentioned_count}
                                                mentioned_by_count={x.mentioned_by_count}
                                                isbn={x.isbn}
                                                isbn13={x.isbn13}/>;
                                        })}
                                        {list.length === 0 ? <div>
                                            <div className='blankslate'>
                                                <span className='icon ion-android-list'/>
                                                <h3>List is Empty</h3>
                                                No items have been added to this list. You can begin adding items below.
                                            </div>
                                            <hr />
                                        </div> : null}
                                    </div>
                                    <Pagination path={this.props.path} page={this.props.query.page} count={list.length} total={total}/>
                                    {list.length > 0 ? <div className='text-right'>
                                        Showing results {start} to {end} of {total}
                                    </div> : null}
                                    <h2>Add to list</h2>
                                    <form onSubmit={this.onSubmit}>
                                        {this.state.formMessage ? <div className='callout alert'>
                                            {this.state.formMessage}
                                        </div> : null}
                                        <Select
                                            name='id'
                                            placeholder='Search'
                                            onSelectValue={this.onSelect}
                                            valid={this.state.valid}
                                            message={this.state.message} />
                                        <SubmitButton title='Add' className='button primary float-right' submitting={this.state.submitting}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListPage;
