var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var Signup = require('./Signup');
var _ = require('underscore');
var DATA = require('./dummy');

var HomePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render () {
        var result = _.filter(DATA.things, function (x) {
            return x.id === 18 && x.type === 'book';
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
                        <pre><code>
                            {JSON.stringify(result, null, 2)}
                        </code></pre>
                        <h2>Top Mentions</h2>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <a href='/pages/18/richard-dawkins'>Richard Dawkins</a> mentioned <a href='/books/phantoms-in-the-brain'>Phantoms in the brain</a>
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
