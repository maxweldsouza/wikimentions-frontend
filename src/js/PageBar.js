var React = require('react');

var PageBar = React.createClass({
    render () {
        var id = this.props.id;
        var slug = this.props.slug;
        var type = this.props.type;
        var pagepath;
        if (type === 'video') {
            pagepath = '/videos/';
        } else if (type === 'book') {
            pagepath = '/books/';
        } else if (type === 'person') {
            pagepath = '/people/';
        } else {
            throw new Error('No page type specified');
        }
        return (
            <div className='page-bar'>
                {this.props.noPage ? null : <span><a
                    className='secondary hint--bottom-right hint--rounded hint--no-animate'
                    href={pagepath + id + '/' + slug}
                    aria-label='Back to page'>Page</a>{' · '}</span>}
                <a
                    className='secondary hint--bottom-right hint--rounded hint--no-animate'
                    href={'/edit/' + id + '/' + slug}
                    aria-label='Edit this page'>Edit</a>
                {' · '}
                <a
                    className='secondary hint--bottom-right hint--rounded hint--no-animate'
                    href={'/discuss/' + id + '/' + slug}
                    aria-label='Discussion about this page'>Discuss</a>
                {' · '}
                <a
                    className='secondary hint--bottom hint--rounded hint--no-animate'
                    href={'/history/' + id + '/' + slug}
                    aria-label='Page edit history'>History</a>
            </div>
        );
    }
});

module.exports = PageBar;
