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

var ImageIcon = function ImageIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/_react.default.createElement("g", {
    clipPath: "url(#clip0_6262_5008)"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M19.07 4H4.8C3.80589 4 3 4.80589 3 5.8V18.41C3 19.4041 3.80589 20.21 4.8 20.21H19.07C20.0641 20.21 20.87 19.4041 20.87 18.41V5.8C20.87 4.80589 20.0641 4 19.07 4Z",
    stroke: "#0A38A1",
    strokeWidth: "2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M3 15.2392L7.12 11.1492C7.24383 11.0228 7.39164 10.9224 7.55477 10.8539C7.71789 10.7853 7.89306 10.75 8.07 10.75C8.24694 10.75 8.42211 10.7853 8.58523 10.8539C8.74836 10.9224 8.89617 11.0228 9.02 11.1492L18.34 20.4692",
    stroke: "#0A38A1",
    strokeWidth: "2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M14.24 16.3683L16 14.5783C16.2528 14.328 16.5942 14.1875 16.95 14.1875C17.3058 14.1875 17.6472 14.328 17.9 14.5783L20.9 17.5783",
    stroke: "#0A38A1",
    strokeWidth: "2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M16.0301 10.7994C17.1181 10.7994 18.0001 9.91738 18.0001 8.82938C18.0001 7.74137 17.1181 6.85938 16.0301 6.85938C14.9421 6.85938 14.0601 7.74137 14.0601 8.82938C14.0601 9.91738 14.9421 10.7994 16.0301 10.7994Z",
    stroke: "#0A38A1",
    strokeWidth: "2"
  })), /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("clipPath", null, /*#__PURE__*/_react.default.createElement("rect", {
    width: "19.87",
    height: "18.21",
    fill: "white",
    transform: "translate(2 3)"
  }))));
};

var _default = ImageIcon;
exports.default = _default;