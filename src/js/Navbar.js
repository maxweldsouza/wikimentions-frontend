var React = require('react');
var cookies = require('browser-cookies');
var Select = require('./Select');
var cookies = require('browser-cookies');
var isNode = require('./isNode');
var Xsrf = require('./Xsrf');
var config = require('./config');

var Navbar = React.createClass({
    getInitialState () {
        return {
            loggedin: false,
            username: '',
            userid: ''
        };
    },
    componentWillMount () {
        var session, username, userid;
        if (isNode.isBrowser()) {
            session = cookies.get('mentions');
            username = cookies.get('username');
            userid = cookies.get('userid');
        }
        this.setState({
            loggedin: session ? true : false,
            username: username,
            userid: userid
        });
    },
    onSelectSearchResult (x) {
        var path = '/pages/' + x.id + '/' + x.slug;
        history.pushState(null, null, path);
        Mentions.route(path);
    },
    render () {
        var user;
        if (this.state.loggedin) {
            user = <ul className='menu'>
                <li className='show-for-large'><Select name='mentioned' onSelectValue={this.onSelectSearchResult} placeholder={'Search'}/></li>
                <li className='hide-for-large navbar-icon'>
                    <i className='ion-android-search'/>
                </li>
                <li className='hide-for-large navbar-icon'>
                    <i className='ion-android-person'/>
                </li>
                <li className='show-for-large'><a href={'/users/' + this.state.userid + '/' + this.state.username}>{this.state.username}</a></li>
                <li className='show-for-large'>
                    <form action='/api/v1/logout' method='post'>
                        <Xsrf/>
                        <button type='submit'>Logout</button>
                    </form>
                </li>
            </ul>;
        } else {
            user = <ul className='menu'>
                <li className='show-for-large'><Select name='mentioned' onSelectValue={this.onSelectSearchResult} placeholder={'Search'}/></li>
                <li className='hide-for-large navbar-icon'>
                    <i className='ion-android-search'/>
                </li>
                <li className='hide-for-large navbar-icon'>
                    <i className='ion-android-person'/>
                </li>
                <li><a href='/login'>Login</a></li>
                <li><a href='/signup'>Signup</a></li>
            </ul>;
        }
        return (
            <div className='top-bar'>
                <div className='top-bar-left'>
                    <ul className='menu icon-top'>
                        <li className='menu-text'><a href='/'>{config.name}</a></li>
                        <li className='show-for-large'><a href='/create'>Create Page</a></li>
                    </ul>
                </div>
                <div className='top-bar-right'>
                    {user}
                </div>
            </div>
        );
    }
});

module.exports = Navbar;
