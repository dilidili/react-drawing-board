"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EnableSketchPadContext = /*#__PURE__*/_react.default.createContext({
  enable: true,
  setEnable: function setEnable() {}
});

var _default = EnableSketchPadContext;
exports.default = _default;