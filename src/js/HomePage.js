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
var HomeSearch = require('./HomeSearch');
var Footer = require('./Footer');

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
                    <div className='small-12 xlarge-4 columns'>
                        <div className='callout warning'>
                            <h2>WikiMentions</h2>
                            Discover people and their work based on their mentions.
                        </div>
                        <div className='callout show-for-xlarge'>
                            <HomeSearch />
                        </div>
                        <div className='callout show-for-xlarge'>
                            <ul className="menu vertical">
                                <li><a href="#">Create</a></li>
                                <li><a href="#">Contribute</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                        <div className='callout show-for-xlarge'>
                            <h2>Did you know?</h2>
                            <a>James Watson</a> and <a>Francis Crick</a> had read <a>Erwin Schrodinger's</a> book <a>What is Life?</a> which inspired
                            them to work on discovering the structure of DNA.
                        </div>
                    </div>
                    <div className='small-12 xlarge-8 columns'>
                        <div className='small-12 columns'>
                            <div className='card-container'>
                                {this.props.data.home.map((x) => {
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
                                <div className='card columns'>
                                    This list is randomly generated.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='small-12 columns'>
                        <Footer />
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
