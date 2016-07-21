var React = require('react');
var AddAuthors = require('./AddAuthors');

var Authors = React.createClass({
    render () {
        var authors = this.props.authors;
        var authorCount = authors.length;
        return (
            <div>
                {'by '}
                {authors.map(function (x, i) {
                    var path = '/people/' + x.id + '/' + x.props.slug;
                    return <a href={path} key={x.props.title}>
                        {x.props.title}{i === authorCount - 1 ? '' : ', '}
                    </a>;
                })}
                <AddAuthors id={this.props.id} authors={authors} type={this.props.type} />
            </div>
        );
    }
});

module.exports = Authors;
