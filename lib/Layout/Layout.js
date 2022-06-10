"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = Layout;

var _react = _interopRequireWildcard(require("react"));

var _ConfigContext = _interopRequireDefault(require("../ConfigContext"));

require("./Layout.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Layout(props) {
  var _useContext = (0, _react.useContext)(_ConfigContext.default),
      prefixCls = _useContext.prefixCls;

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-layout")
  }, props.children);
}

Layout.Header = function Header(props) {
  var _useContext2 = (0, _react.useContext)(_ConfigContext.default),
      prefixCls = _useContext2.prefixCls;

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-layout-header")
  }, props.children);
};

Layout.Sider = function Sider(props) {
  var _useContext3 = (0, _react.useContext)(_ConfigContext.default),
      prefixCls = _useContext3.prefixCls;

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-layout-sider")
  }, props.children);
};

Layout.Content = function Content(props) {
  var _useContext4 = (0, _react.useContext)(_ConfigContext.default),
      prefixCls = _useContext4.prefixCls;

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-layout-content")
  }, props.children);
};