var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Placeholder = require('./Placeholder');

var Book = React.createClass({
    render () {
        var message;
        if (!(this.props.isbn || this.props.isbn13)) {
            message = <span className="ion-alert-circled"></span>;
        }
        return (
            <div className='small-12 medium-6 large-4 columns text-center'>
                <a href={'/books/' + this.props.id + '/' + this.props.slug}>
                <div>
                    <Placeholder style={{'width': 150, 'height': 200, 'border': 'none', 'lineHeight': '200px'}}/>
                </div>
                <div className='card-title'>
                    {this.props.title} {message}
                </div>
                </a>
            </div>
        );
    }
});

module.exports = Book;
