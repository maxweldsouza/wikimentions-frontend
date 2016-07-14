var React = require('react');
var AvatarEditor = require('./react-avatar-editor');
var Rcslider = require('rc-slider');
var Markdown = require('./Markdown');
var requests = require('superagent');
var cookies = require('browser-cookies');
var Snackbar = require('./Snackbar');
var Input = require('./Input');

var ImageUpload = React.createClass({
    getInitialState () {
        return {
            scale: 1,
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
    uploadImage () {
        if (this.validateForm()) {
            var image = this.refs.editor.getImageScaledToCanvas().toDataURL('image/jpg');
            console.log('image', image);
            if (!image) {
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
                    <h1>Upload Image</h1>
                    Drag an image below to upload
                </div>
                <div className='shrink columns'>
                    <AvatarEditor
                    ref='editor'
                    width={this.props.width}
                    height={this.props.height}
                    border={15}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={this.state.scale}
                    style={{'border': 'dashed 2px black'}} />
                    <Rcslider
                        min={1}
                        max={2}
                        step={0.01}
                        defaultValue={1}
                        onChange={this.handleScale}
                        tipFormatter={null}/>
                </div>
                <div className='small-12 xlarge-expand columns'>
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
                        Description
                        <div className='callout'>
                            <Markdown markdown={this.state.imageDescription} />
                        </div>
                    </div> : null}
                </div>
                <div className='small-12 columns'>
                    <div className='button-group'>
                        <button className='button' onClick={this.uploadImage}>Upload</button>
                        <button className='button secondary hollow' onClick={this.props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ImageUpload;
