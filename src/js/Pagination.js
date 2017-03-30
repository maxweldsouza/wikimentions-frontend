import React from 'react';
import queryString from 'query-string';
import _ from 'underscore';
import autoBind from 'react-autobind';

class Pagination extends React.Component {
    pagePath(no) {
        const query = this.props.query ? _.clone(this.props.query) : {};
        if (no === 1) {
            if (query && query.page) {
                delete query.page;
            }
        } else {
            query.page = no;
        }
        if (_.isEmpty(query)) {
            return `/${this.props.path}`;
        }
        return `/${this.props.path}?${queryString.stringify(query)}`;
    }
    render() {
        const current = this.props.page ? Number(this.props.page) : 1;
        let totalPages;
        if (_.isUndefined(this.props.total)) {
            totalPages = this.props.count < 10 ? current : current + 1;
        } else {
            totalPages = Math.ceil(this.props.total / 10);
            if (totalPages < 2) {
                return null;
            }
        }
        let pages = Array(totalPages).fill();
        pages = pages.map((x, i) => {
            return i + 1;
        });
        let prev = this.pagePath(current - 1);
        let next = this.pagePath(current + 1);
        if (current === 1) {
            prev = (
                <li className="pagination-previous disabled">
                    Previous <span className="show-for-sr">page</span>
                </li>
            );
        } else {
            prev = (
                <li className="pagination-previous">
                    <a aria-label="Previous page" href={prev}>
                        Previous <span className="show-for-sr">page</span>
                    </a>
                </li>
            );
        }
        if (current === totalPages) {
            next = (
                <li className="pagination-next disabled">
                    Next <span className="show-for-sr">page</span>
                </li>
            );
        } else {
            next = (
                <li className="pagination-next">
                    <a aria-label="Next page" href={next}>
                        Next <span className="show-for-sr">page</span>
                    </a>
                </li>
            );
        }
        return (
            <div className="box">
                <div className="small-12 columns">
                    <ul
                        className="pagination text-center"
                        role="navigation"
                        aria-label="Pagination"
                    >
                        {prev}
                        {pages.map(x => {
                            const path = this.pagePath(x);
                            if (x === current) {
                                return (
                                    <li className="current" key={x}>
                                        <span className="show-for-sr">
                                            You're on page
                                        </span>
                                        {' '}
                                        {x}
                                    </li>
                                );
                            }
                            return (
                                <li key={x}>
                                    <a aria-label={`Page ${x}`} href={path}>
                                        {x}
                                    </a>
                                </li>
                            );
                        })}
                        {next}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Pagination;
