var React = require('react');

var PreviousNext = React.createClass({
    render () {
        // If there are less than 10 entries on the current page then there is no next page.
        var page = this.props.page ? Number(this.props.page) : 1;
        var prev;
        if (page === 2) {
            prev = '/' + this.props.path;
        } else {
            prev = '/' + this.props.path + '?page=' + (page - 1);
        }
        var next = '/' + this.props.path + '?page=' + (page + 1);
        if (page === 1 && this.props.count < 10) {
            return null;
        }
        return (
            <div className='card'>
                <div className='small-6 columns'>
                    {page > 1 ? <a className='secondary' href={prev}>Previous</a> : null}
                </div>
                <div className='small-6 columns text-right'>
                    {this.props.count === 10 ? <a className='secondary' href={next}>Next</a> : null}
                </div>
            </div> : null
        );
    }
});

module.exports = PreviousNext;
