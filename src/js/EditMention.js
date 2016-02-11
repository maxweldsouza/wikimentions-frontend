var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');

var EditMention = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
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
                <form action='/api/v1/register' method='post'>
                    <div className='row'>
                        <div className='small-12 medium-6 columns'>
                            <h2>Edit Mention</h2>
                            Mention: Richard Dawkins
                            <label>Mentioned by
                                <input type='text' name='mentionedby' placeholder='' required />
                            </label>
                            <label>Description
                                <input type='text' name='password' placeholder='' required/>
                            </label>
                            <label>References
                                <input type='text' placeholder='' required/>
                            </label>
                            <button type='submit' className='success button'>Save</button>
                        </div>
                    </div>
                </form>
            </span>
        );
    }
});

module.exports = EditMention;
