var React = require('react');

var Mention = React.createClass({
    render () {
        var path;
        if (this.props.type === 'book') {
            path = '/books/' + this.props.id + '/' + this.props.slug;
        } else if (this.props.type === 'person') {
            path = '/pages/' + this.props.id + '/' + this.props.slug;
        }
        return (
            <div className='row mention-block'>
                <div className='small-6 columns'>
                    <a href={path}>{this.props.name}</a>
                </div>
                <div className="small-6 columns text-right mention-edit">
                    <a href={'/mentions/' + this.props.id + '/edit'}>Edit</a>
                </div>
                <div className='small-12 columns mention-short-description'>
                    {this.props.description}
                </div>
                <div className='small-12 columns mention-quote'>
                    {this.props.quote}
                </div>
            </div>
        );
    }
});


module.exports = Mention;
