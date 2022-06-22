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

var ShapeIcon = function ShapeIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M18.2603 9H11.7397C10.2266 9 9 10.2266 9 11.7397V18.2603C9 19.7734 10.2266 21 11.7397 21H18.2603C19.7734 21 21 19.7734 21 18.2603V11.7397C21 10.2266 19.7734 9 18.2603 9Z",
    stroke: "#0A38A1",
    strokeWidth: "2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M8.95847 15C7.9299 14.9933 6.92034 14.722 6.02681 14.2123C5.13327 13.7026 4.38579 12.9716 3.85617 12.0895C3.32655 11.2074 3.0326 10.2038 3.00256 9.1753C2.97252 8.14675 3.2074 7.12775 3.68463 6.21622C4.16187 5.30469 4.86542 4.53126 5.72768 3.97024C6.58994 3.40922 7.58194 3.07946 8.60836 3.01266C9.63479 2.94585 10.6611 3.14425 11.5888 3.58877C12.5165 4.03329 13.3142 4.70901 13.9055 5.55099C14.6156 6.54446 14.9982 7.73481 15 8.95614",
    stroke: "#0A38A1",
    strokeWidth: "2"
  }));
};

var _default = ShapeIcon;
exports.default = _default;