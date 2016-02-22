var React = require('react');

var Mention = React.createClass({
    render () {
        var path;
        var icon;
        var description;
        if (this.props.type === 'book') {
            path = '/books/' + this.props.id + '/' + this.props.slug;
            icon = 'ion-ios-book';
            description = 'Book';
        } else if (this.props.type === 'person') {
            path = '/pages/' + this.props.id + '/' + this.props.slug;
            icon = 'ion-person';
            description = this.props.description;
        }
        return (
            <div className='row mention-block'>
                <div className='small-10 columns mention-title'>
                    <a href={path}>{this.props.name}</a>
                </div>
                <div className="small-2 columns text-right mention-edit">
                    <a href={'/mentions/' + this.props.id + '/edit'}>Edit</a>
                </div>
                <div className='small-12 columns mention-short-description'>
                    <span className='mention-icon'>
                        <span className={icon}/>
                    </span>{description}
                </div>
                <div className='small-12 columns mention-quote'>
                    {this.props.quote}
                </div>
            </div>
        );
    }
});


module.exports = Mention;
