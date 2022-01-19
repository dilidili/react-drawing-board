"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = Layout;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Layout(props) {
  return /*#__PURE__*/_react.default.createElement("div", null, props.children);
}

Layout.Header = function Header(props) {
  return /*#__PURE__*/_react.default.createElement("div", null, props.children);
};

Layout.Sider = function Sider(props) {
  return /*#__PURE__*/_react.default.createElement("div", null, props.children);
};

Layout.Content = function Content(props) {
  return /*#__PURE__*/_react.default.createElement("div", null, props.children);
};