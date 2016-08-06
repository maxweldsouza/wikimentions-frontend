var React = require('react');
var Remarkable = require('remarkable');
var md = new Remarkable({
    linkify: true
});
var nofollow = require('./nofollow');

var Markdown = React.createClass({
    getDefaultProps () {
        return {
            className: ''
        };
    },
    propTypes: {
        markdown: React.PropTypes.string.isRequired
    },
    render: function () {
        /* This is a dangerous area for security. Make sure
         * you know what you are doing */
        var obj = {
            __html: nofollow(md.render(this.props.markdown))
        };
        return <div className={this.props.className} dangerouslySetInnerHTML={obj} />;// eslint-disable-line react/no-danger
    }
});

module.exports = Markdown;
