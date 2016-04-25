var React = require('react');
var Book = require('./Book');
var AddBook = require('./AddBook');

var ThingBookTab = React.createClass({
    render () {
        var books = this.props.books;
        var emptybooks = <div className="small-12 columns">
            <p>No books have been added for this author. You can help us by adding some.</p>
        </div>;
        return (
            <div className='row'>
                {books.map((x) => {
                    return <Book
                        key={x.id}
                        id={x.id}
                        slug={x.slug}
                        title={x.title}
                        />;
                })}
                {books.length === 0 ? emptybooks : null}
                <div className='small-12 columns'>
                    <AddBook id={this.props.id}/>
                </div>
            </div>
        );
    }
});

module.exports = ThingBookTab;
