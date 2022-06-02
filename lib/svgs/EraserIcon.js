"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EraserIcon = function EraserIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M2.58596 15.4064L6.88496 19.7054C6.97767 19.7984 7.08786 19.8722 7.2092 19.9225C7.33053 19.9728 7.46062 19.9986 7.59196 19.9984H19.593V17.9984H12.635L19.857 10.7764C20.637 9.9974 20.637 8.7274 19.857 7.9484L14.906 2.9984C14.5305 2.62419 14.022 2.41406 13.492 2.41406C12.9619 2.41406 12.4534 2.62419 12.078 2.9984L7.32796 7.7474L2.57396 12.5904C2.20595 12.9674 2.00095 13.474 2.00319 14.0009C2.00544 14.5277 2.21475 15.0325 2.58596 15.4064ZM13.492 4.4124L18.442 9.3624L15.856 11.9484L10.906 6.9984L13.492 4.4124ZM8.74896 9.1544L9.49196 8.4124L14.442 13.3624L9.88496 17.9194C9.86063 17.9445 9.8376 17.9709 9.81596 17.9984H8.00596L4.00096 13.9914L8.74896 9.1544Z",
    fill: "#0A38A1"
  }));
};

var _default = EraserIcon;
exports.default = _default;