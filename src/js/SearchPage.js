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
            numFound: 0,
        };
    },
    componentDidMount () {
        this.loadData(this.state.searchText, 1);
    },
    componentWillReceiveProps (nextProps) {
        this.setState({
            searchText: nextProps.query.q
        });
        this.loadData(nextProps.query.q, nextProps.query.page);
    },
    onSearchTextChanged (e) {
        this.setState({
            searchText: e.target.value
        });
    },
    loadData (x, page) {
        var query = {};
        query['page'] = page ? page : 1;
        if (this.state.type !== 'any') {
            query['types'] = [this.state.type];
        }
        requests.get('/api/v1/search/' + x + '?' + queryString.stringify(query)).end((err, res) => {
            this.setState({
                results: res.body.results,
                numFound: res.body.numFound
            });
        });
    },
    handleKeys (event) {
        if (event.key === 'Enter') {
            var typeQuery = this.state.type !== 'any' ? '&type=' + this.state.type : '';
            var path = '/search?q=' + this.state.searchText + typeQuery;
            history.pushState(null, null, path);
            Mentions.route(path);
        }
    },
    onChangeType (x) {
        this.setState({
            type: x
        });
    },
    render () {
        var page = this.props.query.page ? this.props.query.page : 1;
        var options = [{name: 'Any', value: 'any'}, {name: 'Person', value: 'person'},{name: 'Book', value: 'book'}, {name: 'Video', value: 'video'}];
        var start = (page - 1) * this.state.results.length + 1;
        var end = page * this.state.results.length;
        return (
            <span>
                <Helmet
                    title={'Site Stats'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url + this.props.path}
                    ]}
                    />
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <h1 className='page-title'>Search</h1>
                        <input
                            type='text' placeholder='Search'
                            value={this.state.searchText}
                            onChange={this.onSearchTextChanged}
                            onKeyDown={this.handleKeys}>
                        </input>
                        <div className='row'>
                            <div className='small-12 medium-6 columns'>
                                <ButtonSelect
                                    name='type'
                                    options={options}
                                    default={'any'}
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
                                        id={x.id}
                                        title={x.title}
                                        images={x.images}
                                        description={x.props.description}
                                        type={x.type}
                                        slug={x.slug}
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