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
                {this.props.noPage ? null : <span><a className='secondary' href={pagepath + id + '/' + slug}>Page</a>{' · '}</span>}
                <a className='secondary' href={'/edit/' + id + '/' + slug}>Edit</a>
                {' · '}
                <a className='secondary' href={'/discuss/' + id + '/' + slug}>Discuss</a>
                {' · '}
                <a className='secondary' href={'/history/' + id + '/' + slug}>History</a>
                {' · '}
                <a className='secondary' href={'/images/' + id + '/' + slug}>Images</a>
            </div>
        );
    }
});

module.exports = PageBar;
