var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var _ = require('underscore');
var config = require('./config');
var Select = require('./Select');
var SubmitButton = require('./SubmitButton');

var QuotesPage = React.createClass({
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
            submitting: false
        };
    },
    render () {
        var quotes = [{
            text: 'You can\'t blame gravity for falling in love.'
        },
        {
            text: 'Look deep into nature, and then you will understand everything better.'
        },
        {
            text: 'Insanity: doing the same thing over and over again and expecting different results.'
        }];
        return (
            <span>
                <Helmet
                    title={'Quotes'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'robots', 'content': 'index'}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url + this.props.path}
                    ]}
                    />
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}/>
                <div className='row page-body white'>
                    <div className='small-12 large-8 columns'>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <h1>Albert Einstein - Quotes</h1>
                                <hr />
                                <div className='row'>
                                    {quotes.map((x) => {
                                        return <div className='small-12 columns'>
                                            <blockquote className='quote'>
                                            {x.text}
                                            </blockquote>
                                            <div className='text-right'>
                                                <button className='button bare large'><span className='ion-share'/></button>
                                                <button className='button bare large'><span className='ion-code'/></button>
                                            </div>
                                        <hr />
                                        </div>;
                                    })}
                                </div>
                                Add Quote
                                <textarea rows={3}>
                                </textarea>
                                <SubmitButton title='Add' className='button primary float-right' submitting={this.state.submitting}/>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = QuotesPage;
