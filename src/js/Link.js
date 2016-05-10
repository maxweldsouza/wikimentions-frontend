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
        var query = '';
        if (this.props.tab) {
            query = '?tab=' + this.props.tab;
        }
        return (
            <a href={pagepath + this.props.id + '/' + this.props.slug + query}>{this.props.title}</a>
        );
    }
});

module.exports = Link;
