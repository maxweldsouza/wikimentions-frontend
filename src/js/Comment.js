var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var moment = require('moment');
var Markdown = require('./Markdown');
var Time = require('./Time');

var Comment = React.createClass({
    render () {
        return (
            <div className='card'>
                <div className="small-6 columns">
                    <a href={'/users/' + this.props.user + '/' + this.props.name}>{this.props.name}</a>
                </div>
                <div className="small-6 columns text-right discuss-updated"><Time timestamp={this.props.posted} type='ago'/></div>
                <div className="small-12 columns">
                    <Markdown
                        markdown={this.props.text}
                        />
                </div>
            </div>
        );
    }
});

module.exports = Comment;
