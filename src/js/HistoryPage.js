var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var DATA = require('./dummy');
var _ = require('underscore');

var HistoryPage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var entry = _.find(DATA.things, function (x) {
            return x.id === id;
        });
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
                        <h1>History</h1>
                        <div className='row'>
                            <div className='small-6 columns'>
                                <div className="row">
                                    <div className="small-12 columns">
                                        Edited by
                                        <a href='#'>maxweldsouza</a>
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
                            <div className='small-6 columns'>
                                <div className="row">
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
                                        4 days ago
                                        <a href='#'>Restore</a>
                                        <a href='#'>Report abuse</a>
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

module.exports = HistoryPage;
