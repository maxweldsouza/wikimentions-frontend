var React = require('react');
var requests = require('superagent');
var cookies = require('browser-cookies');
var Link = require('./Link');
var Thumbnail = require('./Thumbnail');
var _ = require('underscore');
var Snackbar = require('./Snackbar');
var Dropdown = require('./Dropdown');

var Mention = React.createClass({
    getInitialState () {
        return {
            dropdownIsOpen: false
        };
    },
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
    openDropdown () {
        this.setState({
            dropdownIsOpen: true
        });
    },
    closeDropdown () {
        this.setState({
            dropdownIsOpen: false
        });
    },
    render () {
        var icon, secondaryIcon;
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

        if (secondary && 'props' in secondary && 'type' in secondary.props) {
            if (secondary.props.type === 'book') {
                secondaryIcon = 'ion-ios-book';
            } else if (secondary.props.type === 'video') {
                secondaryIcon = 'ion-ios-videocam';
            } else if (secondary.props.type === 'person') {
                secondaryIcon = 'ion-person';
            }
        }

        if (main.props.type === 'book') {
            icon = 'ion-ios-book';
            description = 'Book';
        } else if (main.props.type === 'video') {
            icon = 'ion-ios-videocam';
            description = 'Video';
        } else if (main.props.type === 'person') {
            icon = 'ion-person';
        }

        return (
            <div className='card'>
                <span className='ion-chevron-down card-chevron' onClick={this.openDropdown}/>
                <Dropdown isOpen={this.state.dropdownIsOpen} onClose={this.closeDropdown}>
                    <div className='dropdown-pane bottom-right small'>
                        <ul className="dropdown menu vertical">
                            <li><a className='secondary' onClick={this.removeMention}>Remove</a></li>
                        </ul>
                    </div>
                </Dropdown>
                <div className='shrink columns'>
                    <Thumbnail
                        alt={main.props.title}
                        type={main.props.type}
                        image={main.image}
                        url={main.props.url}
                        displayWidth={75} />
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
                                className='secondary card-count'
                                tab='videos'>{'Videos '}<span className="badge">{main.video_count}</span>{'  '}
                            </Link> : null}
                            {main.props.type === 'person' ? <Link
                                id={main.id}
                                slug={main.props.slug}
                                title={main.props.title}
                                type={main.props.type}
                                className='secondary card-count'
                                tab='books'>{'Books '}<span className="badge">{main.book_count}</span>{'  '}
                            </Link> : null}
                            <Link
                                id={main.id}
                                slug={main.props.slug}
                                title={main.props.title}
                                type={main.props.type}
                                className='secondary card-count'
                                tab='mentioned'>{'Mentions '}<span className="badge">{main.mentioned_count}</span>{'  '}
                            </Link>
                            <Link
                                id={main.id}
                                slug={main.props.slug}
                                title={main.props.title}
                                type={main.props.type}
                                className='secondary card-count'
                                tab='mentionedby'>{'Mentioned By '}<span className="badge">{main.mentioned_by_count}</span>
                            </Link>
                        </div>
                        {secondary ? <div className='small-12 columns'>
                            {inorby} <span className={secondaryIcon}/> <strong><Link
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
