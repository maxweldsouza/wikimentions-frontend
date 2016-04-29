var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var _ = require('underscore');
var moment = require('moment');

var ContributePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: [
                ]
            };
        }
    },
    getInitialState () {
        return {
            tab: 'edits'
        };
    },
    changeTab (tab) {
        this.setState({
            tab: tab
        });
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
                                <h1 className='page-title'>Contribute</h1>
                                <div>
                                    <a href='/recent-changes'>Recent Changes</a>
                                </div>
                                <div>
                                    <a href='/recent-discussions'>Recent Discussions</a>
                                </div>
                                <div>
                                    <a href='/site-stats'>Site Statistics</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = ContributePage;
