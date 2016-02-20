var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var moment = require('moment');
var DATA = require('./dummy');
var Comment = require('./Comment');
var _ = require('underscore');

var DiscussPage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var discussions = _.filter(DATA.discussions, function (x) {
            return x.page_id === id;
        });
        discussions = _.map(discussions, function (x) {
            var user = _.find(DATA.users, function (y) {
                return y.id === x.user;
            });
            x.name = user.name;
            return x;
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
                    <div className='small-12 large-8 large-centered columns'>
                        <h1 className='page-title'>Page Discussion</h1>
                        <a href={'/edit/18/richard-dawkins'}>Edit</a>
                        {' | '}
                        <a href={'/history/18/richard-dawkins'}>History</a>
                        {discussions.map((x) => {
                            return <Comment
                                id={x.id}
                                name={x.name}
                                text={x.text}
                                posted={x.posted}
                                />;
                        })}
                        <div className='small-12 columns'>
                            <form action='' method='post'>
                                <div className="row">
                                    <div className="small-12 columns">
                                        <label>Reply
                                            <input type="text"></input>
                                        </label>
                                    </div>
                                    <div className="small-12 columns">
                                        <button type='button' className='button'>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = DiscussPage;
