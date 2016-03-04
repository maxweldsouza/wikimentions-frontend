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
                api: [
                    {
                        name: 'new',
                        path: '/api/v1/new/10/0'
                    }
                ]
            };
        }
    },
    render () {
        var mentions = this.props.data.new;
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
                        <h2>Top Mentions</h2>
                        <div className='row'>
                            <div className='small-12 columns'>
                                {mentions.map((x) => {
                                    return <Mention
                                        id={x.id}
                                        slug={x.slug}
                                        title={x.title}
                                        description={x.description}
                                        quote={x.quote}
                                        type={x.type}
                                        books={x.books}
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
