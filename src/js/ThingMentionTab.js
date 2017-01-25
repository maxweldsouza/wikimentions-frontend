import React from 'react';
import Mention from './Mention';
import AddMention from './AddMention';
import Pagination from './Pagination';
import autoBind from 'react-autobind';

class ThingMentionTab extends React.Component {
    static get defaultProps () {
        return {
            page: '1'
        };
    }
    render () {
        const mentions = this.props.mentions;
        const nodata = <div className='card box'>
            <div className='blankslate'>
                <span className='icon ion-at'/>
                <h3>No mentions</h3>
                No mentions have been added yet. You can help us by adding some.
            </div>
        </div>;
        const nomore = <div className='card box'>
            <div className='blankslate'>
                <span className='icon ion-at'/>
                <h3>End of items</h3>
                There are no more mentions to show.
            </div>
        </div>;
        let addmention;
        if (this.props.type === 'person') {
            addmention = <AddMention id={this.props.id} type={this.props.type} mentioned_by={this.props.id} loggedin={this.props.loggedin}/>;
        } else {
            addmention = <AddMention id={this.props.id} type={this.props.type} mentioned_in={this.props.id} loggedin={this.props.loggedin}/>;
        }
        return (
            <div className='card-container'>
                {mentions.map((x) => {
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
                {this.props.page === '1' && mentions.length === 0 ? nodata : null}
                {this.props.page !== '1' && mentions.length === 0 ? nomore : null}
                <Pagination total={this.props.count} path={this.props.path} page={this.props.page}/>
                <div className='card box'>
                    {addmention}
                </div>
            </div>
        );
    }
}

export default ThingMentionTab;
