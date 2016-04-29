var React = require('react');
var moment = require('moment');
var Link = require('./Link');

var HistoryCard = React.createClass({
    render () {
        var added = this.props.deleted ? <span className="ion-minus-circled"></span> : <span className="ion-plus-circled"></span>;
        var item;
        if (this.props.entry && this.props.entrytype === 'video_author') {
            item = <span>
                <Link
                    id={this.props.entry.source}
                    slug={this.props.entry.source_slug}
                    title={this.props.entry.source_title}
                    type={this.props.entry.source_type}
                    /> as author to video <Link
                    id={this.props.entry.destination}
                    slug={this.props.entry.destination_slug}
                    title={this.props.entry.destination_title}
                    type={this.props.entry.destination_type}
                    />;
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'book_author') {
            item = <span>
                <Link
                    id={this.props.entry.source}
                    slug={this.props.entry.source_slug}
                    title={this.props.entry.source_title}
                    type={this.props.entry.source_type}
                    /> as author to book <Link
                    id={this.props.entry.destination}
                    slug={this.props.entry.destination_slug}
                    title={this.props.entry.destination_title}
                    type={this.props.entry.destination_type}
                    />
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'prop') {
            item = <span>
                set {this.props.entry.key} to {this.props.entry.value}
            </span>;
        } else if (this.props.entry && this.props.entrytype === 'mention') {
            item = <span>
                <Link
                    id={this.props.entry.mentioned_by}
                    slug={this.props.entry.mentioned_by_slug}
                    title={this.props.entry.mentioned_by_title}
                    type={this.props.entry.mentioned_by_type}
                    /> mentioned <Link
                    id={this.props.entry.mentioned}
                    slug={this.props.entry.mentioned_slug}
                    title={this.props.entry.mentioned_title}
                    type={this.props.entry.mentioned_type}
                    /> in <Link
                    id={this.props.entry.mentioned_in}
                    slug={this.props.entry.mentioned_in_slug}
                    title={this.props.entry.mentioned_in_title}
                    type={this.props.entry.mentioned_in_type}
                    />
            </span>;
        }
        return (
            <div className='card'>
                    <span className='small-8 columns'>
                        <a className='history-user'href={'/users/' + this.props.user + '/' + this.props.username}>{this.props.username}</a>
                    </span>
                    <span className='history-timestamp small-4 columns text-right'>{moment(this.props.timestamp).fromNow()}</span>
                    <span className='small-12 columns'>
                        <span className='history-added'>{added}</span> {item}
                    </span>
            </div>
        );
    }
});

module.exports = HistoryCard;
