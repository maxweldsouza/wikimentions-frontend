var React = require('react');
var Mention = require('./Mention');
var AddMention = require('./AddMention');
var Pagination = require('./Pagination');

var ThingMentionTab = React.createClass({
    render () {
        var mentionedby = this.props.mentionedby;
        var nodata = <div className='card box'>
            <div className='small-12 columns'>
            No mentions have been added yet. You can help us by adding some.
            </div>
        </div>;
        return (
            <div className='card-container'>
                {mentionedby.map((x) => {
                    return <Mention
                        key={x.mention_id}
                        mention_id={x.mention_id}
                        quote={x.quote}
                        references={x.references}
                        mentioned={x.mentioned}
                        mentioned_in={x.mentioned_in}
                        mentioned_by={x.mentioned_by}
                        type={this.props.type}
                        />;
                })}
                {mentionedby.length === 0 ? nodata : null}
                <Pagination count={this.props.count} path={this.props.path} page={this.props.page}/>
                <div className='card box'>
                    <AddMention id={this.props.id} mentioned={this.props.id}/>
                </div>
            </div>
        );
    }
});

module.exports = ThingMentionTab;
