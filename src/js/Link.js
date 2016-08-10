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

        var tab = '';
        var href;
        if (this.props.tab && this.props.tab !== defaultTab) {
            if (['edit', 'discuss', 'history'].indexOf(this.props.tab) >= 0) {
                href = '/' + this.props.tab + '/' + this.props.id + '/' + this.props.slug;
            } else {
                tab = '/' + this.props.tab;
                href = pagepath + this.props.id + '/' + this.props.slug + tab;
            }
        }
        return (
            <a className={this.props.className} href={href}>{this.props.children}</a>
        );
    }
});

module.exports = Link;
