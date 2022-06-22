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

var TextIcon = function TextIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _objectSpread({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.7643 4.34286C15.5214 4.11429 15.2071 4 14.8214 4H5.30714C4.93571 4 4.62143 4.11429 4.36429 4.34286C4.12143 4.57143 4 4.86429 4 5.22143C4 5.59286 4.12143 5.89286 4.36429 6.12143C4.60714 6.35 4.92143 6.46429 5.30714 6.46429H8.67143V17.6929C8.67143 18.0643 8.8 18.3786 9.05714 18.6357C9.31429 18.8786 9.64286 19 10.0429 19C10.4429 19 10.7786 18.8786 11.05 18.6357C11.3214 18.3786 11.4571 18.0643 11.4571 17.6929V6.46429H14.8214C15.2071 6.46429 15.5214 6.35714 15.7643 6.14286C16.0071 5.91429 16.1286 5.61429 16.1286 5.24286C16.1286 4.87143 16.0071 4.57143 15.7643 4.34286ZM20.3173 11.1359L20.3229 11.1301L20.3284 11.1242C20.5555 10.8773 20.6496 10.568 20.6496 10.2457C20.6496 9.92347 20.5555 9.61415 20.3284 9.36722C20.0999 9.11878 19.7991 9 19.4706 9H14.5286C14.2019 9 13.9092 9.12223 13.6806 9.35686L13.6757 9.36197L13.6708 9.36722C13.4471 9.61047 13.3496 9.91332 13.3496 10.2329C13.3496 10.5551 13.4437 10.8644 13.6708 11.1114C13.8994 11.3598 14.2002 11.4786 14.5286 11.4786H15.7761V17.7157C15.7761 18.0469 15.8787 18.3549 16.0984 18.6087L16.1031 18.6141L16.1079 18.6193C16.3415 18.8741 16.6486 19 16.9885 19C17.3279 19 17.6332 18.8749 17.871 18.6291L17.8759 18.624L17.8807 18.6187C18.1118 18.3658 18.2231 18.0544 18.2231 17.7157V11.4786H19.4706C19.7887 11.4786 20.0861 11.3715 20.3173 11.1359Z",
    fill: "#0A38A1"
  }));
};

var _default = TextIcon;
exports.default = _default;