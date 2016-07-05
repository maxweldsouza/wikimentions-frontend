var React = require('react');
var Book = require('./Book');
var AddBook = require('./AddBook');
var PreviousNext = require('./PreviousNext');
var Pagination = require('./Pagination');

var ThingBookTab = React.createClass({
    render () {
        var books = this.props.books;
        var emptybooks = <div className="small-12 columns">
            No books have been added for this author. You can help us by adding some.
        </div>;
        return (
            <div className='card-container'>
                <div className='card'>
                    {books.map((x) => {
                        return <Book
                            key={x.id}
                            id={x.id}
                            slug={x.props.slug}
                            title={x.props.title}
                            isbn={x.isbn}
                            isbn13={x.isbn13}
                            />;
                    })}
                    {books.length === 0 ? emptybooks : null}
                </div>
                <Pagination count={this.props.count} path={this.props.path} page={this.props.page}/>
                <div className='card'>
                    <div className='small-12 columns'>
                        <AddBook id={this.props.id}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ThingBookTab;
