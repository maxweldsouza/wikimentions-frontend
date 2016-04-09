var React = require('react');
var cookies = require('browser-cookies');
var Select = require('./Select');

var Navbar = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    getInitialState () {
        return {
            loggedin: false
        };
    },
    componentDidMount () {
        var session = cookies.get('mentions');
        this.setState({
            loggedin: session ? true : false
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
            user = null;
        } else {
            user = <ul className='menu'>
                <li><Select name='book_id'/></li>
                <li><button type='button' className='button'>Search</button></li>
                <li><a href='/login'>Login</a></li>
                <li><a href='/signup'>Signup</a></li>
            </ul>;
        }
        return (
            <div className='top-bar'>
                <div className='top-bar-left'>
                    <ul className='menu icon-top'>
                        <li className='menu-text'><a href='/'>Mentions</a></li>
                        <li className='show-for-large'><a href='/create'>Create Page</a></li>
                    </ul>
                </div>
                <div className='top-bar-right'>
                    <ul className='menu'>
                        <li className='show-for-large'><Select name='mentioned' onSelectValue={this.onSelectSearchResult} placeholder={'Search'}/></li>
                        <li className='hide-for-large navbar-icon'>
                            <i className='ion-android-search'/>
                        </li>
                        <li className='hide-for-large navbar-icon'>
                            <i className='ion-android-person'/>
                        </li>
                        <li  className='show-for-large'><a href='/users/1/maxweldsouza'>maxweldsouza</a></li>
                        <li className='show-for-large'>
                            <form action='/api/v1/logout' method='post'>
                                <button type='submit'>Logout</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Navbar;
