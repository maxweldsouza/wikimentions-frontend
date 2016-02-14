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
                        <div className='row'>
                            <div className='small-12 medium-8 columns'>
                                <h1>{entry.name}</h1>
                                <h2>History</h2>
                                <form action='' method='post'>
                                    <div className="row">
                                        <fieldset className="small-2 columns">
                                            <input type="radio" name="" defaultValue="" required /><label htmlFor=""></label>
                                            <input type="radio" name="" defaultValue=""/><label htmlFor=""></label>
                                        </fieldset>
                                        <div className="small-3 columns">
                                            maxweldsouza
                                        </div>
                                        <div className="small-7 columns">
                                            13th January 2015
                                        </div>
                                        <div className="small-12 columns">
                                            <button type='button' className='button'>Diff</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HistoryPage;
