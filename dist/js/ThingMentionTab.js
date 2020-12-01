'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Mention = require('./Mention');

var _Mention2 = _interopRequireDefault(_Mention);

var _AddMention = require('./AddMention');

var _AddMention2 = _interopRequireDefault(_AddMention);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThingMentionTab = function ThingMentionTab(_ref) {
    var mentions = _ref.mentions,
        type = _ref.type,
        id = _ref.id,
        count = _ref.count,
        path = _ref.path,
        loggedin = _ref.loggedin,
        _ref$page = _ref.page,
        page = _ref$page === undefined ? '1' : _ref$page;

    var nodata = _react2.default.createElement(
        'div',
        { className: 'card box' },
        _react2.default.createElement(
            'div',
            { className: 'blankslate' },
            _react2.default.createElement('span', { className: 'icon ion-at' }),
            _react2.default.createElement(
                'h3',
                null,
                'No mentions'
            ),
            'No mentions have been added yet. You can help us by adding some.'
        )
    );
    var nomore = _react2.default.createElement(
        'div',
        { className: 'card box' },
        _react2.default.createElement(
            'div',
            { className: 'blankslate' },
            _react2.default.createElement('span', { className: 'icon ion-at' }),
            _react2.default.createElement(
                'h3',
                null,
                'End of items'
            ),
            'There are no more mentions to show.'
        )
    );
    var addmention = void 0;
    if (type === 'person') {
        addmention = _react2.default.createElement(_AddMention2.default, {
            id: id,
            type: type,
            mentioned_by: id,
            loggedin: loggedin
        });
    } else {
        addmention = _react2.default.createElement(_AddMention2.default, {
            id: id,
            type: type,
            mentioned_in: id,
            loggedin: loggedin
        });
    }
    return _react2.default.createElement(
        'div',
        { className: 'card-container' },
        mentions.map(function (x) {
            return _react2.default.createElement(_Mention2.default, {
                key: x.mention_id,
                mention_id: x.mention_id,
                quote: x.quote,
                reference: x.reference,
                mentioned: x.mentioned,
                mentioned_in: x.mentioned_in,
                mentioned_by: x.mentioned_by,
                type: type
            });
        }),
        page === '1' && mentions.length === 0 ? nodata : null,
        page !== '1' && mentions.length === 0 ? nomore : null,
        _react2.default.createElement(_Pagination2.default, { total: count, path: path, page: page }),
        _react2.default.createElement(
            'div',
            { className: 'card box' },
            addmention
        )
    );
};

exports.default = ThingMentionTab;