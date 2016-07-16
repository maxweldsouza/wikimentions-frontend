var React = require('react');
var Link = require('./Link');
var Time = require('./Time');
var Markdown = require('./Markdown');

var HistoryCard = React.createClass({
    render () {
        var added = this.props.deleted === 1 ? 'Deleted' : 'Added';
        var item;
        if (this.props.entry && this.props.entrytype === 'video_author') {
            item = <span className='row'>
                <span className='small-12 columns'>
                    {added} Author
                </span>
                <span className='small-12 columns'>
                    <strong>Author:</strong> <Link
                        id={this.props.entry.source.id}
                        slug={this.props.entry.source.props.slug}
                        type={this.props.entry.source.props.type}>
                        {this.props.entry.source.props.title}
                    </Link>
                </span>
                <span className='small-12 columns'>
                    <strong>Video:</strong> <Link
                        id={this.props.entry.destination.id}
                        slug={this.props.entry.destination.props.slug}
                        type={this.props.entry.destination.props.type}>
                        {this.props.entry.destination.props.title}
                    </Link>
                </span>
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'book_author') {
            item = <span className='row'>
                <span className='small-12 columns'>
                    {added} Author
                </span>
                <span className='small-12 columns'>
                    <strong>Book:</strong> <Link
                        id={this.props.entry.source.id}
                        slug={this.props.entry.source.props.slug}
                        type={this.props.entry.source.props.type}>{this.props.entry.source.props.title}
                    </Link>
                </span>
                <span className='small-12 columns'>
                    <strong>Author:</strong> <Link
                        id={this.props.entry.destination.id}
                        slug={this.props.entry.destination.props.slug}
                        type={this.props.entry.destination.props.type}>
                        {this.props.entry.destination.props.title}
                    </Link>
                </span>
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'prop') {
            item = <span className='row'>
                <span className='small-12 columns'>
                    {added} Property
                </span>
                <span className='small-12 columns'>
                    <strong>Page:</strong> <Link
                        id={this.props.entry.obj.id}
                        slug={this.props.entry.obj.props.slug}
                        type={this.props.entry.obj.props.type}>{this.props.entry.obj.props.title}
                    </Link>
                </span>
                <span className='small-12 columns'>
                    <strong>Name:</strong> {this.props.entry.key}
                </span>
                <span className='small-12 columns'>
                    <strong>Value:</strong> {this.props.entry.value}
                </span>
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'mention') {
            item = <span className='row'>
                <span className='small-12 columns'>
                    {added} Mention
                </span>
                <span className='small-12 columns'>
                    <strong>Mentioned by:</strong> <Link
                        id={this.props.entry.mentioned_by.id}
                        slug={this.props.entry.mentioned_by.props.slug}
                        type={this.props.entry.mentioned_by.props.type}>
                        {this.props.entry.mentioned_by.props.title}
                    </Link>
                </span>
                <span className='small-12 columns'>
                    <strong>Mentioned:</strong> <Link
                        id={this.props.entry.mentioned.id}
                        slug={this.props.entry.mentioned.props.slug}
                        type={this.props.entry.mentioned.props.type}>
                        {this.props.entry.mentioned.props.title}
                    </Link>
                </span>
                <span className='small-12 columns'>
                    <strong>Mentioned In</strong> <Link
                        id={this.props.entry.mentioned_in.id}
                        slug={this.props.entry.mentioned_in.props.slug}
                        type={this.props.entry.mentioned_in.props.type}>
                        {this.props.entry.mentioned_in.props.title}
                    </Link>
                </span>
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'image') {
            item = <span className='row'>
                <span className='small-12 columns'>
                    {added} Image to page <Link
                        id={this.props.entry.id}
                        slug={this.props.entry.slug}
                        type={this.props.entry.type}>
                            {this.props.entry.title}
                    </Link>
                </span>
                <span className='shrink columns'>
                    <img src={'/api/v1/static/images/' + this.props.entry.thumb_md5 + '-' + this.props.entry.thumb_width + '-' + this.props.entry.thumb_height + '.jpg'} />
                </span>
                <span className='columns'>
                    <strong>Description:</strong> <Markdown markdown={this.props.entry.description} />
                </span>
            </span>;
        }
        return (
            <div className='card'>
                <span className='small-8 columns'>
                    <a href={'/users/' + this.props.user + '/' + this.props.username}>{this.props.username}</a>
                </span>
                <span className='small-4 columns text-right'><Time timestamp={this.props.timestamp} type='ago'/></span>
                <span className='small-12 columns'>
                    {item}
                </span>
            </div>
        );
    }
});

module.exports = HistoryCard;
