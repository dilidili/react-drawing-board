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

var RedoIcon = function RedoIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    x: "0px",
    y: "0px",
    viewBox: "0 0 64 64"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M28.3,18.4h19.5l-5.9-5.9c-0.7-0.7-0.7-1.8,0-2.5c0.7-0.7,1.8-0.7,2.5,0l7.8,7.8\n        c0.7,0.7,1,1.6,1,2.5c0,1-0.4,1.9-1,2.6l-7.8,7.8c-0.3,0.3-0.8,0.5-1.3,0.5c-0.5,0-0.9-0.2-1.3-0.5c-0.7-0.7-0.7-1.8,0-2.5L48,22\n        H28.3c-6.6,0-12,5.4-12,12s5.4,12,12,12h12.8c1,0,1.8,0.8,1.8,1.8c0,1-0.8,1.8-1.8,1.8H28.3c-8.6,0-15.5-7-15.5-15.5\n        S19.7,18.4,28.3,18.4z"
  }));
};

var _default = RedoIcon;
exports.default = _default;