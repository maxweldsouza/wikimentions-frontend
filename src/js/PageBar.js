var React = require('react');

var PageBar = React.createClass({
    render () {
        var id = this.props.id;
        var slug = this.props.slug;
        var type = this.props.type;
        return (
            <div className='edit-links'>
                <a href={'/pages/' + id + '/' + slug}>Page</a>
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
