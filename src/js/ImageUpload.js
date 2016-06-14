var React = require('react');
var AvatarEditor = require('./react-avatar-editor');
var Rcslider = require('rc-slider');

var ImageUpload = React.createClass({
    getInitialState: function() {
        return {
            scale: 1
        };
    },
    handleScale (value) {
        this.setState({scale: value});
    },
    render () {
        return (
            <div>
                <h2>Upload Image</h2>
                Drag an image below to upload
                <div>
                    <AvatarEditor
                    ref='editor'
                    width={250}
                    height={250}
                    border={50}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={this.state.scale}
                    style={{'border': 'dashed 2px black'}} />
                </div>
                <Rcslider
                    min={1}
                    max={2}
                    step={0.01}
                    defaultValue={1}
                    onChange={this.handleScale}
                    tipFormatter={null}/>
            </div>
        );
    }
});

module.exports = ImageUpload;
