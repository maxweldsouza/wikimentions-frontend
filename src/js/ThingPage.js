var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var requests = require('superagent');
var _ = require('underscore');
var Select = require('./Select');
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
            tab: 'mentioned',
            books: [],
            searchText: '',
            isLoadingExternally: true
        };
    },
    changeTab (x) {
        this.setState({
            tab: x
        });
    },
    onSearchTextChanged (x) {
        console.log(x);
        this.setState({
            searchText: x
        });
        requests.get('/api/v1/search/' + x).end((err, res) => {
            this.setState({
                books: res.body,
                isLoadingExternally: false
            });
        });
    },
    render () {
        var thing = this.props.data.thing;
        var id = Number(thing.id);
        var authors = [];
        if (thing.authors) {
            authors = thing.authors;
        }
        if (authors.length > 0) {
            authors = <span>
                {'by '}
                {authors.map(function (x) {
                    var path = '/pages/' + x.id + '/' + x.slug;
                    return <a href={path} key={x.title}>
                        {x.title}
                    </a>;
                })}
            </span>;
        }
        var mentions = thing.mentions;
        var mentionedby = thing.mentioned_by;
        var tabs = ['mentioned', 'mentionedby'];
        var books;
        if (thing.type === 'person') {
            tabs.push('books');
            books = thing.books;
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
        var options;
        options = _.map(this.state.books, function (x) {
            return {
                    value: x.id,
                    label: x.title
                }
            });
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
                    <a href={'/mentions/' + id} className='button'>Add</a>
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
            </div>;
        } else if (this.state.tab === 'books' && thing.type === 'person') {
            tabContent = <div className='row'>
                {books.map((x) => {
                    return <Book
                        id={x.id}
                        slug={x.slug}
                        title={x.title}
                        />;
                })}
                {books.length === 0 ? emptybooks : null}
                <div className='small-12 columns'>
                    <form method='post' action={'/api/v1/book/' + id}>
                    Search for the title of a book to add
                    <Select
                    name='book_id'
                    />
                    <button type='submit' className='button'>Add Existing</button>
                    <button className='button'>Add New</button>
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
