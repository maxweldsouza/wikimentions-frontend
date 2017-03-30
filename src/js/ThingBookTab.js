import React from 'react';
import Book from './Book';
import AddBook from './AddBook';
import Pagination from './Pagination';

const ThingBookTab = ({ path, id, count, loggedin, books, page = '1' }) => {
    const emptybooks = (
        <div className="card box">
            <div className="blankslate">
                <span className="icon ion-ios-book" />
                <h3>No Books</h3>
                No books have been added for this author. You can help us by adding some.
            </div>
        </div>
    );
    const nomore = (
        <div className="card box">
            <div className="blankslate">
                <span className="icon ion-ios-book" />
                <h3>End of items</h3>
                No more books to show.
            </div>
        </div>
    );
    return (
        <div className="card-container">
            {books.map(x => {
                return (
                    <Book
                        key={x.id}
                        id={x.id}
                        image={x.image}
                        type={x.props.type}
                        slug={x.props.slug}
                        title={x.props.title}
                        mentioned_count={x.mentioned_count}
                        mentioned_by_count={x.mentioned_by_count}
                        isbn={x.isbn}
                        isbn13={x.isbn13}
                    />
                );
            })}
            {page === '1' && books.length === 0 ? emptybooks : null}
            {page !== '1' && books.length === 0 ? nomore : null}
            <Pagination total={count} path={path} page={page} />
            <div className="card box">
                <div className="small-12 columns">
                    <AddBook id={id} loggedin={loggedin} />
                </div>
            </div>
        </div>
    );
};

export default ThingBookTab;
