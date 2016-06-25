var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Comment = require('./Comment');
var _ = require('underscore');
var DiscussReply = require('./DiscussReply');
var PageBar = require('./PageBar');
var config = require('./config');
var Footer = require('./Footer');

var SiteStatsPage = React.createClass({
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
                    title={'Site Stats'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url + this.props.path}
                    ]}
                    />
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <h1 className='page-title'>Site Statistics</h1>
                        <div className='small-12 columns'>
                            <div className='card-container'>
                                <div className='card'>
                                    <div className='small-12 columns'>
                                        Videos vs time
                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='small-12 columns'>
                                        People vs time
                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='small-12 columns'>
                                        Books vs time
                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='small-12 columns'>
                                        Users vs time
                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='small-12 columns'>
                                        Mentions vs time
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = SiteStatsPage;
