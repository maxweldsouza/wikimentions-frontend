var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var DATA = require('./dummy');
var _ = require('underscore');

var ThingPage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var entry = _.find(DATA.things, function (x) {
            return x.id === id;
        });
        var books = _.filter(DATA.things,function (x) {
            return entry.books.indexOf(x.id) > 0;
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
                        <div className='row'>
                            <div className='small-12 medium-4 columns'>
                                <img className="thumbnail" src="/assets/placeholder.png" alt="Photo of Pluto."/>
                            </div>
                            <div className='small-12 medium-8 columns'>
                                <h1>{entry.name}</h1>
                                <a href={'/pages/edit/'}>Edit Page</a>
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <h2>Mentioned by</h2>
                                    </div>
                                    <div className='small-12 columns'>
                                        <a href='/mentions/1' className='button'>Add</a>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <h2>Mentions</h2>
                                    </div>
                                    <div className='small-12 columns'>
                                        <button type='button' className='button'>Add</button>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <h2>Discuss</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="small-6 columns">maxweldsouza</div>
                                    <div className="small-6 columns text-right">1 hour ago</div>
                                </div>
                                <div className="row">
                                    <div className="small-12 columns">We should add some more books of this author !</div>
                                </div>
                                <div className="row">
                                    <div className="small-6 columns">someuser</div>
                                    <div className="small-6 columns text-right">2 hours ago</div>
                                </div>
                                <div className="row">
                                    <div className="small-12 columns">Sure !</div>
                                </div>
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
                </div>
            </span>
        );
    }
});

module.exports = ThingPage;
