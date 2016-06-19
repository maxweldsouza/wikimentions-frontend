var React = require('react');
var requests = require('superagent');
var cookies = require('browser-cookies');
var Link = require('./Link');
var Image = require('./Image');
var Placeholder = require('./Placeholder');
var _ = require('underscore');

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

        if (main.type === 'book') {
            icon = 'ion-ios-book';
            description = 'Book';
        } else if (main.type === 'video') {
            icon = 'ion-ios-videocam';
            description = 'Video';
        } else if (main.type === 'person') {
            icon = 'ion-person';
        }

        var image;
        var imagedata = _.find(main.images, function (x) {
            return x.width === 75 && x.height === 75;
        });
        if (imagedata) {
            image = <Image className='img-person' id={main.id} md5={imagedata.md5} width={imagedata.width} height={imagedata.height}/>;
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
                                slug={main.slug}
                                type={main.type}>{main.title}</Link>
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
                            {main.type === 'person' ? <Link
                                id={main.id}
                                slug={main.slug}
                                title={main.title}
                                type={main.type}
                                className='secondary'
                                tab='videos'>{'Videos'}<span className="badge">{main.video_count}</span>{'  '}
                            </Link> : null}
                            {main.type === 'person' ? <Link
                                id={main.id}
                                slug={main.slug}
                                title={main.title}
                                type={main.type}
                                className='secondary'
                                tab='books'>{'Books'}<span className="badge">{main.book_count}</span>{'  '}
                            </Link> : null}
                            <Link
                                id={main.id}
                                slug={main.slug}
                                title={main.title}
                                type={main.type}
                                className='secondary'
                                tab='mentioned'>{'Mentions'}<span className="badge">{main.mentioned_count}</span>{'  '}
                            </Link>
                            <Link
                                id={main.id}
                                slug={main.slug}
                                title={main.title}
                                type={main.type}
                                className='secondary'
                                tab='mentionedby'>{'Mentioned By'}<span className="badge">{main.mentioned_by_count}</span>
                            </Link>
                        </div>
                        {secondary ? <div className='small-12 columns'>
                            {inorby} <strong><Link
                                className='secondary'
                                id={secondary.id}
                                slug={secondary.slug}
                                type={secondary.type}>{secondary.title}</Link></strong>
                        </div> : null}
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = Mention;
