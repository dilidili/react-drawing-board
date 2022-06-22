"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _reactIntl = require("react-intl");

var _Tool = _interopRequireDefault(require("./enums/Tool"));

var _SelectIcon = _interopRequireDefault(require("./svgs/SelectIcon"));

var _StrokeIcon = _interopRequireDefault(require("./svgs/StrokeIcon"));

var _ShapeIcon = _interopRequireDefault(require("./svgs/ShapeIcon"));

var _TextIcon = _interopRequireDefault(require("./svgs/TextIcon"));

var _ImageIcon = _interopRequireDefault(require("./svgs/ImageIcon"));

var _UndoIcon = _interopRequireDefault(require("./svgs/UndoIcon"));

var _RedoIcon = _interopRequireDefault(require("./svgs/RedoIcon"));

var _ClearIcon = _interopRequireDefault(require("./svgs/ClearIcon"));

var _SaveIcon = _interopRequireDefault(require("./svgs/SaveIcon"));

var _EraserIcon = _interopRequireDefault(require("./svgs/EraserIcon"));

var _BackgroundIcon = _interopRequireDefault(require("./svgs/BackgroundIcon"));

var _StrokeTool = require("./StrokeTool");

var _ShapeTool = require("./ShapeTool");

var _BackgroundTool = require("./BackgroundTool");

var _Layout = require("./Layout");

var _classnames = _interopRequireDefault(require("classnames"));

require("./Toolbar.css");

var _utils = require("./utils");

var _ConfigContext = _interopRequireDefault(require("./ConfigContext"));

var _EnableSketchPadContext = _interopRequireDefault(require("./contexts/EnableSketchPadContext"));

var _TextTool = require("./TextTool");

var _ZoomOutIcon = _interopRequireDefault(require("./svgs/ZoomOutIcon"));

var _ZoomInIcon = _interopRequireDefault(require("./svgs/ZoomInIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var useTools = function useTools() {
  var _useContext = (0, _react.useContext)(_ConfigContext.default),
      showBackgroundTool = _useContext.showBackgroundTool,
      prefixCls = _useContext.prefixCls;

  var tools = (0, _react.useMemo)(function () {
    return [{
      label: 'umi.block.sketch.select',
      icon: _SelectIcon.default,
      type: _Tool.default.Select
    }, {
      label: 'umi.block.sketch.pencil',
      icon: _StrokeIcon.default,
      type: _Tool.default.Stroke,
      useDropdown: _StrokeTool.useStrokeDropdown
    }, {
      label: 'umi.block.sketch.eraser',
      icon: _EraserIcon.default,
      type: _Tool.default.Eraser
    }, {
      label: 'umi.block.sketch.text',
      icon: _TextIcon.default,
      type: _Tool.default.Text,
      useDropdown: _TextTool.useTextDropdown
    }, {
      label: 'umi.block.sketch.image',
      icon: _ImageIcon.default,
      type: _Tool.default.Image
    }, {
      label: 'umi.block.sketch.shape',
      icon: _ShapeIcon.default,
      type: _Tool.default.Shape,
      useDropdown: _ShapeTool.useShapeDropdown
    }].concat(_toConsumableArray(showBackgroundTool ? [{
      label: 'umi.block.sketch.background',
      icon: _BackgroundIcon.default,
      type: _Tool.default.Background,
      useDropdown: _BackgroundTool.useBackgroundDropdown
    }] : []), [{
      label: 'umi.block.sketch.undo',
      icon: _UndoIcon.default,
      type: _Tool.default.Undo,
      style: {
        marginLeft: 'auto'
      }
    }, {
      label: 'umi.block.sketch.redo',
      icon: _RedoIcon.default,
      type: _Tool.default.Redo
    }, {
      label: 'umi.block.sketch.clear',
      icon: _ClearIcon.default,
      type: _Tool.default.Clear,
      style: {
        marginRight: 'auto'
      }
    }], _toConsumableArray(!_utils.isMobileDevice ? [{
      label: 'umi.block.sketch.zoom-out',
      icon: _ZoomOutIcon.default,
      type: _Tool.default.ZoomOut
    }] : []), _toConsumableArray(!_utils.isMobileDevice ? [{
      label: 'umi.block.sketch.zoom-in',
      icon: _ZoomInIcon.default,
      type: _Tool.default.ZoomIn
    }] : []), _toConsumableArray(!_utils.isMobileDevice ? [{
      label: 'umi.block.sketch.save',
      icon: _SaveIcon.default,
      type: _Tool.default.Save,
      style: {
        backgroundColor: '#0A38A1',
        width: 50,
        height: 50,
        borderRadius: 8,
        marginTop: 'auto',
        marginBottom: 'auto'
      },
      className: "".concat(prefixCls, "-toolbar-save"),
      labelStyle: {
        color: 'white'
      }
    }] : []));
  }, [showBackgroundTool]);
  (0, _react.useEffect)(function () {
    (0, _TextTool.initTextTool)();
  }, []);
  return tools;
};

var Toolbar = function Toolbar(props) {
  var _classNames;

  var currentTool = props.currentTool,
      setCurrentTool = props.setCurrentTool,
      currentToolOption = props.currentToolOption,
      setCurrentToolOption = props.setCurrentToolOption,
      selectImage = props.selectImage,
      selectBackgroundImage = props.selectBackgroundImage,
      _removeBackgroundImage = props.removeBackgroundImage,
      viewMatrix = props.viewMatrix,
      setViewMatrix = props.setViewMatrix,
      scale = props.scale,
      undo = props.undo,
      redo = props.redo,
      clear = props.clear,
      save = props.save,
      getCanvas = props.getCanvas;
  var refFileInput = (0, _react.useRef)(null);
  var refBgFileInput = (0, _react.useRef)(null);
  var intl = (0, _reactIntl.useIntl)();

  var _useContext2 = (0, _react.useContext)(_ConfigContext.default),
      prefixCls = _useContext2.prefixCls;

  var enableSketchPadContext = (0, _react.useContext)(_EnableSketchPadContext.default);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      hideDropdown = _useState2[0],
      setHideDropdown = _useState2[1];

  var toolbarPrefixCls = prefixCls + '-toolbar';

  var handleFileChange = function handleFileChange(cb) {
    return function (e) {
      var file = e.target.files && e.target.files[0];
      e.target.value = '';

      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
          var base64data = reader.result;
          cb(base64data);
        };
      }
    };
  };

  var handleSelectImage = handleFileChange(selectImage);
  var handleSelectBackground = handleFileChange(selectBackgroundImage);
  var tools = useTools();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)((_classNames = {}, _defineProperty(_classNames, "".concat(toolbarPrefixCls, "-container"), true), _defineProperty(_classNames, "".concat(toolbarPrefixCls, "-mobile-container"), _utils.isMobileDevice), _classNames))
  }, tools.map(function (tool) {
    var _classNames2;

    var borderTopStyle = 'none';

    if (_utils.isMobileDevice) {
      if (tool.type === _Tool.default.Stroke && currentToolOption.strokeColor) {
        borderTopStyle = "3px solid ".concat(currentToolOption.strokeColor);
      }

      if (tool.type === _Tool.default.Shape && currentToolOption.shapeBorderColor) {
        borderTopStyle = "3px solid ".concat(currentToolOption.shapeBorderColor);
      }
    }

    var iconAnimateProps = (0, _reactSpring.useSpring)(_objectSpread({
      left: _utils.isMobileDevice && currentTool !== tool.type ? -12 : 0,
      borderTop: borderTopStyle
    }, tool.style || {}));

    var menu = /*#__PURE__*/_react.default.createElement(_reactSpring.animated.div, {
      className: (0, _classnames.default)((_classNames2 = {}, _defineProperty(_classNames2, "".concat(toolbarPrefixCls, "-icon"), true), _defineProperty(_classNames2, "".concat(toolbarPrefixCls, "-activeIcon"), currentTool === tool.type && !_utils.isMobileDevice), _defineProperty(_classNames2, "".concat(toolbarPrefixCls, "-mobile-icon"), _utils.isMobileDevice), _classNames2), tool.className),
      style: iconAnimateProps,
      onClick: function onClick() {
        if (tool.type === _Tool.default.Image && refFileInput.current) {
          refFileInput.current.click();
        } else if (tool.type === _Tool.default.Background) {} else if (tool.type === _Tool.default.Undo) {
          undo();
        } else if (tool.type === _Tool.default.Redo) {
          redo();
        } else if (tool.type === _Tool.default.Clear) {
          clear();
        } else if (tool.type === _Tool.default.Zoom) {} else if (tool.type === _Tool.default.ZoomIn && getCanvas) {
          setViewMatrix((0, _utils.zoom_matrix)(viewMatrix, scale + 0.1, getCanvas()));
        } else if (tool.type === _Tool.default.ZoomOut && getCanvas) {
          setViewMatrix((0, _utils.zoom_matrix)(viewMatrix, scale - 0.1, getCanvas()));
        } else if (tool.type === _Tool.default.Save) {
          save();
        } else {
          // Close the current open dropdown
          if (tool.type === currentTool) {
            setHideDropdown(function (hide) {
              return !hide;
            });
          } else {
            setHideDropdown(false);
          }

          setCurrentTool(tool.type);
        }
      },
      key: tool.label
    }, /*#__PURE__*/_react.default.createElement(tool.icon, null), !_utils.isMobileDevice ? /*#__PURE__*/_react.default.createElement("label", {
      className: "".concat(toolbarPrefixCls, "-iconLabel"),
      style: tool.labelStyle || {}
    }, tool.labelThunk ? tool.labelThunk(props) : intl.formatMessage({
      id: tool.label
    })) : null);

    if (tool.useDropdown) {
      var overlay = tool.useDropdown({
        currentToolOption: currentToolOption,
        setCurrentToolOption: setCurrentToolOption,
        setCurrentTool: setCurrentTool,
        prefixCls: prefixCls,
        selectBackgroundImage: function selectBackgroundImage() {
          refBgFileInput.current.click();
        },
        removeBackgroundImage: function removeBackgroundImage() {
          _removeBackgroundImage();
        },
        intl: intl
      });
      return /*#__PURE__*/_react.default.createElement(_Layout.Dropdown, {
        key: tool.label,
        overlay: overlay,
        forceHide: hideDropdown,
        forceVisible: currentTool === tool.type
      }, menu);
    } else {
      return menu;
    }
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    style: {
      display: 'none'
    },
    accept: "image/*",
    ref: refFileInput,
    onChange: handleSelectImage
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    style: {
      display: 'none'
    },
    accept: "image/*",
    ref: refBgFileInput,
    onChange: handleSelectBackground
  }));
};

var _default = Toolbar;
exports.default = _default;