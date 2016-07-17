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
            pagepath = '/pages/';
            console.warn('No page type specified for PageBar');
        }
        return (
            <div className='page-bar'>
                {this.props.noPage ? null : <span><a className='secondary' href={pagepath + id + '/' + slug} title='Back to page'>Page</a>{' · '}</span>}
                <a className='secondary' href={'/edit/' + id + '/' + slug} title='Edit this page'>Edit</a>
                {' · '}
                <a className='secondary' href={'/discuss/' + id + '/' + slug} title='Discussion about this page'>Discuss</a>
                {' · '}
                <a className='secondary' href={'/history/' + id + '/' + slug} title='Page edit history'>History</a>
            </div>
        );
    }
});

module.exports = PageBar;
