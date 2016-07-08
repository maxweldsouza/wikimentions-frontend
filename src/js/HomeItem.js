var React = require('react');
var Link = require('./Link');
var Image = require('./Image');
var Placeholder = require('./Placeholder');
var _ = require('lodash');

var HomeItem = React.createClass({
    render () {
        var image = this.props.image;
        if (image) {
            image = <Image className='img' id={this.props.id} md5={image.thumb_md5} width={image.thumb_width} height={image.thumb_height} displayWidth={75}/>;
        } else {
            image = <Placeholder style={{'width': 75, 'height': 75, 'border': 'none', 'lineHeight': '75px'}}/>;
        }
        return (
            <div className='card align-middle'>
                <div className='shrink columns'>
                    {image}
                </div>
                <div className='columns'>
                    <div className='row'>
                        <span className='small-12 columns card-title'>
                            <Link
                                id={this.props.id}
                                slug={this.props.slug}
                                type={this.props.type}>{this.props.title}</Link>
                        </span>
                        <span className='small-12 columns'>
                            {this.props.description}
                        </span>
                        <div className='small-12 columns'>
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
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = HomeItem;
