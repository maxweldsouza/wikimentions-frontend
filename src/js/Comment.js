import React from 'react';
import Markdown from './Markdown';
import Time from './Time';

class Comment extends React.Component {
    render () {
        return (
            <div className='small-12 columns'>
                <div className='row'>
                    <div className='small-6 columns'>
                        <strong><a rel='nofollow' href={`/users/${this.props.user}/${this.props.name}`}>{this.props.name}</a></strong>
                    </div>
                    <div className='small-6 columns text-right discuss-updated'><Time timestamp={this.props.posted} type='ago' hintDirection='bottom-left'/></div>
                    <div className='small-12 columns'>
                        <Markdown
                            markdown={this.props.text}
                            />
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default Comment;
