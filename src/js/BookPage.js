var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');

var BookPage = React.createClass({
    statics: {
        resources (appstate) {
            var phantoms = {
                name: 'Phantoms in the Brain',
                author: 'V.S. Ramachandran',
                mentionedby: [
                    {
                        name: 'Richard Dawkins',
                        text: 'The marco polo of neuroscience'
                    }
                ],
                mentions: [
                    {
                        name: 'Richard Dawkins',
                        text: 'As the social critic Richard Dawkins have said there is little difference in saying that the sun goes around the earth.'
                    }
                ]
            };
            var goddelusion = {
                name: 'The God Delusion',
                author: 'Richad Dawkins',
                mentionedby: [
                    {
                        name: 'Richard Dawkins',
                        text: 'As the social critic Richard Dawkins have said there is little difference in saying that the sun goes around the earth.'
                    }
                ],
                mentions: [
                    {
                        name: 'Richard Dawkins',
                        text: 'The marco polo of neuroscience'
                    }
                ]
            };

            var data;
            if (appstate.url === 'books/the-god-delusion') {
                data = goddelusion;
            } else if (appstate.url === 'books/phantoms-in-the-brain') {
                data = phantoms;
            }
            return {
                api: [],
                data: data
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
                            <div className='row'>
                                <div className='small-12 medium-4 columns'>
                                    <img className="thumbnail" src="/assets/pluto.jpg" alt="Photo of Pluto."/>
                                </div>
                                <div className='small-12 medium-8 columns'>
                                    <h1>{this.props.data.name}</h1>
                                    {this.props.data.author}
                                    <div className='row'>
                                        <div className='small-12 columns'>
                                            <h2>Mentioned by</h2>
                                        </div>
                                        {this.props.data.mentionedby.map((x) => {
                                            return <Mention mentioner={x.name} text={x.text}/>;
                                        })}
                                    </div>
                                    <div className='row'>
                                        <div className='small-12 columns'>
                                            <h2>Mentions</h2>
                                        </div>
                                        {this.props.data.mentions.map((x) => {
                                            return <Mention mentioner={x.name} text={x.text}/>;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </span>
        );
    }
});

module.exports = BookPage;
