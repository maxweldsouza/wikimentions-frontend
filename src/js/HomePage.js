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
var SubmitButton = require('./SubmitButton');
var HomeSearch = require('./HomeSearch');

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
                    <div className='small-12 large-4 columns'>
                        <div className='callout warning'>
                            <h2>WikiMentions</h2>
                            Discover people and their work based on their mentions.
                        </div>
                        <div className='callout'>
                            <HomeSearch />
                        </div>
                        <div className='callout'>
                            <h2>Login</h2>
                            <input type='text' name='username' placeholder='Username' onChange={this.onChangeText}/>
                            <input type='password' name='password' placeholder='Password' onChange={this.onChangeText}/>
                            <SubmitButton
                                title='Login'
                                submitting={this.state.submitting}
                                className='expanded button'
                                onSubmit={this.login}/>
                        </div>
                        <div className='callout'>
                            <ul className="menu vertical">
                                <li><a href="#">Create</a></li>
                                <li><a href="#">Contribute</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>

                    </div>
                    <div className='small-12 large-8 columns'>
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
                        <hr/>
                    </div>
                    <div className='small-12 large-6 columns'>
                        <ul className="menu">
                            <li><a href="#">Create</a></li>
                            <li><a href="#">Contribute</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className='small-12 large-6 columns'>
                        <ul className="menu align-right">
                            <li><a href="#">One</a></li>
                            <li><a href="#">Two</a></li>
                            <li><a href="#">Three</a></li>
                            <li><a href="#">Four</a></li>
                        </ul>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
