import React from 'react';
import autoBind from 'react-autobind';

class Link extends React.Component {
    render () {
        const type = this.props.type;
        let pagepath;
        let defaultTab;
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

        const tab = this.props.tab ? this.props.tab : defaultTab;
        let href;
        let nofollow = false;
        if (['edit', 'discuss', 'history'].includes(tab)) {
            href = `/${tab}/${this.props.id}/${this.props.slug}`;
            nofollow = true;
        } else if (tab !== defaultTab) {
            href = `${pagepath + this.props.id}/${this.props.slug}/${tab}`;
        } else {
            href = `${pagepath + this.props.id}/${this.props.slug}`;
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
}

export default Link;
