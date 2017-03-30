import React from 'react';

const Link = ({ type, tab, id, slug, className, children }) => {
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

    const finaltab = tab ? tab : defaultTab;
    let href;
    let nofollow = false;
    if (['edit', 'discuss', 'history'].includes(finaltab)) {
        href = `/${finaltab}/${id}/${slug}`;
        nofollow = true;
    } else if (finaltab !== defaultTab) {
        href = `${pagepath + id}/${slug}/${finaltab}`;
    } else {
        href = `${pagepath + id}/${slug}`;
    }
    if (nofollow) {
        return (
            <a rel="nofollow" className={className} href={href}>
                {children}
            </a>
        );
    }
    return <a className={className} href={href}>{children}</a>;
};

export default Link;
