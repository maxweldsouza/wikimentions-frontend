var React = require('react');
var Book = require('./Book');
var AddBook = require('./AddBook');
var Pagination = require('./Pagination');

var ThingBookTab = React.createClass({
    getDefaultProps () {
        return {
            page: '1'
        };
    },
    render () {
        var books = this.props.books;
        var emptybooks = <div className='card box'>
            <div className='small-12 columns'>
            No books have been added for this author. You can help us by adding some.
            </div>
        </div>;
        var nomore = <div className='card box'>
            <div className='small-12 columns'>
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
                <Pagination count={this.props.count} path={this.props.path} page={this.props.page}/>
                <div className='card box'>
                    <div className='small-12 columns'>
                        <AddBook id={this.props.id} loggedin={this.props.loggedin}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ThingBookTab;
