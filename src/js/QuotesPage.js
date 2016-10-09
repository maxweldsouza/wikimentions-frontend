var _ = require('underscore');
var config = require('./config');
var cookies = require('browser-cookies');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Pagination = require('./Pagination');
var queryString = require('query-string');
var React = require('react');
var requests = require('superagent');
var Select = require('./Select');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');
var Thumbnail = require('./Thumbnail');
var PageBar = require('./PageBar');

var QuotesPage = React.createClass({
    statics: {
        resources (appstate) {
            var [type, id, slug] = appstate.path.split('/');
            var queryObj = {};
            if (appstate.query.page) {
                queryObj.page = appstate.query.page;
            }
            queryObj.slug = slug;
            var query = queryString.stringify(queryObj);
            query = query ? '?' + query : '';
            return {
                api: [
                    {
                        name: 'thing',
                        path: '/api/v1/thing/' + id
                    },
                    {
                        name: 'quotes',
                        path: '/api/v1/quotes/' + id + query
                    }
                ]
            };
        }
    },
    getInitialState () {
        return {
            quote: '',
            submitting: false
        };
    },
    onChangeText (e) {
        var temp = {
            error: false,
            message: ''
        };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    validateForm () {
        var valid = true;
        return valid;
    },
    onSubmit (e) {
        e.preventDefault();
        var id = Number(this.props.path.split('/')[1]);
        if (this.validateForm()) {
            this.setState({
                submitting: true
            });
            requests
            .post('/api/v1/quotes/' + id)
            .type('form')
            .send({
                quote: this.state.quote,
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
                        formMessage: '',
                        quote: ''
                    });
                    Snackbar({message: 'Quote added'});
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    },
    render () {
        var quotes = this.props.data.quotes.items;
        var total = this.props.data.quotes.total;
        var metaRobots;
        if (total === 0) {
            metaRobots = {'name': 'robots', 'content': 'noindex'};
        } else {
            metaRobots = {'name': 'robots', 'content': 'index'};
        }
        return (
            <span>
                <Helmet
                    title={'Quotes - ' + this.props.data.thing.props.title}
                    titleTemplate={'%s - ' + config.name}
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
                                <h1>{this.props.data.thing.props.title} - Quotes</h1>
                                <PageBar
                                    id={this.props.data.thing.id}
                                    slug={this.props.data.thing.props.slug}
                                    type={this.props.data.thing.props.type} />
                                <hr />
                                {quotes.length > 0 ? <div className='row'>
                                    <div className='shrink columns'>
                                        <Thumbnail
                                            alt={this.props.data.thing.props.title}
                                            type={this.props.data.thing.props.type}
                                            image={this.props.data.thing.image}
                                            url={this.props.data.thing.props.url}
                                            displayWidth={75} />
                                    </div>
                                    <div className='columns'>
                                        <blockquote className='quote'>
                                            {_.first(quotes).quote}
                                        </blockquote>
                                    </div>
                                </div> : <div className='blankslate'>
                                    <span className='icon ion-quote'/>
                                    <h3>No quotes added</h3>
                                    There are no quotes added for {this.props.data.thing.props.title}. You could help us by adding some of your favorite quotes.
                                </div>}
                                <hr />
                                <div className='row'>
                                    {_.rest(quotes).map((x) => {
                                        return <div className='small-12 columns'>
                                            <blockquote className='quote'>
                                                {x.quote}
                                            </blockquote>
                                            <hr />
                                        </div>;
                                    })}
                                </div>
                                <Pagination path={this.props.path} page={this.props.query.page} count={quotes.length} total={total}/>
                                <h2>Add Quote</h2>
                                <form onSubmit={this.onSubmit}>
                                    <textarea type='text' name='quote' onChange={this.onChangeText} value={this.state.quote} rows={3}>
                                    </textarea>
                                    {this.state.quote.length > 0 ? 140 - this.state.quote.length : null}
                                    <SubmitButton title='Add' className='button primary float-right' submitting={this.state.submitting}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = QuotesPage;
