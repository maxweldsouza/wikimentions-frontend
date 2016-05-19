var React = require('react');

var Pagination = React.createClass({
    pagePath (no) {
        if (no === 1) {
            return '/' + this.props.path;
        }
        return '/' + this.props.path + '?page=' + no;
    },
    render () {
        var current = this.props.page ? Number(this.props.page) : 1;
        var totalPages = Math.ceil(this.props.count / 10);
        if (totalPages < 2) {
            return null;
        }
        var pages = Array(totalPages).fill();
        pages = pages.map((x, i) => {
            return i + 1;
        });
        var prev = this.pagePath(current - 1);
        var next = this.pagePath(current + 1);
        if (current === 1) {
            prev = <li className='pagination-previous disabled'>Previous <span className="show-for-sr">page</span></li>;
        } else {
            prev = <li className='pagination-previous'><a aria-label='Previous page' href={prev}>Previous <span className='show-for-sr'>page</span></a></li>;
        }
        if (current === totalPages) {
            next = <li className='pagination-next disabled'>Next <span className="show-for-sr">page</span></li>;
        } else {
            next = <li className='pagination-next'><a aria-label='Next page' href={next}>Next <span className='show-for-sr'>page</span></a></li>;
        }
        return (
            <div className='card'>
                <div className='small-12 columns'>
                    <ul className='pagination text-center' role='navigation' aria-label='Pagination'>
                        {prev}
                        {pages.map((x) => {
                            var path = this.pagePath(x);
                            if (x === current) {
                                return <li className='current' key={x}><span className='show-for-sr'>You're on page</span> {x}</li>;
                            }
                            return <li key={x}><a aria-label={'Page ' + x} href={path}>{x}</a></li>;
                        })}
                        {next}
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Pagination;
