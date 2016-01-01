var React = require('react');

var Signup = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render () {
        return (
            <form>
                <div className="row">
                    <div className="small-12 medium-6 columns">
                        <h2>Sign Up</h2>
                        <label>E-mail
                            <input type="text" placeholder="" />
                        </label>
                        <label>Password
                            <input type="text" placeholder="" />
                        </label>
                        <label>Retype Password
                            <input type="text" placeholder="" />
                        </label>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = Signup;
