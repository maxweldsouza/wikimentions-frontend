var React = require('react');
var AddAuthors = require('./AddAuthors');

var Authors = React.createClass({
    render () {
        var authors = this.props.authors;
        var authorCount = authors.length;
        return (
            <span>
                {'by '}
                {authors.map(function (x, i) {
                    var path = '/pages/' + x.id + '/' + x.slug;
                    return <a href={path} key={x.title}>
                        {x.title}{i === authorCount - 1 ? '' : ', '}
                    </a>;
                })}
                <AddAuthors id={this.props.id} authors={authors}/>
            </span>
        );
    }
});

module.exports = Authors;
