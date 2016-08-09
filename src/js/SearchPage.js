var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Comment = require('./Comment');
var requests = require('superagent');
var _ = require('underscore');
var DiscussReply = require('./DiscussReply');
var PageBar = require('./PageBar');
var config = require('./config');
var Select = require('./Select');
var HomeItem = require('./HomeItem');
var Pagination = require('./Pagination');
var ButtonSelect = require('./ButtonSelect');
var queryString = require('query-string');

var SearchPage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    getInitialState () {
        return {
            searchText: this.props.query.q,
            results: [],
            numFound: 0
        };
    },
    componentDidMount () {
        var type = this.props.query.type ? this.props.query.type : 'any';
        this.loadData(this.state.searchText, 1, type);
    },
    componentWillReceiveProps (nextProps) {
        this.setState({
            searchText: nextProps.query.q
        });
        this.loadData(nextProps.query.q, nextProps.query.page, nextProps.query.type);
    },
    onSearchTextChanged (e) {
        this.setState({
            searchText: e.target.value
        });
    },
    loadData (x, page, type) {
        var query = {};
        query.page = page ? page : 1;
        if (type !== 'any') {
            query.types = [type];
        }
        requests.get('/api/v1/search/' + x + '?' + queryString.stringify(query)).end((err, res) => {
            if (err) {
                Snackbar({message: 'Search failed'});
            } else {
                this.setState({
                    results: res.body.results,
                    numFound: res.body.numFound
                });
            }
        });
    },
    onSearchClicked () {
        var type = this.props.query.type ? this.props.query.type : 'any';
        this.newSearch(type);
    },
    newSearch (type) {
        var typeQuery = type !== 'any' ? '&type=' + type : '';
        var path = '/search?q=' + this.state.searchText + typeQuery;
        history.pushState(null, null, path);
        Mentions.route(path);
    },
    handleKeys (event) {
        var type = this.props.query.type ? this.props.query.type : 'any';
        if (event.key === 'Enter') {
            this.newSearch(type);
        }
    },
    onChangeType (type) {
        this.newSearch(type);
    },
    render () {
        var page = this.props.query.page ? this.props.query.page : 1;
        var options = [{name: 'Any', value: 'any'}, {name: 'Person', value: 'person'}, {name: 'Book', value: 'book'}, {name: 'Video', value: 'video'}];
        var start = (page - 1) * this.state.results.length + 1;
        var end = page * this.state.results.length;
        var type = this.props.query.type ? this.props.query.type : 'any';
        return (
            <span>
                <Helmet
                    title={'Search'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'robots', 'content': 'noindex'}
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
                        <h1>Search</h1>
                        <div className='input-group'>
                                <input
                                    type='text' placeholder='Search'
                                    value={this.state.searchText}
                                    onChange={this.onSearchTextChanged}
                                    onKeyDown={this.handleKeys}>
                                </input>
                                <button className='button primary' onClick={this.onSearchClicked} style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
                                    <span className='ion-android-search' style={{fontSize: 17}}/>
                                </button>
                        </div>
                        <div className='row'>
                            <div className='small-12 medium-6 columns'>
                                <ButtonSelect
                                    name='type'
                                    options={options}
                                    default={type}
                                    onChange={this.onChangeType}/>
                            </div>
                            {this.state.results.length > 0 ? <div className='small-12 medium-6 columns text-right'>
                                Showing results {start} to {end} of {this.state.numFound}
                            </div> : null}
                        </div>
                        <div className='small-12 columns'>
                            <div className='card-container'>
                                {this.state.results.length === 0 ? <div className='card'>
                                    <div className='small-12 columns'>
                                        No results found.
                                    </div>
                                </div> : null}
                                {this.state.results.map((x) => {
                                    return <HomeItem
                                        key={x.id}
                                        id={x.id}
                                        title={x.props.title}
                                        image={x.image}
                                        description={x.props.description}
                                        type={x.props.type}
                                        slug={x.props.slug}
                                        url={x.props.url}
                                        book_count={x.book_count}
                                        video_count={x.video_count}
                                        mentioned_count={x.mentioned_count}
                                        mentioned_by_count={x.mentioned_by_count}/>;
                                })}
                                <Pagination
                                    count={this.state.numFound} path={this.props.path}
                                    page={this.props.query.page}
                                    query={this.props.query}/>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = SearchPage;
