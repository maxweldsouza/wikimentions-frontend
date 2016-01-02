var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');

var PeoplePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: [],
                data: {
                    name: 'V.S. Ramachandran',
                    description: 'Phantoms in the brain is a collection of the main work of neuroscientist V.S. Ramachandran. He describes his work on the mirror box and intriguing neurological disorders that reveal the secrets of how the human brain works.',
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
                }
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
                                {this.props.data.description}
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

module.exports = PeoplePage;
