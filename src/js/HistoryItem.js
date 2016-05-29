var React = require('react');
var Link = require('./Link');
var Time = require('./Time');

var HistoryCard = React.createClass({
    render () {
        var added = this.props.deleted === 1 ? <span className="ion-minus-circled"></span> : <span className="ion-plus-circled"></span>;
        var item;
        if (this.props.entry && this.props.entrytype === 'video_author') {
            item = <span>
                <Link
                    id={this.props.entry.source}
                    slug={this.props.entry.source_slug}
                    type={this.props.entry.source_type}>
                    {this.props.entry.source_title}
                </Link> as author to video <Link
                    id={this.props.entry.destination}
                    slug={this.props.entry.destination_slug}
                    type={this.props.entry.destination_type}>
                    {this.props.entry.destination_title}
                </Link>;
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'book_author') {
            item = <span>
                <Link
                    id={this.props.entry.source}
                    slug={this.props.entry.source_slug}
                    type={this.props.entry.source_type}>{this.props.entry.source_title}
                </Link> as author to book <Link
                    id={this.props.entry.destination}
                    slug={this.props.entry.destination_slug}
                    type={this.props.entry.destination_type}>
                    {this.props.entry.destination_title}
                </Link>
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'prop') {
            item = <span>
                set {this.props.entry.key} to {this.props.entry.value} for <Link
                    id={this.props.entry.id}
                    slug={this.props.entry.slug}
                    title={this.props.entry.title}
                    type={this.props.entry.type}
                    />
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'mention') {
            item = <span>
                <Link
                    id={this.props.entry.mentioned_by}
                    slug={this.props.entry.mentioned_by_slug}
                    type={this.props.entry.mentioned_by_type}>
                    {this.props.entry.mentioned_by_title}
                </Link> mentioned <Link
                    id={this.props.entry.mentioned}
                    slug={this.props.entry.mentioned_slug}
                    type={this.props.entry.mentioned_type}>
                    {this.props.entry.mentioned_title}
                </Link> in <Link
                    id={this.props.entry.mentioned_in}
                    slug={this.props.entry.mentioned_in_slug}
                    type={this.props.entry.mentioned_in_type}>
                    {this.props.entry.mentioned_in_title}
                </Link>
            </span>;
        }
        return (
            <div className='card'>
                    <span className='small-8 columns'>
                        <a href={'/users/' + this.props.user + '/' + this.props.username}>{this.props.username}</a>
                    </span>
                    <span className='small-4 columns text-right'><Time timestamp={this.props.timestamp} type='ago'/></span>
                    <span className='small-12 columns'>
                        <span>{added}</span> {item}
                    </span>
            </div>
        );
    }
});

module.exports = HistoryCard;
