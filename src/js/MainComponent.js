/* The main component is used both on the server and the client
 * side. It takes only one prop 'path'. */

var React = require('react');

/* components need to be required because they are used indirectly */
var Spinner = require('./Spinner');
var HomePage = require('./HomePage');
var BookPage = require('./BookPage');
var PeoplePage = require('./PeoplePage');
var Login = require('./Login');
var Signup = require('./Signup');

var store = require('store');

var MainComponent = React.createClass({
    propTypes: {
        component: React.PropTypes.string.isRequired,
        data: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        /* this is the entire app state
         * it will persist across browser tabs since it is stored
         * in localstorage
         * also any changes to appstate will reflect in other tabs
         * immediately */
        var appstate = store.get('appstate');
        if (typeof appstate === 'undefined') {
            appstate = {};
        }
        appstate.shortlistHidden = true;
        appstate.sidebar = false;
        /* we need to check for properties since we may be using an older
         * version of object from localstorage */
        if (typeof appstate.shortlist === 'undefined') {
            appstate.shortlist = {};
            if (typeof appstate.shortlist.mobiles === 'undefined') {
                appstate.shortlist.mobiles = [];
            }
        }
        return appstate;
    },
    componentDidMount: function () {
        window.addEventListener('storage', this.onLocalStorageChanged);
    },
    componentWillReceiveProps () {
        this.setState({
            sidebar: false
        });
    },
    componentDidUpdate: function () {
        store.set('appstate', this.state);
    },
    componentWillUnMount: function () {
        window.removeEventListener('storage', this.onLocalStorageChanged);
    },
    onLocalStorageChanged: function () {
        var appstate = store.get('appstate');
        this.setState(appstate);
    },
    render: function () {
        var Component = require('./' + this.props.component);
        return (
            <div>
                <Spinner />
                <Component
                    data={this.props.data}
                    path={this.props.path}
                />
            </div>
        );
    }
});

module.exports = MainComponent;
