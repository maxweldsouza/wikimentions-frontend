import React from 'react';
import Mention from './Mention';
import AddMention from './AddMention';
import Pagination from './Pagination';

const ThingMentionTab = (
    { mentionedby, page = '1', count, path, id, type, loggedin }
) => {
    const nodata = (
        <div className="card box">
            <div className="blankslate">
                <span className="icon ion-at" />
                <h3>No mentions</h3>
                No mentions have been added yet. You can help us by adding some.
            </div>
        </div>
    );
    const nomore = (
        <div className="card box">
            <div className="blankslate">
                <span className="icon ion-at" />
                <h3>End of items</h3>
                There are no more mentions to show.
            </div>
        </div>
    );
    return (
        <div className="card-container">
            {mentionedby.map(x => {
                return (
                    <Mention
                        key={x.mention_id}
                        mention_id={x.mention_id}
                        quote={x.quote}
                        reference={x.reference}
                        mentioned={x.mentioned}
                        mentioned_in={x.mentioned_in}
                        mentioned_by={x.mentioned_by}
                        type={type}
                    />
                );
            })}
            {page === '1' && mentionedby.length === 0 ? nodata : null}
            {page !== '1' && mentionedby.length === 0 ? nomore : null}
            <Pagination total={count} path={path} page={page} />
            <div className="card box">
                <AddMention
                    id={id}
                    mentioned={id}
                    type={type}
                    loggedin={loggedin}
                />
            </div>
        </div>
    );
};

export default ThingMentionTab;
