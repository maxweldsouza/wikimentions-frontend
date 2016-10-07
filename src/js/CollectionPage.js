var React = require('react');

var Helmet = require('react-helmet');
var _ = require('underscore');

var config = require('./config');
var Navbar = require('./Navbar');
var cookies = require('browser-cookies');
var requests = require('superagent');
var Select = require('./Select');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');
var Video = require('./Video');
var Book = require('./Book');
var Person = require('./Person');
var Pagination = require('./Pagination');

var CollectionPage = React.createClass({
    statics: {
        resources (appstate) {
            var [type, id, slug] = appstate.path.split('/');
            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            return {
                api: [
                    {
                        name: 'collection',
                        path: '/api/v1/collections/' + id
                    },
                    {
                        name: 'items',
                        path: '/api/v1/collections/items/' + id + query
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
        .post('/api/v1/collections/items/' + id)
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
        var collection = this.props.data.items;
        var title = this.props.data.collection.title;
        var description = this.props.data.collection.description;
        return (
            <div className='flex-wrapper'>
                <Helmet
                    title={title}
                    titleTemplate={'%s - ' + config.name + ' - Blog'}
                    meta={[
                        {name: 'description', 'content': ''},
                        {name: 'twitter:card', content: 'summary'},
                        {name: 'twitter:site', content: config.twitter},
                        {name: 'twitter:title', content: title},
                        {name: 'twitter:description', content: description},
                        {property: 'og:title', content: title},
                        {property: 'og:type', content: 'article'},
                        {property: 'og:url', content: config.url + this.props.path},
                        {property: 'og:description', content: description},
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
                <div className='row page-body white'>
                    <div className='small-12 large-8 columns'>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <div className=''>
                                    <h1>Collections - {title}</h1>
                                    {description}
                                    <hr className='no-margin-bottom'/>
                                    <div className='margin-bottom'>
                                        {collection.map((x) => {
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
                                        {collection.length === 0 ? <div>
                                            <div className='blankslate'>
                                                <span className='icon ion-ios-list'/>
                                                <h3>Collection is Empty</h3>
                                                No items have been added to this collection. You can begin adding items below.
                                            </div>
                                            <hr />
                                        </div> : null}
                                    </div>
                                    <Pagination path={this.props.path} page={this.props.query.page} count={collection.length}/>
                                    <h2>Add to Collection</h2>
                                    <form onSubmit={this.onSubmit}>
                                        {this.state.formMessage ? <div className='callout alert'>
                                            {this.state.formMessage}
                                        </div> : null}
                                        <Select
                                            name='id'
                                            placeholder='search'
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

module.exports = CollectionPage;
