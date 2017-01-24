import React from 'react';
import Book from './Book';
import AddBook from './AddBook';
import Pagination from './Pagination';

class ThingBookTab extends React.Component {
    static get defaultProps () {
        return {
            page: '1'
        };
    }
    render () {
        const books = this.props.books;
        const emptybooks = <div className='card box'>
            <div className='blankslate'>
                <span className='icon ion-ios-book'/>
                <h3>No Books</h3>
                No books have been added for this author. You can help us by adding some.
            </div>
        </div>;
        const nomore = <div className='card box'>
            <div className='blankslate'>
                <span className='icon ion-ios-book'/>
                <h3>End of items</h3>
                No more books to show.
            </div>
        </div>;
        return (
            <div className='card-container'>
                {books.map((x) => {
                    return <Book
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
                        />;
                })}
                {this.props.page === '1' && books.length === 0 ? emptybooks : null}
                {this.props.page !== '1' && books.length === 0 ? nomore : null}
                <Pagination total={this.props.count} path={this.props.path} page={this.props.page}/>
                <div className='card box'>
                    <div className='small-12 columns'>
                        <AddBook id={this.props.id} loggedin={this.props.loggedin}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ThingBookTab;
