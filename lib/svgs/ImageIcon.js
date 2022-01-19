"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ImageIcon = function ImageIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    x: "0px",
    y: "0px",
    viewBox: "0 0 64 64"
  }, props), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M32,11.1c0.8,0,1.5,0.7,1.5,1.5v28.5h-3V12.7C30.5,11.8,31.2,11.1,32,11.1L32,11.1z"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M17.7,48.1h28.3c0.9,0,1.7-0.8,1.7-1.7V20.8c0-0.9-0.8-1.7-1.7-1.7h-6.9\n            c-0.8-0.3-1.1-0.8-1.2-1.5c0-0.7,0.4-1.2,1.2-1.5h9.5c1.1,0,2,0.9,2,2v30.9c0,1.1-0.9,2-2,2H15.2c-1.1,0-2-0.9-2-2V18.2\n            c0-1.1,0.9-2,2-2h9.7c0.7,0.2,1.1,0.7,1.1,1.4c0,0.7-0.4,1.2-1.1,1.5h-7.1c-0.9,0-1.7,0.8-1.7,1.7v25.6\n            C16,47.3,16.8,48.1,17.7,48.1z"
  }))), /*#__PURE__*/_react.default.createElement("path", {
    d: "M24,34.5c0.5-0.5,1.3-0.5,1.8,0l6.1,5.7l6.1-5.7c0.5-0.5,1.3-0.5,1.8,0c0.2,0.2,0.4,0.5,0.4,0.9\n        S40,36,39.8,36.2l-7.8,7.4l-7.8-7.4c-0.2-0.2-0.4-0.5-0.4-0.9C23.7,35.1,23.8,34.7,24,34.5L24,34.5z"
  }));
};

var _default = ImageIcon;
exports.default = _default;