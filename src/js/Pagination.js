var React = require('react');

var Pagination = React.createClass({
    defaultProps: {
        pages: 10,
        current: 1
    },
    render () {
        var pages = Array(this.props.pages).fill();
        pages = pages.map((x, i) => {
            return i + 1;
        });
        return (
            <ul className='pagination text-center' role='navigation' aria-label='Pagination'>
                <li className='pagination-previous disabled'><a aria-label='Previous page' onClick={this.props.onPrev}>Previous <span className='show-for-sr'>page</span></a></li>
                {pages.map((x) => {
                    if (x === this.props.current) {
                        return <li className='current' key={x}><span className='show-for-sr'>You're on page</span> {x}</li>;
                    }
                    return <li key={x}><a aria-label={'Page ' + x} onClick={this.props.onChange}>{x}</a></li>;
                })}
                <li className='pagination-next'><a aria-label='Next page' onClick={this.props.onNext}>Next <span className='show-for-sr'>page</span></a></li>
            </ul>
        );
    }
});

module.exports = Pagination;
