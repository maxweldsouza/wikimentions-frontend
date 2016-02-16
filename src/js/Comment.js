var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var moment = require('moment');

var Comment = React.createClass({
    render () {
        var updated = this.props.posted;
        updated = moment(updated).fromNow();
        return (
            <div className='small-12 columns discuss-comment'>
                <div className="row">
                    <div className="small-6 columns discuss-username">
                        <a href={'/users/' + this.props.id + '/' + this.props.name}>{this.props.name}</a>
                    </div>
                    <div className="small-6 columns text-right discuss-updated">{updated}</div>
                </div>
                <div className="row discuss-text">
                    <div className="small-12 columns">{this.props.text}</div>
                </div>
            </div>
        );
    }
});

module.exports = Comment;
