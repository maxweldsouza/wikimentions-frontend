'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _snackbar = require('./snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _MarkdownInput = require('./MarkdownInput');

var _MarkdownInput2 = _interopRequireDefault(_MarkdownInput);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cropper = null;

var space = ' ';
var bookImageDescription = 'Source: []()' + space + space + '\nLicense: Non-free, fair use, cover art' + space + space;

var personImageDescription = 'Source: []()' + space + space + '\nAuthor: []()' + space + space + '\nLicense: []()' + space + space;

var ImageUpload = function (_React$Component) {
    _inherits(ImageUpload, _React$Component);

    function ImageUpload(props) {
        _classCallCheck(this, ImageUpload);

        var _this = _possibleConstructorReturn(this, (ImageUpload.__proto__ || Object.getPrototypeOf(ImageUpload)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            server: true,
            scale: 1,
            image: '',
            mime: '',
            imageDescription: props.type === 'book' ? bookImageDescription : personImageDescription,
            descriptionValid: true,
            descriptionMessage: '',
            formMessage: '',
            submitting: false
        };
        return _this;
    }

    _createClass(ImageUpload, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            new Promise(function (resolve) {
                require.ensure([], function (require) {
                    resolve(require('react-cropper'));
                });
            }).then(function (cropper) {
                Cropper = cropper.default;
                _this2.setState({
                    server: false
                });
            }).catch(function (err) {
                return console.log('Failed to load moment', err);
            });
        }
    }, {
        key: 'handleScale',
        value: function handleScale(value) {
            this.setState({ scale: value });
        }
    }, {
        key: 'onChangeText',
        value: function onChangeText(e) {
            var temp = {
                error: false,
                message: ''
            };
            temp[e.target.name] = e.target.value;
            this.setState(temp);
        }
    }, {
        key: 'validateForm',
        value: function validateForm() {
            var valid = true;
            if (!this.state.imageDescription) {
                this.setState({
                    descriptionValid: false,
                    descriptionMessage: 'Description cannot be empty'
                });
                valid = false;
            }
            return valid;
        }
    }, {
        key: 'onUpload',
        value: function onUpload() {
            var width = void 0;
            var height = void 0;
            var data = this.refs.cropper.getData();
            var aspectRatio = data.width / data.height;
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
    }, {
        key: 'resize',
        value: function resize(width, height, callback) {
            var sourceImage = new Image();

            sourceImage.onload = function () {
                // http://stackoverflow.com/questions/17861447/html5-canvas-drawimage-how-to-apply-antialiasing
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                var steps = Math.ceil(Math.log(sourceImage.width / width) / Math.log(2));

                // set size proportional to image
                canvas.height = height;
                canvas.width = width;

                // step 1 - resize to 50%
                var oc = document.createElement('canvas');

                var octx = oc.getContext('2d');

                var ocWidth = sourceImage.width;
                var ocHeight = sourceImage.height;
                oc.width = ocWidth;
                oc.height = ocHeight;
                octx.drawImage(sourceImage, 0, 0, ocWidth, ocHeight);

                // step 2 - resize 50% of step 1
                for (var i = 1; i < steps; i++) {
                    octx.drawImage(oc, 0, 0, ocWidth, ocHeight, 0, 0, ocWidth * 0.5, ocHeight * 0.5);
                    ocWidth *= 0.5;
                    ocHeight *= 0.5;
                }

                // step 3, resize to final size
                ctx.drawImage(oc, 0, 0, ocWidth, ocHeight, 0, 0, canvas.width, canvas.height);

                // Convert the canvas to a data URL in PNG format
                callback(canvas.toDataURL());
            };

            sourceImage.src = this.refs.cropper.getCroppedCanvas().toDataURL(this.state.mime);
        }
    }, {
        key: 'uploadImage',
        value: function uploadImage(image) {
            var _this3 = this;

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
                _superagent2.default.post('/api/v1/images/' + this.props.id).set('X-XSRFToken', _browserCookies2.default.get('_xsrf')).field('imageDescription', this.state.imageDescription).field('image', image).end(function (err, res) {
                    _this3.setState({
                        submitting: false
                    });
                    if (err && err.status) {
                        _this3.setState({
                            formMessage: res.body.message
                        });
                    } else {
                        _this3.setState({
                            formMessage: ''
                        });
                        (0, _snackbar2.default)({ message: 'Image uploaded' });
                        history.pushState(null, null, res.body.redirect);
                        Mentions.route(res.body.redirect);
                    }
                });
            }
        }
    }, {
        key: 'fileInput',
        value: function fileInput() {
            var _this4 = this;

            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                _this4.setState({
                    image: e.target.result,
                    mime: _this4.refs.input.files[0].type
                });
            };
            fileReader.readAsDataURL(this.refs.input.files[0]);
        }
    }, {
        key: '_crop',
        value: function _crop() {}
    }, {
        key: 'render',
        value: function render() {
            if (this.state.server) {
                return null;
            }
            var imageMessage = void 0;
            if (this.state.type === 'book') {
                imageMessage = 'Add an image of this book';
            } else if (this.state.type === 'video') {
                imageMessage = 'Add a thumbnail for this video';
            } else if (this.state.type === 'person') {
                imageMessage = 'Add a picture of this person';
            }
            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'small-12 columns' },
                    _react2.default.createElement(
                        'h1',
                        null,
                        this.props.title ? this.props.title + ' - ' : null,
                        'Upload Image'
                    ),
                    _react2.default.createElement('input', { type: 'file', ref: 'input', onChange: this.fileInput })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'shrink columns' },
                    this.props.type === 'person' ? _react2.default.createElement(Cropper, {
                        ref: 'cropper',
                        src: this.state.image,
                        className: 'react-cropper'
                        // Cropper.js options
                        , viewMode: 1,
                        aspectRatio: 1,
                        minCropBoxWidth: 250,
                        minCropBoxHeight: 250,
                        cropBoxResizable: false,
                        guides: false,
                        crop: this._crop
                    }) : null,
                    this.props.type === 'book' ? _react2.default.createElement(Cropper, {
                        ref: 'cropper',
                        src: this.state.image,
                        className: 'react-cropper'
                        // Cropper.js options
                        , autoCropArea: 1,
                        viewMode: 1,
                        minCropBoxHeight: 200,
                        guides: false,
                        crop: this._crop
                    }) : null,
                    this.props.type === 'video' ? _react2.default.createElement(Cropper, {
                        ref: 'cropper',
                        src: this.state.image,
                        className: 'react-cropper'
                        // Cropper.js options
                        , autoCropArea: 1,
                        viewMode: 1,
                        minCropBoxWidth: 120,
                        guides: false,
                        crop: this._crop
                    }) : null
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'small-12 xlarge-expand columns' },
                    this.state.formMessage ? _react2.default.createElement(
                        'div',
                        { className: 'callout alert' },
                        this.state.formMessage
                    ) : null,
                    _react2.default.createElement(_MarkdownInput2.default, {
                        name: 'imageDescription',
                        placeholder: 'Add a description for the image, including copyright information, a link to the original source etc. (Markdown is supported)',
                        rows: '5',
                        label: 'Description',
                        content: this.state.imageDescription,
                        onChange: this.onChangeText,
                        valid: this.state.descriptionValid,
                        message: this.state.descriptionMessage,
                        sideBySide: false,
                        maxLength: 65535
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'small-12 columns' },
                    _react2.default.createElement(
                        'div',
                        { className: 'button-group' },
                        _react2.default.createElement(
                            'button',
                            { className: 'button', onClick: this.onUpload },
                            'Upload'
                        ),
                        _react2.default.createElement(
                            'button',
                            {
                                className: 'button secondary',
                                onClick: this.props.onClose
                            },
                            'Close'
                        )
                    )
                )
            );
        }
    }]);

    return ImageUpload;
}(_react2.default.Component);

exports.default = ImageUpload;