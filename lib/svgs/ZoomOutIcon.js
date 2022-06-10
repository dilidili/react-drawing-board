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

var ZoomOutIcon = function ZoomOutIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M14.9297 10.3846H7.61724C7.51411 10.3846 7.42974 10.469 7.42974 10.5721V11.9783C7.42974 12.0815 7.51411 12.1658 7.61724 12.1658H14.9297C15.0329 12.1658 15.1172 12.0815 15.1172 11.9783V10.5721C15.1172 10.469 15.0329 10.3846 14.9297 10.3846ZM21.586 20.3221L18.1641 16.9002C21.0258 13.4104 20.8266 8.24004 17.5547 4.97051C14.086 1.49941 8.45161 1.49941 4.9688 4.97051C1.4977 8.45332 1.4977 14.0877 4.9688 17.5565C8.23833 20.8283 13.4086 21.0275 16.8985 18.1658L20.3204 21.5877C20.3954 21.6533 20.5149 21.6533 20.5782 21.5877L21.586 20.5799C21.6516 20.5166 21.6516 20.3971 21.586 20.3221ZM16.3126 16.3143C13.5282 19.0963 9.0188 19.0963 6.23443 16.3143C3.45239 13.5299 3.45239 9.02051 6.23443 6.23614C9.0188 3.4541 13.5282 3.4541 16.3126 6.23614C19.0946 9.02051 19.0946 13.5299 16.3126 16.3143Z",
    fill: "#0A38A1"
  }));
};

var _default = ZoomOutIcon;
exports.default = _default;