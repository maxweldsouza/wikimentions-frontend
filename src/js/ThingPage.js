var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');

var ThingPage = React.createClass({
    statics: {
        resources (appstate) {
            var data;
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'thing',
                        path: '/api/v1/thing/' + id
                    },
                    {
                        name: 'mentions',
                        path: '/api/v1/mentions/' + id
                    },
                    {
                        name: 'mentionedby',
                        path: '/api/v1/mentioned/' + id
                    }
                ]
            };
        }
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
                <div className='row'>
                    <div className='small-12 columns'>
                        <div className='row'>
                            <div className='small-12 medium-4 columns'>
                                <img className="thumbnail" src="/assets/placeholder.png" alt="Photo of Pluto."/>
                            </div>
                            <div className='small-12 medium-8 columns'>
                                <h1>{this.props.data.thing.thing_title}</h1>
                                <a href={'/pages/edit/' + this.props.data.thing.thing_id + '/' + this.props.data.thing.thing_name}>Edit Page</a>
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <h2>Mentioned by</h2>
                                    </div>
                                    {this.props.data.mentionedby.map((x) => {
                                        return <Mention url={'/pages/' + x.mentioner_id + '/' + x.thing_name} mentioner={x.thing_title} text={x.mention_description}/>;
                                    })}
                                    <div className='small-12 columns'>
                                        <a href='/mentions/1' className='button'>Add</a>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <h2>Mentions</h2>
                                    </div>
                                    {this.props.data.mentions.map((x) => {
                                        return <Mention url={'/pages/' + x.mentioned_id + '/' + x.thing_name} mentioner={x.thing_title} text={x.mention_description}/>;
                                    })}
                                    <div className='small-12 columns'>
                                        <button type='button' className='button'>Add</button>
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

module.exports = ThingPage;
