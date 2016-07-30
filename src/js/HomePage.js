var _ = require('underscore');
var ButtonSelect = require('./ButtonSelect');
var config = require('./config');
var cookies = require('browser-cookies');
var Feedback = require('./Feedback');
var Helmet = require('react-helmet');
var HomeItem = require('./HomeItem');
var HomeSearch = require('./HomeSearch');
var LoginModal = require('./LoginModal');
var Mention = require('./Mention');
var Navbar = require('./Navbar');
var Pagination = require('./Pagination');
var React = require('react');
var requests = require('superagent');
var SignupModal = require('./SignupModal');
var Snackbar = require('./Snackbar');

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
                            <h2>About</h2>
                            <p>Pages are created and edited by users.</p>
                            <p>A page can be a <i>person</i>, <i>book</i> or <i>video</i>.</p>
                            <p>A <i>person</i> can mention a <i>person</i>, <i>book</i> or <i>video</i> in a <i>book</i> or <i>video.</i></p>
                            <p>Books and videos can have one or more authors.</p>
                        </div>
                        <div className='callout show-for-xlarge'>
                            <HomeSearch />
                        </div>
                        <div className='callout show-for-xlarge'>
                            {this.props.loggedin ? <a onClick={Mentions.logout}>Log Out</a> : <span><LoginModal/>{' / '}<SignupModal/></span>}
                        </div>
                        <div className='callout show-for-xlarge'>
                            <ul className="menu vertical">
                                <li><a href='/blog'>Blog</a></li>
                                <li><a href='/contribute'>Contribute</a></li>
                                <li><a href='/recent-changes'>Recent Changes</a></li>
                                <li><a href='/recent-discussions'>Recent Discussions</a></li>
                            </ul>
                        </div>
                        <div className='callout show-for-xlarge'>
                            <h2>Did you know?</h2>
                            <a>James Watson</a> and <a>Francis Crick</a> had read <a>Erwin Schrodinger's</a> book <a>What is Life?</a> which inspired
                            them to work on discovering the structure of DNA.
                        </div>
                        <div className='callout show-for-xlarge'>
                            <Feedback />
                        </div>
                    </div>
                    <div className='small-12 xlarge-8 columns'>
                        <div className='small-12 columns'>
                            <div className='card-container'>
                                {this.props.data.home.map((x) => {
                                    return <HomeItem
                                        key={x.id}
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
