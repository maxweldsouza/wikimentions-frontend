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
            var name = this.props.entry.md5 + '-' + this.props.entry.width + '-' + this.props.entry.height + '.jpg';
            item = <span>
                <a href={'/api/v1/static/images/' + name} target='_blank'>{name}</a> <Markdown markdown={this.props.entry.description} />
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
