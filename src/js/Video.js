var React = require('react');
var parseUrl = require('url-parse');
var Link = require('./Link');
var Thumbnail = require('./Thumbnail');
import Lazy from 'react-lazyload';

var Video = React.createClass({
    render () {
        var parsed = parseUrl(this.props.url);
        return (
            <div className='card box'>
                <div className='small-12 columns'>
                    <div className='row'>
                        <div className='shrink columns'>
                            <div style={{maxWidth: 150}}>
                                <Link id={this.props.id}
                                    slug={this.props.slug}
                                    type='video'>
                                    <Thumbnail
                                    alt={this.props.title}
                                    type={this.props.type}
                                    url={this.props.url}
                                    displayHeight={90}
                                    displayWidth={120} />
                                </Link>
                            </div>
                        </div>
                        <div className='columns'>
                            <Link
                                id={this.props.id}
                                className='card-title'
                                slug={this.props.slug}
                                type='video'>{this.props.title}</Link>
                            <div>{'[' + parsed.hostname + ']'}</div>
                            <div className='row'>
                                <div className='columns'>
                                    <Link
                                        id={this.props.id}
                                        slug={this.props.slug}
                                        title={this.props.title}
                                        type={this.props.type}
                                        className='secondary card-count'
                                        tab='mentioned'>{'Mentions '}<span className="badge">{this.props.mentioned_count}</span>{'  '}
                                    </Link>
                                    <Link
                                        id={this.props.id}
                                        slug={this.props.slug}
                                        title={this.props.title}
                                        type={this.props.type}
                                        className='secondary card-count'
                                        tab='mentionedby'>{'Mentioned By '}<span className="badge">{this.props.mentioned_by_count}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Video;
