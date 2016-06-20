var React = require('react');
var Lazy = require('react-lazy-load');

var Image = React.createClass({
    render () {
        var displayWidth = this.props.displayWidth ? this.props.displayWidth  : this.props.width;
        var displayHeight = displayWidth * this.props.height / this.props.width;
        return (
            <div style={{'width': displayWidth, 'height': displayHeight, maxWidth: '100%'}} >
                <Lazy height={displayHeight}>
                    <img className={this.props.className} src={'/api/v1/static/images/' + this.props.md5 + '-' + this.props.width + '-' + this.props.height + '.jpg'} width={this.props.width} height={this.props.height} alt=""/>
                </Lazy>
            </div>
        );
    }
});

module.exports = Image;
