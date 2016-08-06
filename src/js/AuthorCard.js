var React = require('react');
var Thumbnail = require('./Thumbnail');
var _ = require('underscore');
var Link = require('./Link');
var requests = require('superagent');
var cookies = require('browser-cookies');
var Snackbar = require('./Snackbar');
var SubmitButton = require('./SubmitButton');

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
        return (
            <div className='card'>
                <div className='shrink columns'>
                    <Thumbnail
                        type={this.props.type}
                        image={this.props.image}
                        alt={this.props.title}
                        displayWidth={40} />
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
                    <SubmitButton title='Remove' className='button secondary small' submitting={this.state.submitting} onSubmit={this.removeAuthor.bind(null, this.props.id)}/>
                </div>
            </div>
        );
    }
});

module.exports = AuthorCard;
