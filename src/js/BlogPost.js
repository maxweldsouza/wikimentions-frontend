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
                        <span>
                            <a href={'http://www.facebook.com/sharer/sharer.php?u=https://comparnion.com' + path + '&title=' + this.props.title}><i className='ion-social-facebook'></i></a>
                            <a href={'http://twitter.com/intent/tweet?status=' + this.props.title + '+' + 'https://comparnion.com' + path}><i className='ion-social-twitter'></i></a>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BlogPost;
