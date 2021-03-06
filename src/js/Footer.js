import React from 'react';
import config from './config';
import AdminOnly from './AdminOnly';

const Footer = () => {
    return (
        <footer className="page-footer align-right" role="contentinfo">
            <div className="row">
                <div
                    className="small-12 xlarge-4 columns footer-logo-container"
                >
                    <div className="footer-logo">{config.name}</div>
                    {config.contact}
                </div>
                <div className="small-12 xlarge-8 columns">
                    <div className="row">
                        <div
                            className="small-6 xlarge-offset-3 large-3 columns"
                        >
                            <ul className="menu vertical">
                                <li className="menu-text">Navigation</li>
                                <li><a href="/create">Create Page</a></li>
                                <li><a href="/lists/create">Create List</a></li>
                                <li>
                                    <a rel="nofollow" href="/recent-changes">
                                        Recent Changes
                                    </a>
                                </li>
                                <li>
                                    <a
                                        rel="nofollow"
                                        href="/recent-discussions"
                                    >
                                        Recent Discussions
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="small-6 large-3 columns">
                            <ul className="menu vertical">
                                <li className="menu-text">Help</li>
                                <li><a href="/about-us">About Us</a></li>
                                <li><a href="/guidelines">Guidelines</a></li>
                                <li><a href="/media-kit">Media Kit</a></li>
                            </ul>
                        </div>
                        <div className="small-6 large-3 columns">
                            <ul className="menu vertical">
                                <li className="menu-text">Social</li>
                                <li>
                                    <a href={config.social.facebook}>
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href={config.social.twitter}>Twitter</a>
                                </li>
                                <li><a href="/blog">Blog</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div
                    className="small-12 columns text-center"
                    style={{ fontSize: '12px', marginTop: 30 }}
                >
                    By using
                    {' '}
                    {config.name}
                    {' '}
                    you agree to our
                    {' '}
                    <a href="/terms-of-use">Terms of Use</a>
                    {' '}
                    and
                    {' '}
                    <a href="/privacy-policy">Privacy Policy</a>
                    {' '}
                    which were
                    {' '}
                    <strong>last updated</strong>
                    {' '}
                    on
                    {' '}
                    <strong>23rd September 2016.</strong>
                    <AdminOnly>
                        <div>
                            <strong>Admin: </strong>
                            <a rel="nofollow" href="/feedback">Feedback</a>
                            {' . '}
                            <a rel="nofollow" href="/bugs">Bugs</a>{' . '}
                            <a rel="nofollow" href="/kitchen-sink">
                                Kitchen Sink
                            </a>
                        </div>
                    </AdminOnly>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
