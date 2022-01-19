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

var SelectIcon = function SelectIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    x: "0px",
    y: "0px",
    viewBox: "0 0 64 64"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M17.1,5.8l0.6,6.3l2,29.3l0.3,5.1l4.1-2.7c0,0,2.6-1.5,5.5-3.6l7.3,12.9l1.5,2.7l2.6-1.5l4.9-3\n        l2.6-1.5L47,47.1l-7.3-12.9c1.9-1.1,3.9-2.2,5.8-3.3l4.1-2.4l-3.8-2.7L22,9.3L17.1,5.8z M20.6,11.7l23.5,16.5c0,0-3.8,2.1-8.4,4.8\n        l8.7,15.3l-4.9,3l-8.7-15.6c-4.4,2.4-8.1,5.1-8.1,5.1L20.6,11.7L20.6,11.7z"
  }));
};

var _default = SelectIcon;
exports.default = _default;