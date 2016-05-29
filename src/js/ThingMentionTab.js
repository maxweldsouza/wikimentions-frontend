var React = require('react');
var Mention = require('./Mention');
var AddMention = require('./AddMention');
var Pagination = require('./Pagination');

var ThingMentionTab = React.createClass({
    render () {
        var mentions = this.props.mentions;
        var nodata = <div className='card'>
            <div className='small-12 columns'>
            No mentions have been added yet. You can help us by adding some.
            </div>
        </div>;
        var addmention;
        if (this.props.type === 'person') {
            addmention = <AddMention id={this.props.id} mentioned_by={this.props.id}/>;
        } else {
            addmention = <AddMention id={this.props.id} mentioned_in={this.props.id}/>;
        }
        return (
            <div className='card-container'>
                {mentions.map((x) => {
                    return <Mention
                        id={x.id}
                        key={x.id}
                        mention_id={x.mention_id}
                        slug={x.slug}
                        title={x.title}
                        description={x.props.description}
                        quote={x.quote}
                        references={x.references}
                        book_count={x.book_count}
                        video_count={x.video_count}
                        mentioned_count={x.mentioned_count}
                        mentioned_by_count={x.mentioned_by_count}
                        type={x.type}
                        />;
                })}
                {mentions.length === 0 ? nodata : null}
                <Pagination count={this.props.count} path={this.props.path} page={this.props.page}/>
                <div className='card'>
                    {addmention}
                </div>
            </div>
        );
    }
});

module.exports = ThingMentionTab;
