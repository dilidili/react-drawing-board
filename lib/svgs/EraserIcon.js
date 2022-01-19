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

var EraserIcon = function EraserIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    x: "0px",
    y: "0px",
    viewBox: "0 0 64 64"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M29.4,51.8c-2.8,0-5.2-1-7.1-2.9l-9.2-9.2c-0.9-0.9-1.4-2.1-1.4-3.3s0.5-2.4,1.4-3.3l20.6-20.7\n        c0.9-0.9,2.1-1.4,3.3-1.4c1.2,0,2.4,0.5,3.3,1.4l13,13c0.9,1,1.4,2.3,1.4,3.4c0,1.2-0.5,2.4-1.4,3.3L36.5,48.9\n        C34.5,50.8,32,51.8,29.4,51.8z M14.9,34.8c-0.3,0.3-0.5,0.8-0.5,1.3c0,0.5,0.2,0.9,0.5,1.3l4.2,4.2l5.9,5.8c1,1,2.5,1.6,4.2,1.6\n        c1.9,0,3.9-0.7,5.1-1.8L18.5,31.3L14.9,34.8z M36.4,45.1l3.4-3.4l11.5-11.6c0.2-0.2,0.4-0.9,0.4-1.4c0-0.5-0.2-0.9-0.5-1.3L38,14.3\n        c-0.3-0.3-0.8-0.5-1.3-0.5s-0.9,0.2-1.3,0.5l-14.9,15L36.4,45.1z"
  }));
};

var _default = EraserIcon;
exports.default = _default;