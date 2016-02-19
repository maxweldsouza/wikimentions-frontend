var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');

var Book = React.createClass({
    render () {
        return (
            <div className='book-card small-12 medium-6 large-4 columns'>
                <a href={'/books/' + this.props.id + '/' + this.props.slug}>
                <div>
                    <img src='/assets/book.png'></img>
                </div>
                <div className='book-title'>
                    {this.props.name}
                </div>
                </a>
            </div>
        );
    }
});

module.exports = Book;