var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var _ = require('underscore');
var moment = require('moment');

var RecentChangesPage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: [
                ]
            };
        }
    },
    render () {
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
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <h1 className='page-title'>Recent Changes</h1>
                                <div className='history-card'>
                                    <div className="history-item small-12-columns">
                                        <div className="row">
                                            <span className="small-8 columns"><a className="history-user" href="/users/2/maxweldsouza">maxweldsouza</a></span><span className="history-timestamp small-4 columns text-right">21 hours ago</span>
                                            <span className="small-12 columns">
                                                <span className="history-added"><span className="ion-plus-circled" /></span>
                                                    <span>
                                                        <a href="/pages/530/christopher-hitchens">Christopher Hitchens</a> mentioned <a href="/pages/108/richard-dawkins">Richard Dawkins</a> in <a href="/videos/531/hitchens-talks-at-google">Hitchens | Talks at Google</a>
                                                    </span>
                                                </span>
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

    module.exports = RecentChangesPage;