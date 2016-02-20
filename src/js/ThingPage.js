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
            return {
                api: []
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
        var id = Number(this.props.path.split('/')[1]);
        var entry = _.find(DATA.things, function (x) {
            return x.id === id;
        });
        var authors = _.filter(DATA.things, function (x) {
            if (entry.authors) {
                return entry.authors.indexOf(x.id) >= 0;
            }
        });
        authors = <span>
            {'by '}
            {authors.map(function (x) {
                var path = '/pages/' + x.id + '/' + x.slug;
                return <a href={path}>
                    {x.name}
                </a>;
            })}
        </span>;
        var books = _.filter(DATA.things, function (x) {
            if (entry.books) {
                return entry.books.indexOf(x.id) >= 0;
            }
        });
        var mentions = _.filter(DATA.mentions, function (x) {
            return x.mentionedby === id;
        });
        mentions = _.map(mentions, function (x) {
            var result = _.find(DATA.things, function (y) {
                return y.id === x.mentioned;
            });
            result.quote = x.quote;
            return result;
        });
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
        if (books.length > 0) {
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
        var tabContent;
        if (this.state.tab === 'mentioned') {
            tabContent = <div className='row'>
                <div className='small-12 columns'>
                    {mentions.map((x) => {
                        return <Mention
                            id={x.id}
                            slug={x.slug}
                            name={x.name}
                            description={x.description}
                            quote={x.quote}
                            type={x.type}
                            />;
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
                        return <Mention
                            id={x.id}
                            slug={x.slug}
                            name={x.name}
                            description={x.description}
                            quote={x.quote}
                            type={x.type}
                            />;
                    })}
                </div>
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
                                <h1 className='page-title'>{entry.name}</h1>
                                <span className='thing-description'>
                                    {entry.description}
                                    {authors}
                                </span>
                                <div>
                                    <a href={'/edit/1/richard-dawkins'}>Edit Page</a>
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
