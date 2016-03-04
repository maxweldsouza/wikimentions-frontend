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
        var referencesCount;
        if (this.props.references) {
            referencesCount = this.props.references.split(/\r\n|\r|\n/).length;
        } else {
            referencesCount = 0;
        }
        return (
            <div className='row mention-block'>
                <div className='small-12 columns mention-title'>
                    <a href={path}>{this.props.title}</a>
                </div>
                <div className='small-12 columns mention-short-description'>
                    <span className='mention-icon'>
                        <span className={icon}/>
                    </span>{description}
                </div>
                <div className='small-12 columns mention-quote'>
                    {this.props.quote}
                </div>
                <div className='small-6 columns'>
                    {this.props.type === 'person' ? <span className='mention-links'>
                        {' Books '}<span className="badge">{this.props.books}</span>
                    </span> : null}
                    <span className='mention-links'>
                        {' Videos '}<span className="badge">0</span>
                    </span>
                    <span className='mention-links'>
                        {' References '}<span className="badge">{referencesCount}</span>
                    </span>
                </div>
                <div className="small-6 columns mention-edit text-right">
                    <a href={'/mentions/' + this.props.mention_id + '/edit'}>Edit</a>
                </div>
            </div>
        );
    }
});


module.exports = Mention;
