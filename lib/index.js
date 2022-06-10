"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uuid = require("uuid");

var _reactSpring = require("react-spring");

var _reactIntl = require("react-intl");

var _Layout = require("./Layout");

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

var _SketchPad = _interopRequireDefault(require("./SketchPad"));

var _Tool = _interopRequireWildcard(require("./enums/Tool"));

var _EnableSketchPadContext = _interopRequireDefault(require("./contexts/EnableSketchPadContext"));

var _locales = _interopRequireDefault(require("./locales"));

var _utils = require("./utils");

require("./index.css");

var _ConfigContext = _interopRequireWildcard(require("./ConfigContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Header = _Layout.Layout.Header,
    Sider = _Layout.Layout.Sider,
    Content = _Layout.Layout.Content;
var AnimatedSketchPad = (0, _reactSpring.animated)(_SketchPad.default);
var defaultProps = {
  userId: (0, _uuid.v4)(),
  locale: navigator.language,
  toolbarPlacement: 'top'
};

var enableSketchPadReducer = function enableSketchPadReducer(_state, action) {
  return action;
};

var Block = function Block(props) {
  var _defaultProps$props = _objectSpread(_objectSpread({}, defaultProps), props),
      userId = _defaultProps$props.userId,
      operations = _defaultProps$props.operations,
      onChange = _defaultProps$props.onChange,
      toolbarPlacement = _defaultProps$props.toolbarPlacement,
      clsssName = _defaultProps$props.clsssName,
      onSave = _defaultProps$props.onSave,
      showBackgroundTool = _defaultProps$props.showBackgroundTool,
      initialBackground = _defaultProps$props.initialBackground,
      viewMatrixProp = _defaultProps$props.viewMatrix,
      onViewMatrixChange = _defaultProps$props.onViewMatrixChange;

  var _useState = (0, _react.useState)(_Tool.default.Select),
      _useState2 = _slicedToArray(_useState, 2),
      currentTool = _useState2[0],
      setCurrentTool = _useState2[1];

  var _useState3 = (0, _react.useState)(_Tool.defaultToolOption),
      _useState4 = _slicedToArray(_useState3, 2),
      currentToolOption = _useState4[0],
      setCurrentToolOption = _useState4[1];

  var enableSketchPad = (0, _react.useReducer)(enableSketchPadReducer, true);
  var refSketch = (0, _react.useRef)(null); // control view matrix.

  var _useState5 = (0, _react.useState)([1, 0, 0, 1, 0, 0]),
      _useState6 = _slicedToArray(_useState5, 2),
      stateViewMatrix = _useState6[0],
      setStateViewMatrix = _useState6[1];

  var viewMatrix = viewMatrixProp || stateViewMatrix;

  var setViewMatrix = function setViewMatrix(newViewMatrix) {
    if (onViewMatrixChange) {
      onViewMatrixChange(newViewMatrix);
    } else {
      setStateViewMatrix(newViewMatrix);
    }
  };

  var scale = (0, _utils.extract_scale_from_matrix)(viewMatrix);
  (0, _react.useEffect)(function () {
    var keydownHandler = function keydownHandler(evt) {
      var keyCode = evt.keyCode; // prevent shorcut when user input text 

      if (currentTool === _Tool.default.Text) {
        return;
      } // key 'p'


      if (keyCode === 80) {
        setCurrentTool(_Tool.default.Stroke);
      } else if (keyCode === 82) {
        // key 'r'
        setCurrentTool(_Tool.default.Shape);
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          shapeType: _Tool.ShapeType.Rectangle
        }));
      } else if (keyCode === 79) {
        // key 'o'
        setCurrentTool(_Tool.default.Shape);
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          shapeType: _Tool.ShapeType.Oval
        }));
      } else if (keyCode === 84) {
        // key 't'
        setCurrentTool(_Tool.default.Text);
      }
    };

    addEventListener('keydown', keydownHandler);
    return function () {
      return removeEventListener('keydown', keydownHandler);
    };
  }, [currentTool]);

  var renderWithLayout = function renderWithLayout(toolbar, sketchPad) {
    if (toolbarPlacement === 'left' || _utils.isMobileDevice) {
      return /*#__PURE__*/_react.default.createElement(_Layout.Layout, {
        style: {
          flexDirection: 'row'
        }
      }, /*#__PURE__*/_react.default.createElement(Sider, {
        width: _utils.isMobileDevice ? 40 : 55,
        theme: "light"
      }, toolbar), /*#__PURE__*/_react.default.createElement(Content, null, sketchPad));
    } else if (toolbarPlacement === 'top') {
      return /*#__PURE__*/_react.default.createElement(_Layout.Layout, {
        hasSider: false
      }, /*#__PURE__*/_react.default.createElement(Header, null, toolbar), /*#__PURE__*/_react.default.createElement(Content, null, sketchPad));
    } else if (toolbarPlacement === 'right') {
      return /*#__PURE__*/_react.default.createElement(_Layout.Layout, {
        style: {
          flexDirection: 'row'
        }
      }, /*#__PURE__*/_react.default.createElement(Content, null, sketchPad), /*#__PURE__*/_react.default.createElement(Sider, {
        width: 55,
        theme: "light"
      }, toolbar));
    } else {
      return null;
    }
  };

  var enableSketchPadContextValue = (0, _react.useMemo)(function () {
    return {
      enable: enableSketchPad[0],
      setEnable: enableSketchPad[1]
    };
  }, _toConsumableArray(enableSketchPad));
  var config = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, _ConfigContext.DefaultConfig), {}, {
      showBackgroundTool: showBackgroundTool
    });
  }, [_ConfigContext.DefaultConfig, showBackgroundTool]);
  var locale = props.locale && _locales.default.messages[props.locale] ? props.locale : 'en-US';
  return /*#__PURE__*/_react.default.createElement(_ConfigContext.default.Provider, {
    value: config
  }, /*#__PURE__*/_react.default.createElement(_reactIntl.IntlProvider, {
    locale: locale,
    messages: _locales.default.messages[locale]
  }, /*#__PURE__*/_react.default.createElement(_EnableSketchPadContext.default.Provider, {
    value: enableSketchPadContextValue
  }, /*#__PURE__*/_react.default.createElement(_ConfigContext.default.Consumer, null, function (config) {
    var _refSketch$current;

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(config.prefixCls, "-container ").concat(clsssName || ''),
      style: _objectSpread({
        width: '100vw',
        height: '100vh'
      }, props.style || {})
    }, renderWithLayout( /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
      toolbarPlacement: toolbarPlacement,
      currentTool: currentTool,
      setCurrentTool: setCurrentTool,
      currentToolOption: currentToolOption,
      setCurrentToolOption: setCurrentToolOption,
      viewMatrix: viewMatrix,
      setViewMatrix: setViewMatrix,
      scale: scale,
      getCanvas: (_refSketch$current = refSketch.current) === null || _refSketch$current === void 0 ? void 0 : _refSketch$current.getCanvas,
      selectImage: function selectImage(image) {
        if (image && refSketch.current) {
          refSketch.current.selectImage(image);
        }
      },
      selectBackgroundImage: function selectBackgroundImage(image) {
        if (image && refSketch.current) {
          refSketch.current.selectBackgroundImage(image);
        }
      },
      removeBackgroundImage: function removeBackgroundImage() {
        if (refSketch.current) {
          refSketch.current.removeBackgroundImage();
        }
      },
      undo: function undo() {
        if (refSketch.current) {
          refSketch.current.undo();
        }
      },
      redo: function redo() {
        if (refSketch.current) {
          refSketch.current.redo();
        }
      },
      clear: function clear() {
        if (refSketch.current) {
          refSketch.current.clear();
        }
      },
      save: function save() {
        if (refSketch.current) {
          refSketch.current.save(onSave);
        }
      }
    }), /*#__PURE__*/_react.default.createElement(AnimatedSketchPad, {
      ref: refSketch,
      userId: userId,
      currentTool: currentTool,
      setCurrentTool: setCurrentTool,
      currentToolOption: currentToolOption,
      viewMatrix: viewMatrix,
      onViewMatrixChange: setViewMatrix,
      operations: operations,
      initialBackground: initialBackground,
      onChange: onChange
    })));
  }))));
};

var _default = Block;
exports.default = _default;