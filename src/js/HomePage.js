var React = require('react');
var Helmet = require('react-helmet');

var HomePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render: function () {
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
                <div className='top-bar'>
                    <div className='top-bar-left'>
                        <ul className='dropdown menu' data-dropdown-menu>
                            <li className='menu-text'>Mentions</li>
                            <li className='has-submenu'>
                                <a href='#'>One</a>
                                <ul className='submenu menu vertical' data-submenu>
                                    <li><a href='#'>One</a></li>
                                    <li><a href='#'>Two</a></li>
                                    <li><a href='#'>Three</a></li>
                                </ul>
                            </li>
                            <li><a href='#'>Two</a></li>
                            <li><a href='#'>Three</a></li>
                        </ul>
                    </div>
                    <div className='top-bar-right'>
                        <ul className='menu'>
                            <li><input type='search' placeholder='Search' /></li>
                            <li><button type='button' className='button'>Search</button></li>
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <h1>Mentions</h1>
                </div>
                <div className='row'>
                    <div className='small-2 columns'>2 columns</div>
                    <div className='small-10 columns'>10 columns</div>
                </div>
                <div className='row'>
                    <div className='small-3 columns'>3 columns</div>
                    <div className='small-9 columns'>9 columns</div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
