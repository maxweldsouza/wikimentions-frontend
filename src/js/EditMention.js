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
                <div className='row page-body'>
                    <div className='small-12 large-6 large-centered columns'>
                        <form action='/api/v1/register' method='post'>
                            <h1 className='page-title'>Edit Mention</h1>
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
                        </form>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = EditMention;
