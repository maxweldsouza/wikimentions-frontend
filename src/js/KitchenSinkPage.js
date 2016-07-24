var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Comment = require('./Comment');
var _ = require('underscore');
var DiscussReply = require('./DiscussReply');
var PageBar = require('./PageBar');
var config = require('./config');
var AdminOnly = require('./AdminOnly');

var KitchenSinkPage = React.createClass({
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
                        <AdminOnly>
                        <div className='card-container'>
                            <div className='card'>
                                <div className='small-6 columns'>
                                    <h2>Typography</h2>
                                    <h1>Heading 1</h1>
                                    <h2>Heading 2</h2>
                                    <h3>Heading 3</h3>
                                    <hr/>
                                    <h2>Buttons</h2>
                                    <div>
                                        <button className='button'>Button</button>
                                        <button className='button secondary'>Secondary</button>
                                        <button className='button success'>Success</button>
                                        <button className='button warning'>Warning</button>
                                        <button className='button alert'>Alert</button>
                                    </div>
                                    <hr/>
                                    <h2>Badge</h2>
                                    <span className="badge">B</span>
                                    <span className="secondary badge">S</span>
                                    <span className="success badge">S</span>
                                    <span className="warning badge">W</span>
                                    <span className="alert badge">A</span>
                                </div>
                                <div className='small-6 columns'>
                                    <h2>Callout</h2>
                                    <div className='callout'>
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
                                </div>
                            </div>
                            <div className='card'>
                                <div className='small-12 columns'>
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
                                            <img className="thumbnail" src="https://localhost/api/v1/static/images/4994a3944f9bd4e5045064c2ed1572ec-250-250.jpg"/>
                                        </div>
                                        <div className="small-4 columns">
                                            <img className="thumbnail" src="https://localhost/api/v1/static/images/84d376998b880e07e7a12262ff86f6dd-250-250.jpg"/>
                                        </div>
                                        <div className="small-4 columns">
                                            <img className="thumbnail" src="https://localhost/api/v1/static/images/787d501ad8c61d42e44a1f7a19c29ff9-250-250.jpg" />
                                        </div>
                                    </div>

                                    <hr/>
                                    <h2>Forms</h2>
                                    <label>Label</label>
                                    <input type='text' placeholder='Input'/>
                                </div>
                            </div>
                        </div>
                        </AdminOnly>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = KitchenSinkPage;