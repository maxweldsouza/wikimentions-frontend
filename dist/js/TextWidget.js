"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextWidget = function TextWidget(_ref) {
    var label = _ref.label,
        value = _ref.value;

    return _react2.default.createElement(
        "div",
        { className: "small-6 columns" },
        _react2.default.createElement(
            "div",
            { className: "callout text-center" },
            _react2.default.createElement(
                "div",
                { className: "text-widget-label" },
                label
            ),
            _react2.default.createElement(
                "div",
                { className: "text-widget-value" },
                value
            )
        )
    );
};

exports.default = TextWidget;