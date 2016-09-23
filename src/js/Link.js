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
        var nofollow = false;
        if (['edit', 'discuss', 'history'].indexOf(tab) >= 0) {
            href = '/' + tab + '/' + this.props.id + '/' + this.props.slug;
            nofollow = true;
        } else if (tab !== defaultTab) {
            href = pagepath + this.props.id + '/' + this.props.slug + '/' + tab;
        } else {
            href = pagepath + this.props.id + '/' + this.props.slug;
        }
        if (nofollow) {
            return (
                <a rel='nofollow' className={this.props.className} href={href}>{this.props.children}</a>
            );
        }
        return (
            <a className={this.props.className} href={href}>{this.props.children}</a>
        );
    }
});

module.exports = Link;
