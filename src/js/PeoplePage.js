var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');

var PeoplePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
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
                                <h1>Richard Dawkins</h1>
                                Description: Phantoms in the brain is a collection of the main work of neuroscientist V.S. Ramachandran. He describes his work on the mirror box and intriguing neurological disorders that reveal the secrets of how the human brain works.
                                <div className='row'>
                                        <div className='small-12 columns'>
                                            <h2>Mentioned by</h2>
                                        </div>
                                    <Mention mentioner={'Richard Dawkins'} mentioned={'V S Ramachandran'} text={'The marco polo of neuroscience'}/>
                                    <Mention mentioner={'Oliver Sacks'} mentioned={'V S Ramachandran'} text={'One of the most accessible neurological books of our generation.'}/>
                                    <Mention mentioner={'Richard Dawkins'} mentioned={'V S Ramachandran'} text={'The marco polo of neuroscience'}/>
                                    <Mention mentioner={'Oliver Sacks'} mentioned={'V S Ramachandran'} text={'The simplest introduction to neuroscience.'}/>
                                </div>
                                <div className='row'>
                                        <div className='small-12 columns'>
                                            <h2>Mentions</h2>
                                        </div>
                                    <Mention mentioner={'Richard Dawkins'} mentioned={'V S Ramachandran'} text={'The marco polo of neuroscience'}/>
                                    <Mention mentioner={'Oliver Sacks'} mentioned={'V S Ramachandran'} text={'The simplest introduction to neuroscience.'}/>
                                    <Mention mentioner={'Richard Dawkins'} mentioned={'V S Ramachandran'} text={'The marco polo of neuroscience'}/>
                                    <Mention mentioner={'Oliver Sacks'} mentioned={'V S Ramachandran'} text={'The simplest introduction to neuroscience.'}/>
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
