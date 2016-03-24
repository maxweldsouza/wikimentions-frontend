var React = require('react');
var Mention = require('./Mention');

var ThingMentionTab = React.createClass({
    render () {
        var mentions = this.props.mentions;
        var nodata = <div className="small-12 columns">
            <p>No mentions have been added yet. You can help us by adding some.</p>
        </div>;
        return (
            <div className='row'>
                <div className='small-12 columns'>
                    {mentions.map((x) => {
                        return <Mention
                            mention_id={x.mention_id}
                            id={x.id}
                            slug={x.slug}
                            title={x.title}
                            description={x.props.description}
                            quote={x.quote}
                            references={x.references}
                            books={x.books}
                            type={x.type}
                            />;
                    })}
                </div>
                {mentions.length === 0 ? nodata : null}
                <div className='small-12 columns'>
                    <a href={'/mentions/' + this.props.id} className='button'>Add</a>
                </div>
            </div>
        );
    }
});

module.exports = ThingMentionTab;
