var _ = require('underscore');
var Book = require('./Book');
var config = require('./config');
var cookies = require('browser-cookies');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Pagination = require('./Pagination');
var Person = require('./Person');
var React = require('react');
var requests = require('superagent');
var Select = require('./Select');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');
var Video = require('./Video');

var ListPage = React.createClass({
    statics: {
        resources (appstate) {
            var [type, id, slug] = appstate.path.split('/');
            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            return {
                api: [
                    {
                        name: 'list',
                        path: '/api/v1/lists/' + id
                    },
                    {
                        name: 'items',
                        path: '/api/v1/lists/items/' + id + query
                    }
                ]
            };
        }
    },
    getInitialState () {
        return {
            id: null,
            submitting: false,
            formMessage: '',
            valid: true,
            message: ''
        };
    },
    onSelect (x) {
        this.setState({
            id: x.id
        });
    },
    onSubmit (e) {
        var [type, id, slug] = this.props.path.split('/');
        e.preventDefault();
        this.setState({
            submitting: true
        });
        requests
        .post('/api/v1/lists/items/' + id)
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
                Snackbar({message: 'Added item'});
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    render () {
        var list = this.props.data.items.items;
        var title = this.props.data.list.title;
        var description = this.props.data.list.description;
        var total = this.props.data.items.total;

        var page = this.props.query.page ? this.props.query.page : 1;
        var start = (page - 1) * list.length + 1;
        var end = page * list.length;
        var metaRobots;
        if (total === 0) {
            metaRobots = {'name': 'robots', 'content': 'noindex'};
        } else {
            metaRobots = {'name': 'robots', 'content': 'index'};
        }
        return (
            <div className='flex-wrapper'>
                <Helmet
                    title={title}
                    titleTemplate={'%s - ' + config.name + ' - Blog'}
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
});

module.exports = ListPage;
