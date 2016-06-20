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
        var pageQuery = page ? '?page=' + page : '';
        requests.get('/api/v1/search/' + x + pageQuery).end((err, res) => {
            this.setState({
                results: res.body.results,
                numFound: res.body.numFound
            });
        });
    },
    handleKeys (event) {
        if (event.key === 'Enter') {
            var path = '/search?q=' + this.state.searchText;
            history.pushState(null, null, path);
            Mentions.route(path);
        }
    },
    render () {
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
                        <div className='small-12 columns'>
                            <div className='card-container'>
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
