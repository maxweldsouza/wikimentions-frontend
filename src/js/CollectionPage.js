var React = require('react');

var Helmet = require('react-helmet');
var _ = require('underscore');

var config = require('./config');
var Navbar = require('./Navbar');
var cookies = require('browser-cookies');
var requests = require('superagent');
var Select = require('./Select');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');
var Video = require('./Video');
var Book = require('./Book');
var Person = require('./Person');

var CollectionPage = React.createClass({
    statics: {
        resources (routeObj) {
            var slug = routeObj.url.split('/')[1];
            return {
                api: []
            };
        }
    },
    getInitialState () {
        return {
            id: null,
            submitting: false,
            formMessage: '',
            valid: true,
            message: ''
        };
    },
    onSelect (x) {
        this.setState({
            id: x.id
        });
    },
    render () {
        var collection = [
            {
                    "book_count": 4,
                    "deleted": 0,
                    "id": 110,
                    "image": {
                        "added": "2016-08-02T23:38:01+05:30",
                        "description": "Siegel RM, Callaway EM: Francis Crick's Legacy for Neuroscience: Between the \u03b1 and the \u03a9. PLoS Biol 2/12/2004: e419. http://dx.doi.org/10.1371/journal.pbio.0020419 under Creative Commons Attribution (CC BY) license",
                        "height": 250,
                        "id": 1107,
                        "md5": "04ff8b57e11cfbb8a2d72f6b5bc0938a",
                        "thumb_height": 75,
                        "thumb_md5": "5d15ca89f2c1bae8ae87ed2266d5d74a",
                        "thumb_width": 75,
                        "width": 250
                    },
                    "mentioned_by_count": 7,
                    "mentioned_count": 11,
                    "props": {
                        "description": "Molecular Biologist",
                        "slug": "francis-crick",
                        "title": "Francis Crick",
                        "type": "person"
                    },
                    "tags": [
                        "Science"
                    ],
                    "video_count": 1
                },
    {
        "book_count": 0,
        "deleted": 0,
        "id": 102,
        "image": {
            "added": "2016-08-09T17:13:07+05:30",
            "description": "Source: [simonandschuster](http://www.simonandschuster.com/books/The-Double-Helix/James-D-Watson/9780743216302)  \r\nLicense: Non-free, fair use, cover art",
            "height": 200,
            "id": 1320,
            "md5": "7fa20c312735a4a2008df915de059a75",
            "thumb_height": 115,
            "thumb_md5": "6c890731ca57596a24b09af5806ac676",
            "thumb_width": 75,
            "width": 130
        },
        "mentioned_by_count": 0,
        "mentioned_count": 0,
        "props": {
            "description": "",
            "isbn": "074321630X",
            "isbn13": "978-0743216302",
            "slug": "the-double-helix",
            "title": "The Double Helix",
            "type": "book"
        },
        "video_count": 0
    },
    {
        "book_count": 0,
        "deleted": 0,
        "id": 538,
        "image": {
            "added": "2016-08-09T17:23:04+05:30",
            "description": "Source: [randomhouse](http://www.randomhouse.com.au/books/james-watson/dna-the-secret-of-life-9780099451846.aspx)  \r\nLicense: Non-free, fair use, cover art",
            "height": 200,
            "id": 1323,
            "md5": "0c0d5dc51ddaaade03280f8fae36f135",
            "thumb_height": 107,
            "thumb_md5": "6988a77ee91c6d6ff35ff04358d700f9",
            "thumb_width": 75,
            "width": 140
        },
        "mentioned_by_count": 0,
        "mentioned_count": 0,
        "props": {
            "description": "",
            "isbn": "0965739694",
            "isbn13": "978-0965739696",
            "slug": "dna-the-secret-of-life",
            "title": "DNA: The Secret of Life",
            "type": "book"
        },
        "video_count": 0
    },
    {
        "book_count": 0,
        "deleted": 0,
        "id": 3098,
        "image": {
            "added": "2016-08-09T16:54:41+05:30",
            "description": "Source: [simonandschuster](http://www.simonandschuster.com/books/The-Annotated-and-Illustrated-Double-Helix/James-D-Watson/9781476715490)  \r\nLicense: Non-free, fair use, cover art",
            "height": 200,
            "id": 1318,
            "md5": "b4c7bf3c444c575558ca1214a239f8f4",
            "thumb_height": 75,
            "thumb_md5": "227d1df8318bf573540738e516f163e5",
            "thumb_width": 75,
            "width": 198
        },
        "mentioned_by_count": 0,
        "mentioned_count": 0,
        "props": {
            "description": "",
            "isbn": "",
            "isbn13": "",
            "slug": "the-annotated-and-illustrated-double-helix",
            "title": "The Annotated and Illustrated Double Helix",
            "type": "book"
        },
        "video_count": 0
    },
    {
        "book_count": 0,
        "deleted": 0,
        "id": 3101,
        "image": {
            "added": "2016-08-09T17:18:08+05:30",
            "description": "Source: [pearson](https://www.pearsonhighered.com/product/Watson-Molecular-Biology-of-the-Gene-7th-Edition/9780321762436.html)  \r\nLicense: Non-free, fair use, cover art",
            "height": 200,
            "id": 1321,
            "md5": "20034a7c65321b9de4e57ba8c886b8e7",
            "thumb_height": 98,
            "thumb_md5": "1ec4fe1619db4592f402243d7bd08bc9",
            "thumb_width": 75,
            "width": 152
        },
        "mentioned_by_count": 0,
        "mentioned_count": 0,
        "props": {
            "description": "",
            "isbn": "",
            "isbn13": "",
            "slug": "molecular-biology-of-the-gene",
            "title": "Molecular Biology of the Gene",
            "type": "book"
        },
        "video_count": 0
    },
    {
        "book_count": 0,
        "deleted": 0,
        "id": 3102,
        "image": {
            "added": "2016-08-09T17:20:44+05:30",
            "description": "Source: [penguinrandomhouse](http://www.penguinrandomhouse.com/books/187338/genes-girls-and-gamow-by-james-d-watson/9780375727153/)  \r\nLicense: Non-free, fair use, cover art",
            "height": 200,
            "id": 1322,
            "md5": "ab0c51010c608d8ce45744a6c555bb09",
            "thumb_height": 117,
            "thumb_md5": "c6c9fb273e11048b7bd78ecd116d8ee0",
            "thumb_width": 75,
            "width": 128
        },
        "mentioned_by_count": 0,
        "mentioned_count": 0,
        "props": {
            "description": "",
            "isbn": "",
            "isbn13": "",
            "slug": "genes-girls-and-gamow-after-the-double-helix",
            "title": "Genes, Girls, and Gamow: After the Double Helix",
            "type": "book"
        },
        "video_count": 0
    },
    {
        "book_count": 0,
        "deleted": 0,
        "id": 3103,
        "image": {
            "added": "2016-08-09T17:26:24+05:30",
            "description": "Source: [penguinrandomhouse](http://www.penguinrandomhouse.com/books/187336/avoid-boring-people-by-james-d-watson/9780375727146/#)  \r\nLicense: Non-free, fair use, cover art",
            "height": 200,
            "id": 1324,
            "md5": "787576d22f31ec80a446b88da1edafc4",
            "thumb_height": 116,
            "thumb_md5": "b8c8bf892ec819df4ae086951ee9174a",
            "thumb_width": 75,
            "width": 129
        },
        "mentioned_by_count": 0,
        "mentioned_count": 0,
        "props": {
            "description": "",
            "isbn": "",
            "isbn13": "",
            "slug": "avoid-boring-people-and-other-lessons-from-a-life-in-science",
            "title": "Avoid Boring People and Other Lessons from a Life in Science",
            "type": "book"
        },
        "video_count": 0
    }
];
        var description = 'The best books that every programmer should read. These are not books about programming but related in some way.';
        return (
            <div className='flex-wrapper'>
                <Helmet
                    title={''}
                    titleTemplate={'%s - ' + config.name + ' - Blog'}
                    meta={[
                        {name: 'description', 'content': ''},
                        {name: 'twitter:card', content: 'summary'},
                        {name: 'twitter:site', content: config.twitter},
                        {name: 'twitter:title', content: ''},
                        {name: 'twitter:description', content: ''},
                        {property: 'og:title', content: ''},
                        {property: 'og:type', content: 'article'},
                        {property: 'og:url', content: config.url + this.props.path},
                        {property: 'og:description', content: ''},
                        {property: 'og:site_name', content: config.name}
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
                <div className='row page-body white'>
                    <div className='small-12 large-8 columns'>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <div className=''>
                                    <h1>Collections - Programming Books</h1>
                                    {description}
                                    <form onSubmit={this.onSubmit}>
                                        {this.state.formMessage ? <div className='callout alert'>
                                            {this.state.formMessage}
                                        </div> : null}
                                        {collection.map((x) => {
                                            if (x.props.type === 'video') {
                                                return <Video
                                                        key={x.id}
                                                        id={x.id}
                                                        type={x.props.type}
                                                        slug={x.props.slug}
                                                        title={x.props.title}
                                                        mentioned_count={x.mentioned_count}
                                                        mentioned_by_count={x.mentioned_by_count}
                                                        image={x.image}
                                                        url={x.props.url}/>;
                                            } else if (x.props.type === 'book') {
                                                return <Book
                                                    key={x.id}
                                                    id={x.id}
                                                    image={x.image}
                                                    type={x.props.type}
                                                    slug={x.props.slug}
                                                    title={x.props.title}
                                                    description={x.props.description}
                                                    mentioned_count={x.mentioned_count}
                                                    mentioned_by_count={x.mentioned_by_count}
                                                    isbn={x.isbn}
                                                    isbn13={x.isbn13}
                                                    />;
                                            }
                                            return <Person
                                                key={x.id}
                                                id={x.id}
                                                image={x.image}
                                                type={x.props.type}
                                                slug={x.props.slug}
                                                title={x.props.title}
                                                description={x.props.description}
                                                mentioned_count={x.mentioned_count}
                                                mentioned_by_count={x.mentioned_by_count}
                                                isbn={x.isbn}
                                                isbn13={x.isbn13}/>;
                                        })}
                                        <h2>Add to Collection</h2>
                                        <Select
                                            name='id'
                                            onSelectValue={this.onSelect}
                                            valid={this.state.valid}
                                            message={this.state.message} />
                                        <SubmitButton title='Add' className='button primary float-right' submitting={this.state.submitting}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CollectionPage;
