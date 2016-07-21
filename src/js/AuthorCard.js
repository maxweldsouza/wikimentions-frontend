var React = require('react');
var Image = require('./Image');
var Placeholder = require('./Placeholder');
var _ = require('underscore');
var Link = require('./Link');
var requests = require('superagent');
var cookies = require('browser-cookies');
var Snackbar = require('./Snackbar');

var AuthorCard = React.createClass({
    removeAuthor (id) {
        var type;
        if (this.props.sourceType === 'book') {
            type = '/booksby';
        } else if (this.props.sourceType === 'video') {
            type = '/videosby';
        }
        requests
        .post('/api/v1/thing/' + this.props.sourceId + type)
        .type('form')
        .send({
            author_id: id,
            action: 'remove',
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submiting: false
            });
            if (err && err.status) {
                Snackbar({message: res.body.message});
            } else {
                Snackbar({message: 'Removed author'});
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    render () {
        var image = this.props.image;
        if (image) {
            image = <Image className='img' id={this.props.id} md5={image.thumb_md5} width={image.thumb_width} height={image.thumb_height} displayWidth={40}/>;
        } else {
            image = <Placeholder style={{'width': 40, 'height': 40, 'border': 'none', 'lineHeight': '40px'}}/>;
        }
        return (
            <div className='card'>
                <div className='shrink columns'>
                    {image}
                </div>
                <div className='columns'>
                    <Link
                        id={this.props.id}
                        slug={this.props.slug}
                        type={this.props.type}>{this.props.title}</Link>
                    <div>
                        {this.props.description}
                    </div>
                </div>
                <div className='shrink columns'>
                    <a className='button secondary small' onClick={this.removeAuthor.bind(null, this.props.id)}>Remove</a>
                </div>
            </div>
        );
    }
});

module.exports = AuthorCard;
