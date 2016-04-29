var React = require('react');
var Mention = require('./Mention');
var AddMention = require('./AddMention');

var ThingMentionTab = React.createClass({
    render () {
        var mentions = this.props.mentions;
        var nodata = <div className="card">
            <p>No mentions have been added yet. You can help us by adding some.</p>
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
                            books={x.books}
                            type={x.type}
                            />;
                    })}
                {mentions.length === 0 ? nodata : null}
                <div className='card'>
                    {addmention}
                </div>
            </div>
        );
    }
});

module.exports = ThingMentionTab;
