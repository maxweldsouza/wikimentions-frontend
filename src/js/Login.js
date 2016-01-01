var React = require('react');

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
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = Login;
