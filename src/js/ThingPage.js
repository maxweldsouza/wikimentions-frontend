var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var DATA = require('./dummy');
var _ = require('underscore');

var Book = require('./Book');

var ThingPage = React.createClass({
    statics: {
        resources (appstate) {
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'thing',
                        path: '/api/v1/thingpage/' + id
                    }
                ]
            };
        }
    },
    getInitialState () {
        return {
            tab: 'mentioned'
        };
    },
    changeTab (x) {
        this.setState({
            tab: x
        });
    },
    render () {
        var thing = this.props.data.thing;
        var id = Number(thing.id);
        var entry = _.find(DATA.things, function (x) {
            return x.id === id;
        });
        var authors = [];
        if (thing.authors) {
            authors = thing.authors;
        }
        if (authors.length > 0) {
            authors = <span>
                {'by '}
                {authors.map(function (x) {
                    var path = '/pages/' + x.id + '/' + x.slug;
                    return <a href={path} key={x.name}>
                        {x.name}
                    </a>;
                })}
            </span>;
        }
        var books = _.filter(DATA.things, function (x) {
            if (entry.books) {
                return entry.books.indexOf(x.id) >= 0;
            }
        });
        var mentions = thing.mentions;
        var mentionedby = _.filter(DATA.mentions, function (x) {
            return x.mentioned === id;
        });
        mentionedby = _.map(mentionedby, function (x) {
            var result = _.find(DATA.things, function (y) {
                return y.id === x.mentionedby;
            });
            result.quote = x.quote;
            return result;
        });
        var tabs = ['mentioned', 'mentionedby'];
        if ('books' in entry) {
            tabs.push('books');
        }
        var tabTitles = {
            'mentioned': 'Mentioned',
            'mentionedby': 'Mentioned By',
            'books': 'Books',
            'discuss': 'Discuss'
        };
        var tab = <ul className="tabs">
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
        var nodata = <div className="small-12 columns">
                <p>No mentions have been added yet. You can help us by adding some.</p>
            </div>;
        var emptybooks = <div className="small-12 columns">
                <p>No books have been added for this author. You can help us by adding some.</p>
            </div>;
        var tabContent;
        if (this.state.tab === 'mentioned') {
            tabContent = <div className='row'>
                <div className='small-12 columns'>
                    {mentions.map((x) => {
                        return <Mention
                            id={x.id}
                            slug={x.slug}
                            title={x.title}
                            description={x.description}
                            quote={x.quote}
                            type={x.type}
                            />;
                    })}
                </div>
                {mentions.length === 0 ? nodata : null}
                <div className='small-12 columns'>
                    <a href='/mentions/1' className='button'>Add</a>
                </div>
            </div>;
        } else if (this.state.tab === 'mentionedby') {
            tabContent = <div className='row'>
                <div className='small-12 columns'>
                    {mentionedby.map((x) => {
                        return <Mention
                            id={x.id}
                            slug={x.slug}
                            title={x.title}
                            description={x.description}
                            quote={x.quote}
                            type={x.type}
                            />;
                    })}
                </div>
                {mentionedby.length === 0 ? nodata : null}
                <div className='small-12 columns'>
                    <button type='button' className='button'>Add</button>
                </div>
            </div>;
        } else if (this.state.tab === 'books') {
            tabContent = <div className='row'>
                {books.map((x) => {
                    return <Book
                        id={x.id}
                        slug={x.slug}
                        name={x.name}
                        />;
                })}
                {books.length === 0 ? emptybooks : null}
                <div className='small-12 columns'>
                    <a href='/mentions/1' className='button'>Add</a>
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
                <div className='row page-body'>
                    <div className='small-12 columns'>
                        <div className='row'>
                            <div className='small-12 large-4 columns'>
                                <img className="" src="/assets/placeholder.png" alt="Photo of Pluto."/>
                            </div>
                            <div className='small-12 large-8 columns'>
                                <h1 className='page-title'>{thing.title}</h1>
                                <span className='thing-description'>
                                    {thing.description}
                                    {authors}
                                </span>
                                <div className='edit-links'>
                                    <a href={'/edit/' + id + '/' + thing.slug}>Edit</a>
                                    {' | '}
                                    <a href={'/history/' + id + '/' + thing.slug}>History</a>
                                    {' | '}
                                    <a href={'/discuss/' + id + '/' + thing.slug}>Discuss</a>
                                </div>
                                {tab}
                                <div className="tabs-content">
                                    <div className="tabs-panel is-active">
                                        {tabContent}
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
