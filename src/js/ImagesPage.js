var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var _ = require('underscore');
var PreviousNext = require('./PreviousNext');
var HistoryItem = require('./HistoryItem');
var PageBar = require('./PageBar');
var config = require('./config');

var ImagesPage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render () {
        return (
            <span>
                <Helmet
                    title={'Images - '}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url}
                    ]}
                    />
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <h1 className='page-title'>{'Images - '}</h1>
                        <div className='small-12 columns'>
                            <div className="card-container">
                                <div className='card'>
                                    <div className='small-12 columns'>
                                        <a href='/api/v1/images/0df7afd14e77575c1d16da40a1cfc0fa-450-450.jpg' target='_blank'>0df7afd14e77575c1d16da40a1cfc0fa-450-450.jpg</a> added on 14th June 2016 by maxweldsouza
                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='small-12 columns'>
                                        <a href='/api/v1/images/0df7afd14e77575c1d16da40a1cfc0fa-450-450.jpg' target='_blank'>0df7afd14e77575c1d16da40a1cfc0fa-450-450.jpg</a> added on 14th June 2016 by maxweldsouza
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

module.exports = ImagesPage;
