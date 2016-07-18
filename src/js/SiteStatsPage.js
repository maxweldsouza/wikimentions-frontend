var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Comment = require('./Comment');
var _ = require('underscore');
var DiscussReply = require('./DiscussReply');
var PageBar = require('./PageBar');
var config = require('./config');

var SiteStatsPage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: [
                ]
            };
        }
    },
    render () {
        return (
            <span>
                <Helmet
                    title={'Site Stats'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'robots', 'content': 'noindex'}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url + this.props.path}
                    ]}
                    />
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}/>
                <div className='row page-body align-center'>
                    <div className='small-12 columns'>
                        <h1>Kitchen Sink</h1>
                        <div className='card-container'>
                            <div className='card'>
                                <div className='small-12 columns'>

                                    <h2>Typography</h2>
                                    <h1>Heading 1</h1>
                                    <h2>Heading 2</h2>
                                    <h3>Heading 3</h3>
                                    <hr/>

                                    <h2>Callout</h2>
                                    <div className='callout'>
                                        This is a callout.
                                    </div>
                                    <div className='callout primary'>
                                        This is a callout.
                                    </div>
                                    <div className='callout secondary'>
                                        This is a callout.
                                    </div>
                                    <div className='callout success'>
                                        This is a callout.
                                    </div>
                                    <div className='callout warning'>
                                        This is a callout.
                                    </div>
                                    <div className='callout alert'>
                                        This is a callout.
                                    </div>

                                    <hr/>
                                    <h2>Buttons</h2>
                                    <div>
                                        <button className='button'>Button</button>
                                        <button className='button primary'>Primary</button>
                                        <button className='button secondary'>Secondary</button>
                                        <button className='button success'>Success</button>
                                        <button className='button warning'>Warning</button>
                                        <button className='button alert'>Alert</button>
                                    </div>
                                    <div>
                                        <button className='hollow button'>Button</button>
                                        <button className='hollow button primary'>Primary</button>
                                        <button className='hollow button secondary'>Secondary</button>
                                        <button className='hollow button success'>Success</button>
                                        <button className='hollow button warning'>Warning</button>
                                        <button className='hollow button alert'>Alert</button>
                                    </div>

                                    <hr/>
                                    <h2>Badge</h2>
                                    <span className="badge">P</span>
                                    <span className="secondary badge">S</span>
                                    <span className="success badge">S</span>
                                    <span className="warning badge">W</span>
                                    <span className="alert badge">A</span>

                                    <hr/>
                                    <h2>Label</h2>
                                    <span className="secondary label">Secondary Label</span>
                                    <span className="success label">Success Label</span>
                                    <span className="alert label">Alert Label</span>
                                    <span className="warning label">Warning Label</span>

                                    <hr/>
                                    <h2>Pagination</h2>
                                    <ul className="pagination" role="navigation" aria-label="Pagination">
                                        <li className="disabled">Previous <span className="show-for-sr">page</span></li>
                                        <li className="current"><span className="show-for-sr">You're on page</span> 1</li>
                                        <li><a href="#" aria-label="Page 2">2</a></li>
                                        <li><a href="#" aria-label="Page 3">3</a></li>
                                        <li><a href="#" aria-label="Page 4">4</a></li>
                                        <li className="ellipsis" aria-hidden="true" />
                                        <li><a href="#" aria-label="Page 12">12</a></li>
                                        <li><a href="#" aria-label="Page 13">13</a></li>
                                        <li><a href="#" aria-label="Next page">Next <span className="show-for-sr">page</span></a></li>
                                    </ul>

                                    <hr/>
                                    <h2>Images</h2>
                                    <div className="row">
                                        <div className="small-4 columns">
                                            <img className="thumbnail" src="assets/img/thumbnail/01.jpg" alt="Photo of Uranus." />
                                        </div>
                                        <div className="small-4 columns">
                                            <img className="thumbnail" src="assets/img/thumbnail/02.jpg" alt="Photo of Neptune." />
                                        </div>
                                        <div className="small-4 columns">
                                            <img className="thumbnail" src="assets/img/thumbnail/03.jpg" alt="Photo of Pluto." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = SiteStatsPage;
