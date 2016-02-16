var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');

var Book = React.createClass({
    render () {
        return (
            <div className='small-4 columns'>
                <div>
                    <img src='/assets/book.png'></img>
                </div>
                <div>
                    <a href={'/books/' + this.props.id + '/' + this.props.slug}>{this.props.name}</a>
                </div>
            </div>
        );
    }
});

module.exports = Book;
