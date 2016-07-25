var React = require('react');
var config = require('./config');
var AdminOnly = require('./AdminOnly');

var Footer = React.createClass({
    render () {
        return (
            <div className='page-footer align-right'>
                <div className='row'>
                    <div className='small-12 xlarge-4 columns footer-logo-container'>
                        <div className='footer-logo'>{config.name}</div>
                        {config.contact}
                    </div>
                    <div className='small-12 xlarge-8 columns'>
                        <div className='row'>
                            <AdminOnly>
                            <div className='small-12 large-3 columns'>
                                <ul className='menu vertical'>
                                    <li className="menu-text">Admin</li>
                                    <li><a href='/feedback'>Feedback</a></li>
                                    <li><a href='/bugs'>Bugs</a></li>
                                    <li><a href='/kitchen-sink'>Kitchen Sink</a></li>
                                </ul>
                            </div>
                            </AdminOnly>
                            <div className='small-12 large-3 columns'>
                                <ul className='menu vertical'>
                                    <li className="menu-text">Navigation</li>
                                    <li><a href='/create'>Create Page</a></li>
                                    <li><a href='/recent-changes'>Recent Changes</a></li>
                                    <li><a href='/recent-discussions'>Recent Discussions</a></li>
                                    <li><a href='/blog'>Blog</a></li>
                                </ul>
                            </div>
                            <div className='small-12 large-3 columns'>
                                <ul className='menu vertical'>
                                    <li className="menu-text">Help</li>
                                    <li><a href='/about-us'>About Us</a></li>
                                    <li><a href='/guidelines'>Guidelines</a></li>
                                    <li><a href='/terms-of-use'>Terms of Use</a></li>
                                    <li><a href='/privacy-policy'>Privacy Policy</a></li>
                                </ul>
                            </div>
                            <div className='small-12 large-3 columns'>
                                <ul className='menu vertical'>
                                    <li className="menu-text">Social</li>
                                    <li><a href={config.social.facebook}>Facebook</a></li>
                                    <li><a href={config.social.twitter}>Twitter</a></li>
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
