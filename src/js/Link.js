var React = require('react');

var Link = React.createClass({
    render () {
        var type = this.props.type;
        var pagepath;
        if (type === 'video') {
            pagepath = '/videos/';
        } else if (type === 'book') {
            pagepath = '/books/';
        } else if (type === 'person') {
            pagepath = '/pages/';
        } else {
            pagepath = '/pages/';
            console.warn('No page type specified for Link');
        }
        return (
            <a href={pagepath + this.props.id + '/' + this.props.slug}>{this.props.title}</a>
        );
    }
});

module.exports = Link;
