'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLazyload = require('react-lazyload');

var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

var _VideoApiThumb = require('./VideoApiThumb');

var _VideoApiThumb2 = _interopRequireDefault(_VideoApiThumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Thumbnail = function Thumbnail(_ref) {
    var _ref$image = _ref.image,
        image = _ref$image === undefined ? '' : _ref$image,
        _ref$type = _ref.type,
        type = _ref$type === undefined ? '' : _ref$type,
        _ref$alt = _ref.alt,
        alt = _ref$alt === undefined ? '' : _ref$alt,
        _ref$url = _ref.url,
        url = _ref$url === undefined ? '' : _ref$url,
        _ref$shadow = _ref.shadow,
        shadow = _ref$shadow === undefined ? false : _ref$shadow,
        _ref$round = _ref.round,
        round = _ref$round === undefined ? false : _ref$round,
        _ref$marginBottom = _ref.marginBottom,
        marginBottom = _ref$marginBottom === undefined ? false : _ref$marginBottom,
        _ref$bordered = _ref.bordered,
        bordered = _ref$bordered === undefined ? false : _ref$bordered,
        _ref$offset = _ref.offset,
        offset = _ref$offset === undefined ? 0 : _ref$offset,
        displayWidth = _ref.displayWidth,
        displayHeight = _ref.displayHeight;

    var imageClass = shadow ? 'img shadow' : 'img';

    var imageUrl = void 0;
    var imageWidth = void 0;
    var imageHeight = void 0;
    var imageMd5 = void 0;
    var aspectRatio = void 0;
    var useOriginal = void 0;
    if (image) {
        useOriginal = displayWidth > 75;
        if (type === 'book' && displayHeight === 200) {
            useOriginal = true;
        }
        if (useOriginal) {
            imageMd5 = image.md5;
            imageWidth = image.width;
            imageHeight = image.height;
        } else {
            imageMd5 = image.thumb_md5;
            imageWidth = image.thumb_width;
            imageHeight = image.thumb_height;
        }
        imageUrl = 'https://d198s6k47dh00z.cloudfront.net/' + imageMd5 + '-' + imageWidth + '-' + imageHeight + '.jpg';
        aspectRatio = imageWidth / imageHeight;
    } else if (type === 'book') {
        aspectRatio = 0.75;
    } else if (type === 'person') {
        aspectRatio = 1;
    } else if (type === 'video') {
        aspectRatio = 120 / 90;
    }
    var dw = displayWidth;
    var dh = displayHeight;
    if (!dw) {
        dw = displayHeight * aspectRatio;
    }
    if (!dh) {
        dh = displayWidth / aspectRatio;
    }
    var placeholder = _react2.default.createElement(
        'div',
        {
            className: bordered ? 'placeholder bordered' : 'placeholder',
            style: { lineHeight: dh + 'px' }
        },
        type === 'person' ? _react2.default.createElement('span', { className: 'ion-image' }) : null,
        type === 'book' ? _react2.default.createElement('span', { className: 'ion-ios-book' }) : null,
        type === 'video' ? _react2.default.createElement('span', { className: 'ion-play' }) : null
    );
    var main = void 0;
    if (image) {
        main = _react2.default.createElement(
            _reactLazyload2.default,
            { offset: offset, placeholder: placeholder },
            _react2.default.createElement('img', {
                className: imageClass,
                style: round ? { borderRadius: '999em' } : null,
                src: imageUrl,
                width: imageWidth,
                height: imageHeight,
                alt: alt
            })
        );
    } else if (type === 'video') {
        main = _react2.default.createElement(
            _reactLazyload2.default,
            { offset: offset, placeholder: placeholder },
            _react2.default.createElement(
                _VideoApiThumb2.default,
                { url: url, alt: alt },
                placeholder
            )
        );
    } else {
        main = placeholder;
    }
    var style = { width: dw, height: dh };
    return _react2.default.createElement(
        'div',
        {
            className: marginBottom ? 'image-container bottom-margin' : 'image-container',
            style: style
        },
        main
    );
};

exports.default = Thumbnail;