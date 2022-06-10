"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBackgroundPosition = exports.useBackgroundDropdown = void 0;

var _react = _interopRequireDefault(require("react"));

var _Layout = require("./Layout");

var _reactIntl = require("react-intl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useBackgroundDropdown = function useBackgroundDropdown(config) {
  var selectBackgroundImage = config.selectBackgroundImage,
      removeBackgroundImage = config.removeBackgroundImage;

  var _useIntl = (0, _reactIntl.useIntl)(),
      formatMessage = _useIntl.formatMessage;

  return /*#__PURE__*/_react.default.createElement(_Layout.Menu, null, /*#__PURE__*/_react.default.createElement(_Layout.Menu.Item, {
    onClick: function onClick() {
      return selectBackgroundImage();
    }
  }, formatMessage({
    id: 'umi.block.sketch.bg.select'
  })), /*#__PURE__*/_react.default.createElement(_Layout.Menu.Item, {
    onClick: function onClick() {
      return removeBackgroundImage();
    }
  }, formatMessage({
    id: 'umi.block.sketch.bg.remove'
  })));
};

exports.useBackgroundDropdown = useBackgroundDropdown;

var getBackgroundPosition = function getBackgroundPosition(context) {
  return {
    x: 0,
    y: 0,
    w: context.canvas.width,
    h: context.canvas.height
  };
};

exports.getBackgroundPosition = getBackgroundPosition;