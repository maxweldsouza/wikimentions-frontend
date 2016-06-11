var React = require('react');
var Lazy = require('react-lazy-load');

var Image = React.createClass({
    render () {
        return (
            <Lazy>
                <img className={this.props.className} src={'/api/v1/images/' + this.props.md5 + '-' + this.props.width + '-' + this.props.height + '.jpg'} width={this.props.width} height={this.props.height} alt=""/>
            </Lazy>
        );
    }
});

module.exports = Image;
