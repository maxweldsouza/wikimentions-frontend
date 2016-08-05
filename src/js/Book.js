var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Thumbnail = require('./Thumbnail');

var Book = React.createClass({
    render () {
        return (
            <div className='small-12 medium-6 large-4 columns text-center'>
                <a href={'/books/' + this.props.id + '/' + this.props.slug}>
                <div>
                    <Thumbnail
                        alt={this.props.title}
                        type={this.props.type}
                        image={this.props.image}
                        shadow={true}
                        displayHeight={200} />
                </div>
                <div className='card-title'>
                    {this.props.title}
                </div>
                </a>
            </div>
        );
    }
});

module.exports = Book;
