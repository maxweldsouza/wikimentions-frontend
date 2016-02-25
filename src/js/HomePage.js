var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var Signup = require('./Signup');
var _ = require('underscore');
var DATA = require('./dummy');
var Mention = require('./Mention');

var HomePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render () {
        var mentions = _.filter(DATA.mentions, function (x) {
            return x.mentionedby === 1;
        });
        mentions = _.map(mentions, function (x) {
            var result = _.find(DATA.things, function (y) {
                return y.id === x.mentioned;
            });
            result.quote = x.quote;
            return result;
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
                <div className='row page-body'>
                    <div className='small-12 columns'>
                        <h2>Top Mentions</h2>
                        <div className='row'>
                            <div className='small-12 medium-6 columns'>
                                {mentions.map((x) => {
                                    return <Mention
                                        id={x.id}
                                        slug={x.slug}
                                        name={x.name}
                                        description={x.description}
                                        quote={x.quote}
                                        type={x.type}
                                        />;
                                })}
                            </div>
                            <div className='small-12 medium-6 columns'>
                                {mentions.map((x) => {
                                    return <Mention
                                        id={x.id}
                                        slug={x.slug}
                                        name={x.name}
                                        description={x.description}
                                        quote={x.quote}
                                        type={x.type}
                                        />;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
