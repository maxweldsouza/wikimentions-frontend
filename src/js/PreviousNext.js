var React = require('react');

var PreviousNext = React.createClass({
    render () {
        var page = this.props.page ? Number(this.props.page) : 1;
        var prev;
        if (page === 2) {
            prev = '/' + this.props.path;
        } else {
            prev = '/' + this.props.path + '?page=' + (page - 1);
        }
        var next = '/' + this.props.path + '?page=' + (page + 1);
        return (
            <div className='card'>
                <div className='small-6 columns'>
                    {page > 1 ? <a className='secondary' href={prev}>Previous</a> : null}
                </div>
                <div className='small-6 columns text-right'>
                    <a className='secondary' href={next}>Next</a>
                </div>
            </div>
        );
    }
});

module.exports = PreviousNext;
