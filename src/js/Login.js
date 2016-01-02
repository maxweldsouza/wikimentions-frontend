var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');

var Login = React.createClass({
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
                <form>
                    <div className="row">
                        <div className="small-12 medium-6 columns">
                            <h2>Login</h2>
                            <label>E-mail
                                <input type="text" placeholder="" />
                            </label>
                            <label>Password
                                <input type="text" placeholder="" />
                            </label>
                            <button type="button" className="success button">Save</button>
                        </div>
                    </div>
                </form>
            </span>

        );
    }
});

module.exports = Login;
