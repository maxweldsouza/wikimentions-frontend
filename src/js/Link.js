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
            pagepath = '/people/';
            defaultTab = 'videos';
        } else {
            throw new Error('No page type specified');
        }

        var tab = this.props.tab ? this.props.tab : defaultTab;
        var href;
        if (['edit', 'discuss', 'history'].indexOf(tab) >= 0) {
            href = '/' + tab + '/' + this.props.id + '/' + this.props.slug;
        } else if (tab !== defaultTab) {
            href = pagepath + this.props.id + '/' + this.props.slug + '/' + tab;
        } else {
            href = pagepath + this.props.id + '/' + this.props.slug;
        }
        return (
            <a className={this.props.className} href={href}>{this.props.children}</a>
        );
    }
});

module.exports = Link;
