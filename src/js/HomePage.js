var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var _ = require('lodash');
var Mention = require('./Mention');
var Pagination = require('./Pagination');
var requests = require('superagent');
var ButtonSelect = require('./ButtonSelect');
var config = require('./config');
var Snackbar = require('./Snackbar');
var HomeItem = require('./HomeItem');
var HomeSearch = require('./HomeSearch');
var LoginModal = require('./LoginModal');
var SignupModal = require('./SignupModal');
var cookies = require('browser-cookies');

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
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}/>
                <div className='row page-body align-center'>
                    <div className='small-12 xlarge-4 columns'>
                        <div className='callout warning'>
                            <h2><strong>WikiMentions</strong></h2>
                            Discover people and their work based on their mentions.
                        </div>
                        <div className='callout show-for-xlarge'>
                            <HomeSearch />
                        </div>
                        <div className='callout show-for-xlarge'>
                            {this.props.loggedin ? <a onClick={Mentions.logout}>Log Out</a> : <span><LoginModal/>{' / '}<SignupModal/></span>}
                        </div>
                        <div className='callout show-for-xlarge'>
                            <ul className="menu vertical">
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
                                <div className='card columns'>
                                    This list is randomly generated.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
