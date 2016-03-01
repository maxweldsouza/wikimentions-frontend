var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var DATA = require('./dummy');
var _ = require('underscore');
var Pagination = require('./Pagination');

var HistoryPage = React.createClass({
    statics: {
        resources (appstate) {
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'history',
                        path: '/api/v1/thing/' + id
                    }
                ]
            };
        }
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var entry = this.props.data.history;
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
                    <div className='small-12 large-8 large-centered columns'>
                        <h1 className='page-title'>History</h1>
                        <span className='edit-links'>
                            <a href={'/edit/' + id + '/' + entry.slug}>Edit</a>
                            {' | '}
                            <a href={'/discuss/' + id + '/' + entry.slug}>Discuss</a>
                            {' | History'}
                        </span>
                        <div className='row'>
                            <div className='small-12 large-6 columns'>
                                <div className="row">
                                    <div className="small-12 columns">
                                        By
                                        <a href={'/users/1/maxweldsouza'}>maxweldsouza</a>
                                        4 days ago
                                    </div>
                                    <div className="small-12 columns">
                                        Title: V.S. Ramachandran
                                    </div>
                                    <div className="small-12 columns">
                                        Short Description: V.S. Ramachandran
                                    </div>
                                    <div className="small-12 columns">
                                        Type: Book
                                    </div>
                                    <div className="small-12 columns">
                                        Slug: v-s-ramachandran
                                    </div>
                                    <div className="small-12 columns">
                                        ISBN: 123456789
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="small-12 columns">

                                        <a href='#'>Restore</a>
                                        <a href='#'>Report abuse</a>
                                    </div>
                                </div>
                            </div>
                            <div className='small-12 large-6 columns'>
                                <div className="row">
                                    <div className="small-12 columns">
                                        By
                                        <a href={'/users/1/maxweldsouza'}>maxweldsouza</a>
                                        4 days ago
                                    </div>
                                    <div className="small-12 columns">
                                        Title: V.S. Ramachandran
                                    </div>
                                    <div className="small-12 columns">
                                        Short Description: V.S. Ramachandran
                                    </div>
                                    <div className="small-12 columns">
                                        Type: Book
                                    </div>
                                    <div className="small-12 columns">
                                        Slug: v-s-ramachandran
                                    </div>
                                    <div className="small-12 columns">
                                        ISBN: 123456789
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="small-12 columns">
                                        <a href='#'>Restore</a>
                                        <a href='#'>Report abuse</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='small-12 columns'>
                        <Pagination
                            pages={5}
                            current={1}
                            />
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HistoryPage;
