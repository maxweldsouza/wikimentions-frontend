var React = require('react');
var Lazy = require('react-lazy-load');

var Image = React.createClass({
    render () {
        return (
            <Lazy>
                <img className="" src={'/api/v1/images/' + this.props.md5 + '-' + this.props.width + '-' + this.props.height + '.jpg'} alt=""/>
            </Lazy>
        );
    }
});

module.exports = Image;
