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

var SaveIcon = function SaveIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    x: "0px",
    y: "0px",
    viewBox: "0 0 64 64"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M45.5,50.2h-27c-3.7,0-6.7-3-6.7-6.7V16.9c0-3.7,3-6.7,6.7-6.7h27c3.7,0,6.7,3,6.7,6.7v26.6\n        C52.2,47.2,49.2,50.2,45.5,50.2z M18.5,12.8c-2.3,0-4.1,1.8-4.1,4.1v26.6c0,2.3,1.8,4.1,4.1,4.1h27c2.3,0,4.1-1.8,4.1-4.1V16.9\n        c0-2.3-1.8-4.1-4.1-4.1H18.5z M45,30.2H19.1V10.2H45L45,30.2z M21.7,27.6h20.7V12.8H21.7V27.6z M35.9,16.6h2.6v8.7h-2.6V16.6z"
  }));
};

var _default = SaveIcon;
exports.default = _default;