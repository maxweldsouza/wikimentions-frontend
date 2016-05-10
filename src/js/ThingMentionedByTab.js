var React = require('react');
var Mention = require('./Mention');
var AddMention = require('./AddMention');
var PreviousNext = require('./PreviousNext');

var ThingMentionTab = React.createClass({
    render () {
        var mentionedby = this.props.mentionedby;
        var nodata = <div className="card">
            <div className='small-12 columns'>
            No mentions have been added yet. You can help us by adding some.
            </div>
        </div>;
        return (
            <div className='card-container'>
                {mentionedby.map((x) => {
                    return <Mention
                        id={x.id}
                        key={x.id}
                        mention_id={x.mention_id}
                        slug={x.slug}
                        title={x.title}
                        description={x.props.description}
                        quote={x.quote}
                        references={x.references}
                        books={x.books}
                        type={x.type}
                        />;
                })}
                {mentionedby.length === 0 ? nodata : null}
                <PreviousNext path={this.props.path} page={this.props.page}/>
                <div className='card'>
                    <AddMention id={this.props.id} mentioned={this.props.id}/>
                </div>
            </div>
        );
    }
});

module.exports = ThingMentionTab;
