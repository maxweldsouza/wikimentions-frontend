var React = require('react');
var Link = require('./Link');

var HomeItem = React.createClass({
    render () {
        return (
            <div className='card'>
                <span className='small-12 columns card-title'>
                    <Link
                        id={this.props.id}
                        slug={this.props.slug}
                        type={this.props.type}>{this.props.title}</Link>
                </span>
                <div className='small-12 columns'>
                    {this.props.type === 'person' ? <Link
                        id={this.props.id}
                        slug={this.props.slug}
                        title={this.props.title}
                        type={this.props.type}
                        className='secondary'
                        tab='books'>{'Books'}<span className="badge">{this.props.book_count}</span>{'  '}
                    </Link> : null}
                    {this.props.type === 'person' ?<Link
                        id={this.props.id}
                        slug={this.props.slug}
                        title={this.props.title}
                        type={this.props.type}
                        className='secondary'
                        tab='videos'>{'Videos'}<span className="badge">{this.props.video_count}</span>{'  '}
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
        );
    }
});

module.exports = HomeItem;
