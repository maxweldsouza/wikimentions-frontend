var React = require('react');
var Mention = require('./Mention');
var AddMention = require('./AddMention');
var Pagination = require('./Pagination');

var ThingMentionTab = React.createClass({
    getDefaultProps () {
        return {
            page: '1'
        };
    },
    render () {
        var mentionedby = this.props.mentionedby;
        var nodata = <div className='card box'>
            <div className='blankslate'>
                <span className='icon ion-at'/>
                <h3>No mentions</h3>
                No mentions have been added yet. You can help us by adding some.
            </div>
        </div>;
        var nomore = <div className='card box'>
            <div className='blankslate'>
                <span className='icon ion-at'/>
                <h3>End of items</h3>
                There are no more mentions to show.
            </div>
        </div>;
        return (
            <div className='card-container'>
                {mentionedby.map((x) => {
                    return <Mention
                        key={x.mention_id}
                        mention_id={x.mention_id}
                        quote={x.quote}
                        reference={x.reference}
                        mentioned={x.mentioned}
                        mentioned_in={x.mentioned_in}
                        mentioned_by={x.mentioned_by}
                        type={this.props.type}
                        />;
                })}
                {this.props.page === '1' && mentionedby.length === 0 ? nodata : null}
                {this.props.page !== '1' && mentionedby.length === 0 ? nomore : null}
                <Pagination total={this.props.count} path={this.props.path} page={this.props.page}/>
                <div className='card box'>
                    <AddMention
                    id={this.props.id}
                    mentioned={this.props.id}
                    type={this.props.type}
                    loggedin={this.props.loggedin}/>
                </div>
            </div>
        );
    }
});

module.exports = ThingMentionTab;
