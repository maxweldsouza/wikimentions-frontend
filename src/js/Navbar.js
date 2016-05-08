var React = require('react');
var cookies = require('browser-cookies');
var Select = require('./Select');
var cookies = require('browser-cookies');
var isNode = require('./isNode');
var Xsrf = require('./Xsrf');
var config = require('./config');

var Navbar = React.createClass({
    onSelectSearchResult (x) {
        var pagepath;
        if (x.type === 'video') {
            pagepath = '/videos/';
        } else if (x.type === 'book') {
            pagepath = '/books/';
        } else if (x.type === 'person') {
            pagepath = '/pages/';
        } else {
            pagepath = '/pages/';
            console.warn('No page type specified for Link');
        }
        var path = pagepath + x.id + '/' + x.slug;
        history.pushState(null, null, path);
        Mentions.route(path);
    },
    render () {
        var session, username, userid, loggedin;
        if (isNode.isBrowser()) {
            session = cookies.get('mentions');
            username = cookies.get('username');
            userid = cookies.get('userid');
        }
        loggedin = session ? true : false;
        var user;
        if (loggedin) {
            user = <ul className='menu'>
                <li><Select name='mentioned' onSelectValue={this.onSelectSearchResult} placeholder={'Search'}/></li>
                <li><a href={'/users/' + userid + '/' + username}>{username}</a></li>
            </ul>;
        } else {
            user = <ul className='menu'>
                <li><Select name='mentioned' onSelectValue={this.onSelectSearchResult} placeholder={'Search'}/></li>
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
                <div className='top-bar-right show-for-large'>
                    {user}
                </div>
            </div>
        );
    }
});

module.exports = Navbar;
