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

var ZoomIcon = function ZoomIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    x: "0px",
    y: "0px",
    viewBox: "0 0 64 64"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M49.6,52.2c-0.4,0-0.7-0.2-1-0.5l-9.9-9.9c-3,2.5-6.9,3.9-10.9,3.9c-9.4,0-17-7.6-17-17c0-9.4,7.6-17,17-17\n        c9.4,0,17,7.6,17,17c0,4-1.4,7.9-3.9,10.9l9.9,9.9c0.6,0.7,0.6,1.6-0.1,2.2C50.4,52.2,49.8,52.2,49.6,52.2z M27.8,14.9\n        c-7.7,0-13.9,6.2-13.9,13.9c0,7.7,6.2,13.9,13.9,13.9c7.7,0,13.9-6.2,13.9-13.9C41.7,21.1,35.5,14.9,27.8,14.9z"
  }));
};

var _default = ZoomIcon;
exports.default = _default;