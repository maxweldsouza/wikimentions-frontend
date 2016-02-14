var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var DATA = require('./dummy');
var _ = require('underscore');
var moment = require('moment');

var ThingPage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    getInitialState () {
        return {
            tab: 'mentionedby'
        };
    },
    changeTab (x) {
        this.setState({
            tab: x
        });
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var entry = _.find(DATA.things, function (x) {
            return x.id === id;
        });
        var books = _.filter(DATA.things, function (x) {
            return entry.books.indexOf(x.id) > 0;
        });
        var mentions = _.filter(DATA.mentions, function (x) {
            return x.mentioned === id;
        });
        mentions = _.map(mentions, function (x) {
            var result = _.find(DATA.things, function (y) {
                return y.id === x.mentionedby;
            });
            result.quote = x.quote;
            return result;
        });
        var mentionedby = _.filter(DATA.mentions, function (x) {
            return x.mentionedby === id;
        });
        mentionedby = _.map(mentionedby, function (x) {
            var result = _.find(DATA.things, function (y) {
                return y.id === x.mentioned;
            });
            result.quote = x.quote;
            return result;
        });
        var discussions = _.filter(DATA.discussions, function (x) {
            return x.page_id === id;
        });
        discussions = _.map(discussions, function (x) {
            var user = _.find(DATA.users, function (y) {
                return y.id === x.user;
            });
            x.name = user.name;
            return x;
        });
        var tabs = ['mentioned', 'mentionedby', 'books', 'discuss'];
        var tabTitles = {
            'mentioned': 'Mentioned',
            'mentionedby': 'Mentioned By',
            'books': 'Books',
            'discuss': 'Discuss'
        };
        var tab = <ul className="tabs" data-tabs id="example-tabs">
            {tabs.map((x) => {
                var cls, aria;
                if (x === this.state.tab) {
                    return <li className='tabs-title is-active' key={x}>
                        <a aria-selected="true" onClick={this.changeTab.bind(null, x)}>{tabTitles[x]}</a>
                    </li>;
                }
                return <li className='tabs-title' key={x}>
                    <a onClick={this.changeTab.bind(null, x)}>{tabTitles[x]}</a>
                </li>;
            })}
        </ul>;
        var tabContent;
        if (this.state.tab === 'mentioned') {
            tabContent = <div className='row'>
                <div className='small-12 columns'>
                    {mentions.map((x) => {
                        var path;
                        if (x.type === 'book') {
                            path = '/books/' + x.id + '/' + x.slug;
                        } else if (x.type === 'person') {
                            path = '/pages/' + x.id + '/' + x.slug;
                        }
                        return <div className='row mention-block'>
                            <div className='small-6 columns'>
                                <a href={path}>{x.name}</a>
                            </div>
                            <div className="small-6 columns text-right mention-edit">
                                <a href={'/mentions/' + x.id + '/edit'}>Edit</a>
                            </div>
                            <div className='small-12 columns mention-short-description'>
                                {x.description}
                            </div>
                            <div className='small-12 columns mention-quote'>
                                {x.quote}
                            </div>
                        </div>;
                    })}
                </div>
                <div className='small-12 columns'>
                    <a href='/mentions/1' className='button'>Add</a>
                </div>
            </div>;
        } else if (this.state.tab === 'mentionedby') {
            tabContent = <div className='row'>
                <div className='small-12 columns'>
                    {mentionedby.map((x) => {
                        var path;
                        if (x.type === 'book') {
                            path = '/books/' + x.id + '/' + x.slug;
                        } else if (x.type === 'person') {
                            path = '/pages/' + x.id + '/' + x.slug;
                        }
                        return <div className='row mention-block'>
                            <div className='small-6 columns'>
                                <a href={path}>{x.name}</a>
                            </div>
                            <div className="small-6 columns text-right mention-edit">
                                <a href={'/mentions/' + x.id + '/edit'}>Edit</a>
                            </div>
                            <div className='small-12 columns mention-description'>
                                {x.description}
                            </div>
                            <div className='small-12 columns mention-quote'>
                                {x.quote}
                            </div>
                        </div>;
                    })}
                </div>
                <div className='small-12 columns'>
                    <button type='button' className='button'>Add</button>
                </div>
            </div>;
        } else if (this.state.tab === 'books') {
            tabContent = <div className='row'>
                <div className='small-12 columns'>
                    {books.map((x) => {
                        return <div>
                            <a href={'/books/' + x.id + '/' + x.slug}>{x.name}</a>
                        </div>;
                    })}
                </div>
                <div className='small-12 columns'>
                    <a href='/mentions/1' className='button'>Add</a>
                </div>
            </div>;
        } else if (this.state.tab === 'discuss') {
            tabContent = <div className='row'>
                {discussions.map((x) => {
                    var updated = x.posted;
                    updated = moment(updated).fromNow();
                    return <div className='small-12 columns discuss-comment'>
                        <div className="row">
                            <div className="small-6 columns discuss-username">
                                <a href={'/users/' + x.id + '/' + x.name}>{x.name}</a>
                            </div>
                            <div className="small-6 columns text-right discuss-updated">{updated}</div>
                        </div>
                        <div className="row discuss-text">
                            <div className="small-12 columns">{x.text}</div>
                        </div>
                    </div>;
                })}
                <div className='small-12 columns'>
                    <form action='' method='post'>
                        <div className="row">
                            <div className="small-12 columns">
                                <label>Reply
                                    <input type="text"></input>
                                </label>
                            </div>
                            <div className="small-12 columns">
                                <button type='button' className='button'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>;
        }
        return (
            <span>
                <Helmet
                    title={'Mentions'}
                    titleTemplate='%s - Mentions'
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': ''}
                    ]}
                    />
                <Navbar/>
                <div className='row'>
                    <div className='small-12 columns'>
                        <div className='row'>
                            <div className='small-12 medium-4 columns'>
                                <img className="thumbnail" src="/assets/placeholder.png" alt="Photo of Pluto."/>
                            </div>
                            <div className='small-12 medium-8 columns'>
                                <h1>{entry.name}</h1>
                                {entry.description}
                                <div><a href={'/pages/edit/'}>Edit Page</a> | <a href={'/pages/' + entry.id + '/' + entry.slug + '/history'}>History</a> | <a href={'/pages/edit/'}>Discuss</a></div>
                                <div>
                                    {tab}
                                    <div className="tabs-content" data-tabs-content="example-tabs">
                                        <div className="tabs-panel is-active" id="panel1">
                                            {tabContent}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = ThingPage;
