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

var ShapeIcon = function ShapeIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    x: "0px",
    y: "0px",
    viewBox: "0 0 64 64"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M51.6,14.6c-2.3-2.3-5.4-3.6-8.7-3.6s-6.4,1.3-8.7,3.6c-2.3,2.3-3.6,5.4-3.6,8.7c0,0.6,0,1.2,0.1,1.8H20.7\n        c-3.2,0-5.9,2.6-5.9,5.9v14.2c0,3.2,2.6,5.9,5.9,5.9h14.2c3.2,0,5.9-2.6,5.9-5.9v-9.8c0.7,0.1,1.4,0.2,2.2,0.2\n        c3.3,0,6.4-1.3,8.7-3.6c2.3-2.3,3.6-5.4,3.6-8.7S53.9,16.9,51.6,14.6L51.6,14.6z M38.8,45.1c0,2.2-1.8,3.9-3.9,3.9H20.7\n        c-2.2,0-3.9-1.8-3.9-3.9V30.9c0-2.2,1.8-3.9,3.9-3.9h10.5c0.6,1.8,1.6,3.5,3,4.9c1.3,1.3,2.9,2.3,4.6,2.9L38.8,45.1L38.8,45.1\n        L38.8,45.1z M38.8,32.8c-2.5-1.1-4.5-3.2-5.5-5.7h1.6c2.2,0,3.9,1.8,3.9,3.9L38.8,32.8z M42.9,33.6c-0.7,0-1.5-0.1-2.2-0.2v-2.5\n        c0-3.2-2.6-5.9-5.9-5.9h-2.2c-0.1-0.6-0.2-1.2-0.2-1.8c0-5.7,4.6-10.3,10.3-10.3c5.7,0,10.3,4.6,10.3,10.3\n        C53.2,29,48.6,33.6,42.9,33.6L42.9,33.6z"
  }));
};

var _default = ShapeIcon;
exports.default = _default;