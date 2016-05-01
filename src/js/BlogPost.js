var React = require('react');

var moment = require('moment');
var Markdown = require('./Markdown');
var Share = require('./Share');

var BlogPost = React.createClass({
    render () {
        var added = moment(this.props.added + '+0000');
        added = added.format('MMMM Do YYYY');
        var path = '/blog/' + this.props.slug;
        return (
            <div>
                <a href={path}><h1>{this.props.title}</h1></a>
                <a href={'/users/' + this.props.authorId + '/' + this.props.author}>{this.props.author}</a> on <span>{added}</span>
                <hr/>
                <Markdown markdown={this.props.content}/>
                <hr/>
                <div className='row'>
                    <div className='small-6 columns'>
                        {this.props.prev ? <a href={'/blog/' + this.props.prev} className=''>Previous Post</a> : null}
                    </div>
                    <div className='small-6 columns text-right'>
                        {this.props.next ? <a href={'/blog/' + this.props.next} className=''>Next Post</a> : null}
                        <div className='row'>
                            <div className='small-12 columns'>
                                <Share />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BlogPost;
