var React = require('react');
var requests = require('superagent');
var cookies = require('browser-cookies');
var Link = require('./Link');
var Image = require('./Image');
var Placeholder = require('./Placeholder');
var _ = require('lodash');
var Snackbar = require('./Snackbar');

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
                Snackbar({message: 'Delete failed'});
            } else {
                Snackbar({message: 'Mention deleted'});
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    render () {
        var icon;
        var description;

        var main, secondary;
        var inorby;
        if (this.props.type === 'person') {
            if (this.props.mentioned) {
                main = this.props.mentioned;
            } else {
                main = this.props.mentioned_by;
            }
            secondary = this.props.mentioned_in;
            inorby = 'In ';
        } else {
            if (this.props.mentioned) {
                main = this.props.mentioned;
                secondary = this.props.mentioned_by;
                inorby = 'By ';
            } else {
                main = this.props.mentioned_by;
                secondary = this.props.mentioned_in;
                inorby = 'In ';
            }
        }
        description = main.props && main.props.description ? main.props.description : '';

        if (main.props.type === 'book') {
            icon = 'ion-ios-book';
            description = 'Book';
        } else if (main.props.type === 'video') {
            icon = 'ion-ios-videocam';
            description = 'Video';
        } else if (main.props.type === 'person') {
            icon = 'ion-person';
        }

        var image = main.image;
        if (image) {
            image = <Image className='img' id={main.id} md5={image.thumb_md5} width={image.thumb_width} height={image.thumb_height}/>;
        } else {
            image = <Placeholder style={{'width': 75, 'height': 75, 'border': 'none', 'lineHeight': '75px'}}/>;
        }
        return (
            <div className='card'>
                <div className='shrink columns'>
                    {image}
                </div>
                <div className='columns'>
                    <div className='row'>
                        <div className='small-12 columns card-title'>
                            <Link
                                id={main.id}
                                slug={main.props.slug}
                                type={main.props.type}>{main.props.title}</Link>
                        </div>
                        <div className='small-12 columns'>
                            <span>
                                <span className={icon}/>{' '}
                            </span>{description}
                        </div>
                        <div className='small-12 columns'>
                            {this.props.quote}
                        </div>
                        <div className='small-12 columns'>
                            {main.props.type === 'person' ? <Link
                                id={main.id}
                                slug={main.props.slug}
                                title={main.props.title}
                                type={main.props.type}
                                className='secondary'
                                tab='videos'>{'Videos'}<span className="badge">{main.video_count}</span>{'  '}
                            </Link> : null}
                            {main.props.type === 'person' ? <Link
                                id={main.id}
                                slug={main.props.slug}
                                title={main.props.title}
                                type={main.props.type}
                                className='secondary'
                                tab='books'>{'Books'}<span className="badge">{main.book_count}</span>{'  '}
                            </Link> : null}
                            <Link
                                id={main.id}
                                slug={main.props.slug}
                                title={main.props.title}
                                type={main.props.type}
                                className='secondary'
                                tab='mentioned'>{'Mentions'}<span className="badge">{main.mentioned_count}</span>{'  '}
                            </Link>
                            <Link
                                id={main.id}
                                slug={main.props.slug}
                                title={main.props.title}
                                type={main.props.type}
                                className='secondary'
                                tab='mentionedby'>{'Mentioned By'}<span className="badge">{main.mentioned_by_count}</span>
                            </Link>
                        </div>
                        {secondary ? <div className='small-12 columns'>
                            {inorby} <strong><Link
                                className='secondary'
                                id={secondary.id}
                                slug={secondary.props.slug}
                                type={secondary.props.type}>{secondary.props.title}</Link></strong>
                        </div> : null}
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = Mention;
