var React = require('react');
var Markdown = require('./Markdown');
var requests = require('superagent');
var cookies = require('browser-cookies');
var Snackbar = require('./Snackbar');
var Input = require('./Input');
import Cropper from 'react-cropper';

var ImageUpload = React.createClass({
    getInitialState () {
        return {
            scale: 1,
            image: '',
            mime: '',
            imageDescription: '',
            descriptionValid: true,
            descriptionMessage: '',
            submiting: false
        };
    },
    handleScale (value) {
        this.setState({scale: value});
    },
    onChangeText (e) {
        var temp = {
            error: false,
            message: ''
        };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    validateForm () {
        var valid = true;
        var message;
        if (!this.state.imageDescription) {
            this.setState({
                descriptionValid: false,
                descriptionMessage: 'Description cannot be empty'
            });
            valid = false;
        }
        return valid;
    },
    onUpload () {
        var width, height;
        if (this.props.type === 'person') {
            width = 250;
            height = 250;
        } else if (this.props.type === 'book') {
            height = 200;
            width = height * aspectRatio;
        } else if (this.props.type === 'video') {
            width = 120;
            height = width / aspectRatio;
        }
        this.resize(width, height, this.uploadImage);
    },
    resize (width, height, callback) {
        var sourceImage = new Image();

        sourceImage.onload = function () {
            // Create a canvas with the desired dimensions
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            // Scale and draw the source image to the canvas
            canvas.getContext('2d').drawImage(sourceImage, 0, 0, width, height);

            // Convert the canvas to a data URL in PNG format
            callback(canvas.toDataURL());
        };

        sourceImage.src = this.refs.cropper.getCroppedCanvas().toDataURL(this.state.mime);
    },
    uploadImage (image) {
        if (this.validateForm()) {
            if (!this.state.image) {
                Snackbar({message: 'Image missing'});
                return;
            }

            this.setState({
                submiting: true
            });
            requests
            .post('/api/v1/images/' + this.props.id)
            .set('X-XSRFToken', cookies.get('_xsrf'))
            .field('action', 'add')
            .field('imageDescription', this.state.imageDescription)
            .field('image', image)
            .end((err, res) => {
                this.setState({
                    submiting: false
                });
                if (err && err.status) {
                    Snackbar({message: res.body.message});
                } else {
                    Snackbar({message: 'Image uploaded'});
                    history.pushState(null, null, res.body.redirect);
                    Mentions.route(res.body.redirect);
                }
            });
        }
    },
    fileInput () {
        var fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.setState({
                image: e.target.result,
                mime: this.refs.input.files[0].type
            });
        };
        fileReader.readAsDataURL(this.refs.input.files[0]);
    },
    _crop () {

    },
    render () {
        var imageMessage;
        if (this.state.type === 'book') {
            imageMessage = 'Add an image of this book';
        } else if (this.state.type === 'video') {
            imageMessage = 'Add a thumbnail for this video';
        } else if (this.state.type === 'person') {
            imageMessage = 'Add a picture of this person';
        }
        return (
            <div className='row'>
                <div className='small-12 columns'>
                    <h1>{this.props.title ? this.props.title + ' - ' : null}Upload Image</h1>
                    <input type='file' ref='input' onChange={this.fileInput}/>
                </div>
                <div className='shrink columns'>
                    {this.props.type === 'person' ? <Cropper
                        ref='cropper'
                        src={this.state.image}
                        style={{height: 270, width: 270}}
                        // Cropper.js options
                        viewMode={1}
                        aspectRatio={1}
                        minCropBoxWidth={250}
                        minCropBoxHeight={250}
                        cropBoxResizable={false}
                        guides={false}
                        crop={this._crop} /> : null}
                    {this.props.type === 'book' ? <Cropper
                        ref='cropper'
                        src={this.state.image}
                        style={{height: 270, width: 270}}
                        // Cropper.js options
                        autoCropArea={1}
                        viewMode={1}
                        minCropBoxHeight={200}
                        guides={false}
                        crop={this._crop} /> : null}
                    {this.props.type === 'video' ? <Cropper
                        ref='cropper'
                        src={this.state.image}
                        style={{height: 270, width: 270}}
                        // Cropper.js options
                        autoCropArea={1}
                        viewMode={1}
                        minCropBoxWidth={120}
                        guides={false}
                        crop={this._crop} /> : null}
                </div>
                <div className='small-12 xlarge-expand columns'>
                    Description
                    <Input
                        textarea={true}
                        type='text'
                        name='imageDescription'
                        placeholder='Add a description for the image, including copyright information, a link to the original source etc.'
                        value={this.state.imageDescription}
                        onChange={this.onChangeText}
                        valid={this.state.descriptionValid}
                        message={this.state.descriptionMessage}
                        rows={3}/>
                    {this.state.imageDescription ? <div>
                        <strong>Preview</strong>
                        <Markdown markdown={this.state.imageDescription} />
                    </div> : null}
                </div>
                <div className='small-12 columns'>
                    <div className='button-group'>
                        <button className='button' onClick={this.onUpload}>Upload</button>
                        <button className='button secondary hollow' onClick={this.props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ImageUpload;
