var React = require('react');
var Link = require('./Link');
var Time = require('./Time');
var Markdown = require('./Markdown');

var HistoryItem = React.createClass({
    render () {
        var added = this.props.deleted === 1 ? 'deleted by' : 'added by';
        var item;
        var type;
        if (this.props.entry && this.props.entrytype === 'video_author') {
            type = 'Author';
            item = <span className='row'>
                <span className='small-12 columns'>
                    Author: <Link
                        id={this.props.entry.source.id}
                        slug={this.props.entry.source.props.slug}
                        type={this.props.entry.source.props.type}>
                        {this.props.entry.source.props.title}
                    </Link>
                </span>
                <span className='small-12 columns'>
                    Video: <Link
                        id={this.props.entry.destination.id}
                        slug={this.props.entry.destination.props.slug}
                        type={this.props.entry.destination.props.type}>
                        {this.props.entry.destination.props.title}
                    </Link>
                </span>
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'book_author') {
            type = 'Author';
            item = <span className='row'>
                <span className='small-12 columns'>
                    Book: <Link
                        id={this.props.entry.destination.id}
                        slug={this.props.entry.destination.props.slug}
                        type={this.props.entry.destination.props.type}>
                        {this.props.entry.destination.props.title}
                    </Link>
                </span>
                <span className='small-12 columns'>
                    Author: <Link
                        id={this.props.entry.source.id}
                        slug={this.props.entry.source.props.slug}
                        type={this.props.entry.source.props.type}>{this.props.entry.source.props.title}
                    </Link>
                </span>
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'prop') {
            type = 'Property';
            item = <span className='row'>
                <span className='small-12 columns'>
                    Page: <Link
                        id={this.props.entry.obj.id}
                        slug={this.props.entry.obj.props.slug}
                        type={this.props.entry.obj.props.type}>{this.props.entry.obj.props.title}
                    </Link>
                </span>
                <span className='small-12 columns'>
                    {this.props.entry.key}: {this.props.entry.value}
                </span>
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'mention') {
            type = 'Mention';
            item = <span className='row'>
                <span className='small-12 columns'>
                    Mentioned by: <Link
                        id={this.props.entry.mentioned_by.id}
                        slug={this.props.entry.mentioned_by.props.slug}
                        type={this.props.entry.mentioned_by.props.type}>
                        {this.props.entry.mentioned_by.props.title}
                    </Link>
                </span>
                <span className='small-12 columns'>
                    Mentioned: <Link
                        id={this.props.entry.mentioned.id}
                        slug={this.props.entry.mentioned.props.slug}
                        type={this.props.entry.mentioned.props.type}>
                        {this.props.entry.mentioned.props.title}
                    </Link>
                </span>
                {this.props.entry.mentioned_in ? <span className='small-12 columns'>
                    Mentioned In: <Link
                        id={this.props.entry.mentioned_in.id}
                        slug={this.props.entry.mentioned_in.props.slug}
                        type={this.props.entry.mentioned_in.props.type}>
                        {this.props.entry.mentioned_in.props.title}
                    </Link>
                </span> : null}
                {this.props.entry.reference ? <span className='small-12 columns'>
                    Reference: <a
                        className='secondary'
                        style={{fontWeight: 'bold'}} href={this.props.entry.reference}>
                            {this.props.entry.reference}
                    </a>
                </span> : null}
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'image') {
            type = 'Image';
            item = <span className='row'>
                <span className='small-12 columns'>
                    <Link
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
        } else if (this.props.entry && this.props.entrytype === 'tag') {
            type = 'Tag';
            item = <span className='row'>
                <span className='small-12 columns'>
                    Page: <Link
                        id={this.props.entry.obj.id}
                        slug={this.props.entry.obj.props.slug}
                        type={this.props.entry.obj.props.type}>{this.props.entry.obj.props.title}
                    </Link>
                </span>
                <span className='small-12 columns'>
                    Tag: {this.props.entry.tag}
                </span>
            </span>;
        }
        return (
            <div className='small-12 columns'>
                <div className='row'>
                    <span className='small-8 columns'>
                        <strong style={{fontSize: 17}}>{type}</strong> {added} <strong>
                            {this.props.username ? <a className='' rel='nofollow' href={'/users/' + this.props.user + '/' + this.props.username}>{this.props.username}</a> : this.props.ip}
                        </strong>
                    </span>
                    <span className='small-4 columns text-right'><Time timestamp={this.props.timestamp} type='ago' hintDirection='bottom-left'/></span>
                    <span className='small-12 columns'>
                        {item}
                    </span>
                </div>
                <hr/>
            </div>
        );
    }
});

module.exports = HistoryItem;
