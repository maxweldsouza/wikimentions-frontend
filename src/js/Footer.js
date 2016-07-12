var React = require('react');
var config = require('./config');

var Footer = React.createClass({
    render () {
        return (
            <div className='page-footer align-right'>
                <div className='row'>
                    <div className='small-12 xlarge-6 columns footer-logo-container'>
                        <div className='footer-logo'>{config.name}</div>
                        © Copyright 2016
                    </div>
                    <div className='small-12 xlarge-6 columns'>
                        <div className='row'>
                            <div className='small-12 large-4 columns'>
                                <ul className='menu vertical'>
                                    <li className="menu-text">Social</li>
                                    <li><a href=''>Facebook</a></li>
                                    <li><a href=''>Twitter</a></li>
                                    <li><a href='/blog'>Blog</a></li>
                                </ul>
                            </div>
                            <div className='small-12 large-4 columns'>
                                <ul className='menu vertical'>
                                    <li className="menu-text">Site</li>
                                    <li><a href='/create'>Create</a></li>
                                    <li><a href='/contribute'>Contribute</a></li>
                                    <li><a href='/contact'>Contact</a></li>
                                </ul>
                            </div>
                            <div className='small-12 large-4 columns'>
                                <ul className='menu vertical'>
                                    <li className="menu-text">Legal</li>
                                    <li><a href='/terms-of-use'>Terms of Use</a></li>
                                    <li><a href='/privacy-policy'>Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Footer;
