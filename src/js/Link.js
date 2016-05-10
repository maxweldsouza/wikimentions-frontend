var React = require('react');

var Link = React.createClass({
    render () {
        var type = this.props.type;
        var pagepath;
        var defaultTab;
        if (type === 'video') {
            pagepath = '/videos/';
            defaultTab = 'mentioned';
        } else if (type === 'book') {
            pagepath = '/books/';
            defaultTab = 'mentioned';
        } else if (type === 'person') {
            pagepath = '/pages/';
            defaultTab = 'videos';
        } else {
            pagepath = '/pages/';
            defaultTab = 'videos';
            console.warn('No page type specified for Link');
        }

        var tab = '';
        if (this.props.tab && this.props.tab !== defaultTab) {
            tab = '/' + this.props.tab;
        }
        return (
            <a href={pagepath + this.props.id + '/' + this.props.slug +  tab}>{this.props.title}</a>
        );
    }
});

module.exports = Link;
