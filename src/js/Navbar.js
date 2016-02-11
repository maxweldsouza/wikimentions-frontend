var React = require('react');
var cookies = require('browser-cookies');

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
    render () {
        var user;
        if (this.state.loggedin) {
            user = <ul className='menu'>
                <li><input type='search' placeholder='Search' /></li>
                <li><button type='button' className='button'>Search</button></li>
                <li><a href='/users/1/maxweldsouza'>maxweldsouza</a></li>
                <li>
                    <form action='/api/v1/logout' method='post'>
                        <button type='submit'>Logout</button>
                    </form>
                </li>
            </ul>;
        } else {
            user = <ul className='menu'>
                <li><input type='search' placeholder='Search' /></li>
                <li><button type='button' className='button'>Search</button></li>
                <li><a href='/login'>Login</a></li>
                <li><a href='/signup'>Signup</a></li>
            </ul>;
        }
        return (
            <div className='top-bar'>
                <div className='top-bar-left'>
                    <ul className='dropdown menu' data-dropdown-menu>
                        <li className='menu-text'><a href='/'>Mentions</a></li>
                        <li><a href='#'>New</a></li>
                        <li><a href='#'>Popular</a></li>
                        <li><a href='/create'>Create Page</a></li>
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
