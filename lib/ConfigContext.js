"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DefaultConfig = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultConfig = {
  prefixCls: 'drawing-board',
  showBackgroundTool: false
};
exports.DefaultConfig = DefaultConfig;

var ConfigContext = /*#__PURE__*/_react.default.createContext(DefaultConfig);

var _default = ConfigContext;
exports.default = _default;