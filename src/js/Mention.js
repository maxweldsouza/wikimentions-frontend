var React = require('react');
var requests = require('superagent');
var cookies = require('browser-cookies');
var Link = require('./Link');

var Mention = React.createClass({
    removeMention () {
        requests
        .post('/api/v1/mentions')
        .type('form')
        .send({
            action: 'delete',
            mention_id: this.props.mention_id,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submiting: false
            });
            if (err && err.status) {
                this.setState({
                    error: true,
                    message: res.body.message
                });
            } else {
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    render () {
        var path;
        var icon;
        var description;
        if (this.props.type === 'book') {
            path = '/books/' + this.props.id + '/' + this.props.slug;
            icon = 'ion-ios-book';
            description = 'Book';
        } else if (this.props.type === 'video') {
            path = '/videos/' + this.props.id + '/' + this.props.slug;
            icon = 'ion-ios-videocam';
            description = 'Video';
        } else if (this.props.type === 'person') {
            path = '/people/' + this.props.id + '/' + this.props.slug;
            icon = 'ion-person';
            description = this.props.description;
        }
        var referencesCount;
        if (this.props.references) {
            referencesCount = this.props.references.split(/\r\n|\r|\n/).length;
        } else {
            referencesCount = 0;
        }
        return (
            <div className='card'>
                <div className='small-12 columns card-title'>
                    <a href={path}>{this.props.title}</a>
                </div>
                <div className='small-12 columns'>
                    <span>
                        <span className={icon}/>{' '}
                    </span>{description}
                </div>
                <div className='small-12 columns'>
                    {this.props.quote}
                </div>
                <div className='small-9 columns'>
                    {this.props.type === 'person' ? <Link
                        id={this.props.id}
                        slug={this.props.slug}
                        title={this.props.title}
                        type={this.props.type}
                        className='secondary'
                        tab='videos'>{'Videos'}<span className="badge">{this.props.video_count}</span>{'  '}
                    </Link> : null}
                    {this.props.type === 'person' ? <Link
                        id={this.props.id}
                        slug={this.props.slug}
                        title={this.props.title}
                        type={this.props.type}
                        className='secondary'
                        tab='books'>{'Books'}<span className="badge">{this.props.book_count}</span>{'  '}
                    </Link> : null}
                    <Link
                        id={this.props.id}
                        slug={this.props.slug}
                        title={this.props.title}
                        type={this.props.type}
                        className='secondary'
                        tab='mentioned'>{'Mentions'}<span className="badge">{this.props.mentioned_count}</span>{'  '}
                    </Link>
                    <Link
                        id={this.props.id}
                        slug={this.props.slug}
                        title={this.props.title}
                        type={this.props.type}
                        className='secondary'
                        tab='mentionedby'>{'Mentioned By'}<span className="badge">{this.props.mentioned_by_count}</span>
                    </Link>
                </div>
                <div className="small-3 columns text-right">
                    <span>
                        <a className='secondary' onClick={this.removeMention}>Remove</a>
                    </span>
                </div>
            </div>
        );
    }
});


module.exports = Mention;
