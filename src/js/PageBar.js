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
            pagepath = '/pages/';
        } else {
            pagepath = '/pages/';
            console.warn('No page type specified for PageBar');
        }
        return (
            <div className='page-bar'>
                <a href={pagepath + id + '/' + slug}>Page</a>
                {' | '}
                <a href={'/edit/' + id + '/' + slug}>Edit</a>
                {' | '}
                <a href={'/discuss/' + id + '/' + slug}>Discuss</a>
                {' | '}
                <a href={'/history/' + id + '/' + slug}>History</a>
            </div>
        );
    }
});

module.exports = PageBar;
