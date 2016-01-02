var React = require('react');

var Navbar = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render () {
        return (
            <div className='top-bar'>
                <div className='top-bar-left'>
                    <ul className='dropdown menu' data-dropdown-menu>
                        <li className='menu-text'><a href='/'>Mentions</a></li>
                        <li><a href='#'>New</a></li>
                        <li><a href='#'>Popular</a></li>
                    </ul>
                </div>
                <div className='top-bar-right'>
                    <ul className='menu'>
                        <li><input type='search' placeholder='Search' /></li>
                        <li><button type='button' className='button'>Search</button></li>
                        <li><a href='/login'>Login</a></li>
                        <li><a href='/signup'>Signup</a></li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Navbar;
