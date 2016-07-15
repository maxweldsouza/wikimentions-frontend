var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Placeholder = require('./Placeholder');
var Image = require('./Image');

var Book = React.createClass({
    render () {
        var message;
        if (!(this.props.isbn || this.props.isbn13)) {
            message = <span className="ion-alert-circled"></span>;
        }

        var image = this.props.image;
        if (image) {
            image = <Image className='img shadow' id={this.props.id} md5={image.md5} width={image.width} height={image.height}/>;
        } else {
            image = <Placeholder style={{'width': 150, 'height': 200, 'border': 'none', 'lineHeight': '200px'}}/>;
        }
        return (
            <div className='small-12 medium-6 large-4 columns text-center'>
                <a href={'/books/' + this.props.id + '/' + this.props.slug}>
                <div>
                    {image}
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
