/* The main component is used both on the server and the client
 * side. It takes only one prop 'path'. */

var React = require('react');

/* components need to be required because they are used indirectly */
var Spinner = require('./Spinner');
var HomePage = require('./HomePage');

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
    onToggleSidebar: function () {
        this.setState({
            sidebar: !this.state.sidebar
        });
        ga('send', {
            hitType: 'event',
            eventCategory: 'MainComponent',
            eventAction: 'toggle-sidebar'
        });
    },
    onToggleShortlist: function () {
        this.setState({
            shortlistHidden: !this.state.shortlistHidden
        });
        ga('send', {
            hitType: 'event',
            eventCategory: 'MainComponent',
            eventAction: 'toggle-shortlist'
        });
    },
    onShortlistEdit: function (category, product) {
        var temp = {
            shortlist: this.state.shortlist
        };
        var i = temp.shortlist[category].indexOf(product);
        if (i >= 0) {
            temp.shortlist[category].splice(i, 1);
            ga('send', {
                hitType: 'event',
                eventCategory: 'MainComponent',
                eventAction: 'remove-shortlist',
                eventLabel: product
            });
        } else {
            if (temp.shortlist[category].length > 4) {
                return;
            }
            temp.shortlistHidden = false;
            temp.shortlist[category].push(product);
            ga('send', {
                hitType: 'event',
                eventCategory: 'MainComponent',
                eventAction: 'add-shortlist',
                eventLabel: product
            });
        }
        this.setState(temp);
    },
    onShortlistClear: function (category) {
        var shortlist = this.state.shortlist;
        shortlist[category] = [];
        this.setState({
            shortlist: shortlist,
            shortlistHidden: true
        });
        ga('send', {
            hitType: 'event',
            eventCategory: 'MainComponent',
            eventAction: 'clear-shortlist'
        });
    },
    render: function () {
        var Component = require('./' + this.props.component);
        return (
            <div>
                <Spinner />
                <Component
                />
            </div>
        );
    }
});

module.exports = MainComponent;
