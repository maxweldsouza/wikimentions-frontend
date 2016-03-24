var React = require('react');
var Select = require('./Select');
var Book = require('./Book');

var ThingBookTab = React.createClass({
    render () {
        var books = this.props.books;
        var id = this.props.id;
        var emptybooks = <div className="small-12 columns">
            <p>No books have been added for this author. You can help us by adding some.</p>
        </div>;
        return (
            <div className='row'>
                {books.map((x) => {
                    return <Book
                        id={x.id}
                        slug={x.slug}
                        title={x.title}
                        />;
                })}
                {books.length === 0 ? emptybooks : null}
                <div className='small-12 columns'>
                    <form method='post' action={'/api/v1/book/' + id}>
                        Search for the title of a book to add
                        <Select
                            name='book_id'
                            />
                        <button type='submit' className='button'>Add Existing</button>
                        <button className='button'>Add New</button>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = ThingBookTab;
