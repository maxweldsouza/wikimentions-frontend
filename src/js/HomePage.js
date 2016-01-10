var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var Signup = require('./Signup');

var HomePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render: function () {
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
                        <h2>Top Mentions</h2>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <a href='/pages/1/richard-dawkins'>Richard Dawkins</a> mentioned <a href='/books/phantoms-in-the-brain'>Phantoms in the brain</a>
                            </div>
                            <div className='small-12 columns'>
                                "The marco polo of neuroscience"
                            </div>
                        </div>
                    </div>
                    <div className='small-12 columns'>
                        <div className='row'>
                            <div className='small-12 columns'>
                                1200 mentions, 1300 mentioned, 3000 books
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
