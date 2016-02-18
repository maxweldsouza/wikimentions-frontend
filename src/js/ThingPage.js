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
        var tabs = ['mentioned', 'mentionedby', 'books'];
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
                        return <Mention
                            id={x.id}
                            slug={x.slug}
                            name={x.name}
                            description={x.description}
                            quote={x.quote}
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
                <div className='row'>
                    <div className='small-12 columns'>
                        <div className='row'>
                            <div className='small-12 medium-4 columns'>
                                <img className="thumbnail" src="/assets/placeholder.png" alt="Photo of Pluto."/>
                            </div>
                            <div className='small-12 medium-8 columns'>
                                <h1>{entry.name}</h1>
                                {entry.description}
                                <div>
                                    <a href={'/edit/1/richard-dawkins'}>Edit Page</a>
                                </div>
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
            </span>
        );
    }
});

module.exports = ThingPage;
