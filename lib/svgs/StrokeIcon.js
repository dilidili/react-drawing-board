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

var StrokeIcon = function StrokeIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    x: "0px",
    y: "0px",
    viewBox: "0 0 64 64"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M15.1,39.5L39.6,15c1.4-1.4,3.3-2.2,5.3-2.2c4.1,0,7.4,3.2,7.5,7.3c0,2-0.8,4-2.2,5.3L25.8,50.2L12,53.3\n        L15.1,39.5z M18,47.3v2.1l5.9-1.4l-0.1-6.6h-6.5l-1.4,5.9H18z M24.8,39.1c0.7,0,1.1,0.4,1.1,1.1v6.4l19.2-19.3L37.6,20l-19,19.1\n        H24.8z M46.7,25.7l2-1.9c0.9-0.9,1.5-2.2,1.6-3.9c0-2.8-2.3-5.2-5.2-5.2c-2.3,0-3.7,1.6-3.8,1.6l-2,2L46.7,25.7z"
  }));
};

var _default = StrokeIcon;
exports.default = _default;