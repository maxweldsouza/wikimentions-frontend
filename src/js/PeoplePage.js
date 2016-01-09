var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');

var PeoplePage = React.createClass({
    statics: {
        resources (appstate) {
            var vsrama = {
                name: 'V.S. Ramachandran',
                description: 'Phantoms in the brain is a collection of the main work of neuroscientist V.S. Ramachandran. He describes his work on the mirror box and intriguing neurological disorders that reveal the secrets of how the human brain works.',
                mentionedby: [
                    {
                        name: 'Richard Dawkins',
                        text: 'The marco polo of neuroscience',
                        url: '/people/richard-dawkins'
                    }
                ],
                mentions: [
                    {
                        name: 'Richard Dawkins',
                        text: 'As the social critic Richard Dawkins have said there is little difference in saying that the sun goes around the earth.',
                        url: '/people/richard-dawkins'
                    }
                ],
                books: [
                    {
                        name: 'Phantoms in the Brain',
                        url: '/books/phantoms-in-the-brain'
                    },
                    {
                        name: 'The Tell Tale Brain',
                        url: '/books/the-tell-tale-brain'
                    },
                    {
                        name: 'A Brief tour of Human Consciousness',
                        url: '/books/a-brief-tour-of-human-consciousness'
                    }
                ]
            }
            var dawkins = {
                name: 'Richard Dawkins',
                description: 'Author of The Selfish Gene',
                books: ['The God Delusion', 'The Selfish Gene', 'The Extended Phenotype'],
                mentionedby: [
                    {
                        name: 'V.S. Ramachandran',
                        text: 'As the social critic Richard Dawkins have said there is little difference in saying that the sun goes around the earth.',
                        url: '/people/vs-ramachandran'
                    }
                ],
                mentions: [
                    {
                        name: 'VS Ramachandran',
                        text: 'The marco polo of neuroscience',
                        url: '/people/vs-ramachandran'
                    }
                ],
                books: [
                    {
                        name: 'The Selfish Gene',
                        url: '/books/the-selfish-gene'
                    },
                    {
                        name: 'The God Delusion',
                        url: '/books/the-god-delusion'
                    },
                    {
                        name: 'The Magic of Reality',
                        url: '/books/the-magic-of-reality'
                    }
                ]
            }
            var data;
            if (appstate.url === 'people/richard-dawkins') {
                data = dawkins;
            } else if (appstate.url === 'people/vs-ramachandran') {
                data = vsrama;
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
                                {this.props.data.description}
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <h2>Mentioned by</h2>
                                    </div>
                                    {this.props.data.mentionedby.map((x) => {
                                        return <Mention url={x.url} mentioner={x.name} text={x.text}/>;
                                    })}
                                </div>
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <h2>Mentions</h2>
                                    </div>
                                    {this.props.data.mentions.map((x) => {
                                        return <Mention url={x.url} mentioner={x.name} text={x.text}/>;
                                    })}
                                </div>
                                <div className='row'>
                                    <div className='small-12 columns'>
                                        <h2>Books</h2>
                                    </div>
                                    {this.props.data.books.map((x) => {
                                        return <div className='small-12 columns'>
                                            <a href={x.url}>{x.name}</a>
                                        </div>;
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
