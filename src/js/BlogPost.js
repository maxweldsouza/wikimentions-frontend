var React = require('react');

var moment = require('moment');
var Markdown = require('./Markdown');

var BlogPost = React.createClass({
    render () {
        var added = moment(this.props.added + '+0000');
        added = added.format("MMMM Do YYYY");
        var path = '/blog/' + this.props.slug;
        return (
            <div className='blog-post'>
                <a href={path}><h1>{this.props.title}</h1></a>
                <span className='blog-timestamp'>{added}</span>
                <hr/>
                <Markdown markdown={this.props.content}/>
                <hr/>
                <div className='fx-row'>
                    <div className='fx-col-xxs-6'>
                        {this.props.prev ? <a href={'/blog/' + this.props.prev} className=''>Previous Post</a> : null}
                    </div>
                    <div className='fx-col-xxs-6 text-align-right-xxs'>
                        {this.props.next ? <a href={'/blog/' + this.props.next} className=''>Next Post</a> : null}
                        <span className='blog-social'>
                            <a href={'http://www.facebook.com/sharer/sharer.php?u=https://comparnion.com' + path + '&title=' + this.props.title}><i className='ion-social-facebook'></i></a>
                            <a href={'http://twitter.com/intent/tweet?status=' + this.props.title + '+' + 'https://comparnion.com' + path}><i className='ion-social-twitter'></i></a>
                        </span>
                    </div>
                </div>
                {this.props.showComments ? <div className='blog-comments'>
                    <div className="fb-comments" data-href={'https://comparnion.com' + path} data-width="100%" data-numposts="5"></div>
                </div> : null}
            </div>
        );
    }
});

module.exports = BlogPost;
