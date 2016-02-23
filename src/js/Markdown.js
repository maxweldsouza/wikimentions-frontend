var React = require('react');
var marked = require('marked');
var nofollow = require('./nofollow');

var Markdown = React.createClass({
    propTypes: {
        markdown: React.PropTypes.string.isRequired
    },
    render: function () {
        /* This is a dangerous area for security. Make sure
         * you know what you are doing */
        var obj = {
            __html: nofollow(marked(this.props.markdown))
        };
        return <div dangerouslySetInnerHTML={obj} />;// eslint-disable-line react/no-danger
    }
});

module.exports = Markdown;
