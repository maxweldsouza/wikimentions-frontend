var React = require('react');
var moment = require('moment');

var HistoryCard = React.createClass({
    render () {
        var added = this.props.deleted ? <span className="ion-minus-circled"></span> : <span className="ion-plus-circled"></span>;
        var item;
        if (this.props.entry && this.props.entry.type === 'video_author') {
            item = <span>
                <a href={'/pages/' + this.props.entry.source + '/'  + this.props.entry.source_slug}>{this.props.entry.source_title}</a> as author to video <a href={'/videos/' + this.props.entry.destination + '/'  + this.props.entry.destination_slug}>{this.props.entry.destination_title}</a>
            </span>;
        } else if (this.props.entry && this.props.entry.type === 'book_author') {
            item = <span>
                <a href={'/pages/' + this.props.entry.source + '/'  + this.props.entry.source_slug}>{this.props.entry.source_title}</a> as author to book <a href={'/books/' + this.props.entry.destination + '/'  + this.props.entry.destination_slug}>{this.props.entry.destination_title}</a>
            </span>;
        }
        return (
            <div className='history-item small-12-columns'>
                <div className='row'>
                    <span className='small-8 columns'>
                        <a className='history-user'href={'/users/' + this.props.user + '/' + this.props.username}>{this.props.username}</a>
                    </span>
                    <span className='history-timestamp small-4 columns text-right'>{moment(this.props.timestamp).fromNow()}</span>
                    <span className='small-12 columns'>
                        <span className='history-added'>{added}</span> {item}
                    </span>
                </div>
            </div>
        );
    }
});

module.exports = HistoryCard;
