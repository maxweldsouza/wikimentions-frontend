var React = require('react');

var Link = require('./Link');
var Thumbnail = require('./Thumbnail');
import Lazy from 'react-lazyload';

var Person = React.createClass({
    render () {
        return (
            <div className='card box'>
                <div className='small-12 columns'>
                    <div className='row'>
                        <div className='shrink columns'>
                            <Link id={this.props.id}
                                slug={this.props.slug}
                                type='person'>
                                <Thumbnail
                                    alt={this.props.title}
                                    type={this.props.type}
                                    image={this.props.image}
                                    shadow={true}
                                    displayWidth={75} />
                            </Link>
                        </div>
                        <div className='columns'>
                            <Link
                                id={this.props.id}
                                className='card-title'
                                slug={this.props.slug}
                                type='person'>{this.props.title}</Link>
                            <div>{this.props.description}</div>
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

module.exports = Person;
