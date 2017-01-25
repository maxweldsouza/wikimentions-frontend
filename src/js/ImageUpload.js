import React from 'react';
import Markdown from './Markdown';
import requests from 'superagent';
import cookies from 'browser-cookies';
import Snackbar from './Snackbar';
import Input from './Input';
import MarkdownInput from './MarkdownInput';
let Cropper = null;
import isNode from './isNode';
import autoBind from 'react-autobind';

class ImageUpload extends React.Component {
    constructor (props) {
        super(props);
    autoBind(this);
        this.state = {
            scale: 1,
            image: '',
            mime: '',
            imageDescription: '',
            descriptionValid: true,
            descriptionMessage: '',
            formMessage: '',
            submitting: false
        };
    }
    componentWillMount () {
        if (isNode.isBrowser()) {
            Cropper = require('react-cropper').default;
        }
    }
    handleScale (value) {
        this.setState({scale: value});
    }
    onChangeText (e) {
        const temp = {
            error: false,
            message: ''
        };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    }
    validateForm () {
        let valid = true;
        let message;
        if (!this.state.imageDescription) {
            this.setState({
                descriptionValid: false,
                descriptionMessage: 'Description cannot be empty'
            });
            valid = false;
        }
        return valid;
    }
    onUpload () {
        let width;
        let height;
        const data = this.refs.cropper.getData();
        const aspectRatio = data.width / data.height;
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
    }
    resize (width, height, callback) {
        const sourceImage = new Image();

        sourceImage.onload = () => {
            // http://stackoverflow.com/questions/17861447/html5-canvas-drawimage-how-to-apply-antialiasing
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const steps = Math.ceil(Math.log(sourceImage.width / width) / Math.log(2));

            // set size proportional to image
            canvas.height = height;
            canvas.width = width;

            // step 1 - resize to 50%
            const oc = document.createElement('canvas');

            const octx = oc.getContext('2d');

            let ocWidth = sourceImage.width;
            let ocHeight = sourceImage.height;
            oc.width = ocWidth;
            oc.height = ocHeight;
            octx.drawImage(sourceImage, 0, 0, ocWidth, ocHeight);

            // step 2 - resize 50% of step 1
            for (let i = 1; i < steps; i++) {
                octx.drawImage(oc, 0, 0, ocWidth, ocHeight,
                                   0, 0, ocWidth * 0.5, ocHeight * 0.5);
                ocWidth *= 0.5;
                ocHeight *= 0.5;
            }

            // step 3, resize to final size
            ctx.drawImage(oc, 0, 0, ocWidth, ocHeight,
                              0, 0, canvas.width, canvas.height);

            // Convert the canvas to a data URL in PNG format
            callback(canvas.toDataURL());
        };

        sourceImage.src = this.refs.cropper.getCroppedCanvas().toDataURL(this.state.mime);
    }
    uploadImage (image) {
        if (this.validateForm()) {
            if (!this.state.image) {
                this.setState({
                    formMessage: 'Image missing'
                });
                return;
            }

            this.setState({
                submitting: true,
                formMessage: ''
            });
            requests
            .post(`/api/v1/images/${this.props.id}`)
            .set('X-XSRFToken', cookies.get('_xsrf'))
            .field('imageDescription', this.state.imageDescription)
            .field('image', image)
            .end((err, res) => {
                this.setState({
                    submitting: false
                });
                if (err && err.status) {
                    this.setState({
                        formMessage: res.body.message
                    });
                } else {
                    this.setState({
                        formMessage: ''
                    });
                    Snackbar({message: 'Image uploaded'});
                    history.pushState(null, null, res.body.redirect);
                    Mentions.route(res.body.redirect);
                }
            });
        }
    }
    fileInput () {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.setState({
                image: e.target.result,
                mime: this.refs.input.files[0].type
            });
        };
        fileReader.readAsDataURL(this.refs.input.files[0]);
    }
    _crop () {

    }
    render () {
        if (isNode.isNode()) {
            return null;
        }
        let imageMessage;
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
                    <h1>{this.props.title ? `${this.props.title} - ` : null}Upload Image</h1>
                    <input type='file' ref='input' onChange={this.fileInput}/>
                </div>
                <div className='shrink columns'>
                    {this.props.type === 'person' ? <Cropper
                        ref='cropper'
                        src={this.state.image}
                        className='react-cropper'
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
                        className='react-cropper'
                        // Cropper.js options
                        autoCropArea={1}
                        viewMode={1}
                        minCropBoxHeight={200}
                        guides={false}
                        crop={this._crop} /> : null}
                    {this.props.type === 'video' ? <Cropper
                        ref='cropper'
                        src={this.state.image}
                        className='react-cropper'
                        // Cropper.js options
                        autoCropArea={1}
                        viewMode={1}
                        minCropBoxWidth={120}
                        guides={false}
                        crop={this._crop} /> : null}
                </div>
                <div className='small-12 xlarge-expand columns'>
                    {this.state.formMessage ? <div className='callout alert'>
                        {this.state.formMessage}
                    </div> : null}
                    <MarkdownInput
                        name='imageDescription'
                        placeholder='Add a description for the image, including copyright information, a link to the original source etc. (Markdown is supported)'
                        rows='5'
                        label='Description'
                        content={this.state.imageDescription}
                        onChange={this.onChangeText}
                        valid={this.state.descriptionValid}
                        message={this.state.descriptionMessage}
                        sideBySide={false}
                        maxLength={65535}
                        />
                </div>
                <div className='small-12 columns'>
                    <div className='button-group'>
                        <button className='button' onClick={this.onUpload}>Upload</button>
                        <button className='button secondary' onClick={this.props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageUpload;
