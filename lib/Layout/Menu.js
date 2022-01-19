"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = Menu;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Menu(props) {
  return /*#__PURE__*/_react.default.createElement("div", null, props.children);
}

Menu.Item = function Item(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    onClick: props.onClick
  }, props.children);
};