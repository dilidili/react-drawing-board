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

var SaveIcon = function SaveIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/_react.default.createElement("rect", {
    width: "24",
    height: "24",
    rx: "4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M8.36025 13.0712L6.18573 10.8918C5.78102 10.4871 5.23125 10.2591 4.65873 10.2591C4.08621 10.2591 3.53742 10.4871 3.13271 10.8918C2.72702 11.2965 2.5 11.8463 2.5 12.4188C2.5 12.9913 2.72703 13.5411 3.13271 13.9458L6.81743 17.6305L8.33849 19.1575C8.7432 19.5622 9.29298 19.7902 9.8655 19.7902C10.438 19.7902 10.9878 19.5622 11.3925 19.1575L21.8693 8.68075H21.8683C22.273 8.27703 22.5 7.72923 22.5 7.15673C22.5 6.58522 22.273 6.03739 21.8683 5.63271C21.4636 5.228 20.9138 5 20.3413 5C19.7688 5 19.22 5.22801 18.8153 5.63271L11.4132 13.0714C11.0085 13.4771 10.4587 13.7041 9.88622 13.7041C9.3137 13.7041 8.76491 13.4771 8.3602 13.0714L8.36025 13.0712Z",
    fill: "white"
  }));
};

var _default = SaveIcon;
exports.default = _default;