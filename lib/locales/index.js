"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _enUS = _interopRequireDefault(require("./en-US"));

var _zhCN = _interopRequireDefault(require("./zh-CN"));

var _trTR = _interopRequireDefault(require("./tr-TR"));

var _ptBR = _interopRequireDefault(require("./pt-BR"));

var _messages;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  messages: (_messages = {}, _defineProperty(_messages, 'en-US', _enUS.default), _defineProperty(_messages, 'zh-CN', _zhCN.default), _defineProperty(_messages, 'tr-TR', _trTR.default), _defineProperty(_messages, 'en', _enUS.default), _defineProperty(_messages, 'zh', _zhCN.default), _defineProperty(_messages, 'tr', _enUS.default), _defineProperty(_messages, 'pt-BR', _ptBR.default), _messages)
};
exports.default = _default;