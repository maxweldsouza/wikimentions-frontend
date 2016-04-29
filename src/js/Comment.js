var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var moment = require('moment');
var Markdown = require('./Markdown');

var Comment = React.createClass({
    render () {
        var updated = this.props.posted;
        updated = moment(updated).fromNow();
        return (
            <div className='card'>
                <div className="small-6 columns discuss-username">
                    <a href={'/users/' + this.props.user + '/' + this.props.name}>{this.props.name}</a>
                </div>
                <div className="small-6 columns text-right discuss-updated">{updated}</div>
                <div className="small-12 columns discuss-text">
                    <Markdown
                        markdown={this.props.text}
                        />
                </div>
            </div>
        );
    }
});

module.exports = Comment;
