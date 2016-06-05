var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var Signup = require('./Signup');
var _ = require('underscore');
var Mention = require('./Mention');
var Pagination = require('./Pagination');
var requests = require('superagent');
var ButtonSelect = require('./ButtonSelect');
var config = require('./config');
var Snackbar = require('./Snackbar');
var HomeItem = require('./HomeItem');

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
                        name: 'home',
                        path: '/api/v1/home'
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
    loadData (pageno) {
        // requests.get('/api/v1/new/10/' + pageno).end((err, res) => {
        //     this.setState({
        //         newmentions: res.body,
        //         pageno: pageno
        //     });
        // });
    },
    onPrevPage () {
        this.loadData(this.state.pageno - 1);
    },
    onNextPage () {
        this.loadData(this.state.pageno + 1);
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
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <h2>People</h2>
                        <div className='small-12 columns'>
                            <div className='card-container'>
                                {this.props.data.home.map((x) => {
                                    return <HomeItem
                                        id={x.id}
                                        title={x.title}
                                        type={x.type}
                                        slug={x.slug}
                                        book_count={x.book_count}
                                        video_count={x.video_count}
                                        mentioned_count={x.mentioned_count}
                                        mentioned_by_count={x.mentioned_by_count}/>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
