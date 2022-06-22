"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTextDropdown = exports.drawText = exports.font = exports.onTextComplete = exports.onTextMouseUp = exports.initTextTool = void 0;

var _react = _interopRequireDefault(require("react"));

var _Tool = _interopRequireWildcard(require("./enums/Tool"));

var _utils = require("./utils");

var _Icon = _interopRequireDefault(require("./icons/Icon"));

require("./TextTool.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var currentText = '';
var currentColor = '';
var currentSize = _Tool.TextSize.Default;

var initTextTool = function initTextTool() {
  currentText = '';
};

exports.initTextTool = initTextTool;
var textSize = [_Tool.TextSize.Small, _Tool.TextSize.Default, _Tool.TextSize.Large];

var onTextMouseUp = function onTextMouseUp(e, toolOption, scale, refInput, refCanvas, intl) {
  if (!currentText && refInput.current && refCanvas.current) {
    var textarea = refInput.current;
    var canvas = refCanvas.current;

    var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
        top = _canvas$getBoundingCl.top,
        left = _canvas$getBoundingCl.left;

    var x = e.clientX - left;
    var y = e.clientY - top;
    textarea.style.display = 'block';
    textarea.style.left = x + canvas.offsetLeft + 'px';
    textarea.style.top = y + canvas.offsetTop + 'px';
    textarea.style.fontSize = toolOption.textSize * scale + 'px';
    textarea.style.lineHeight = toolOption.textSize * scale + 'px';
    textarea.style.height = toolOption.textSize * scale + 'px';
    textarea.style.color = toolOption.textColor;
    textarea.innerText = typeof toolOption.defaultText === 'string' ? toolOption.defaultText : intl.formatMessage(toolOption.defaultText);

    if (_utils.isMobileDevice) {
      textarea.focus();
    }

    setTimeout(function () {
      if (getSelection && Range) {
        var selection = getSelection();

        if (selection) {
          selection.removeAllRanges();
          var range = new Range();
          range.selectNodeContents(textarea);
          selection.addRange(range);
        }
      }
    }, 0);
    currentText = typeof toolOption.defaultText === 'string' ? toolOption.defaultText : intl.formatMessage(toolOption.defaultText);
    currentColor = toolOption.textColor;
    currentSize = toolOption.textSize;
  }
};

exports.onTextMouseUp = onTextMouseUp;

var onTextComplete = function onTextComplete(refInput, refCanvas, viewMatrix, scale, handleCompleteOperation, setCurrentTool) {
  if (currentText && refInput.current && refCanvas.current) {
    var textarea = refInput.current;
    var text = textarea.innerText;

    var _textarea$getBounding = textarea.getBoundingClientRect(),
        top = _textarea$getBounding.top,
        left = _textarea$getBounding.left,
        width = _textarea$getBounding.width,
        height = _textarea$getBounding.height;

    width = 1 / scale * width;
    var lineHeight = parseInt(textarea.style.lineHeight.replace('px', ''));
    height = 1 / scale * lineHeight * text.split('\n').length;
    var currentPos = (0, _utils.mapClientToCanvas)({
      clientX: left,
      clientY: top
    }, refCanvas.current, viewMatrix);
    textarea.style.display = 'none';
    var pos = {
      x: currentPos[0],
      y: currentPos[1],
      w: width,
      h: height
    };
    handleCompleteOperation(_Tool.default.Text, {
      text: text,
      color: currentColor,
      size: currentSize
    }, pos);
    currentText = '';
  }
};

exports.onTextComplete = onTextComplete;
var font = "\"PingFang SC\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Helvetica, \"Hiragino Sans GB\", \"Microsoft YaHei\", SimSun, sans-serif, \"localant\"";
exports.font = font;

var drawText = function drawText(item, context, pos) {
  context.globalCompositeOperation = 'source-over';
  context.font = "".concat(item.size, "px ").concat(font);
  context.fillStyle = item.color || '#4a4a4a';
  context.textBaseline = 'middle';
  var lines = item.text.split('\n');

  for (var i = 0; i < lines.length; i++) {
    context.fillText(lines[i], pos.x, pos.y + item.size / 2 + i * item.size); // add half line height cause to textBaseline middle
  }
};

exports.drawText = drawText;

var useTextDropdown = function useTextDropdown(config) {
  var currentToolOption = config.currentToolOption,
      setCurrentToolOption = config.setCurrentToolOption,
      setCurrentTool = config.setCurrentTool,
      basePrefixCls = config.prefixCls,
      intl = config.intl;
  var prefixCls = basePrefixCls + '-textTool';
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-strokeMenu")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-colorAndSize")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-textSizeSelector")
  }, textSize.map(function (size) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: size,
      onTouchStart: function onTouchStart(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          textSize: size
        }));
        setCurrentTool && setCurrentTool(_Tool.default.Text);
      },
      onClick: function onClick(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          textSize: size
        }));
        setCurrentTool && setCurrentTool(_Tool.default.Text);
      },
      style: {
        color: size === currentToolOption.textSize ? '#666' : '#ccc'
      }
    }, size === _Tool.TextSize.Small ? intl.formatMessage({
      id: 'umi.block.sketch.text.size.small'
    }) : size === _Tool.TextSize.Default ? intl.formatMessage({
      id: 'umi.block.sketch.text.size.default'
    }) : intl.formatMessage({
      id: 'umi.block.sketch.text.size.large'
    }));
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-split")
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-palette")
  }, _Tool.strokeColor.map(function (color) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefixCls, "-color"),
      key: color,
      onClick: function onClick(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          textColor: color
        }));
        setCurrentTool && setCurrentTool(_Tool.default.Text);
      },
      onTouchStart: function onTouchStart(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          textColor: color
        }));
        setCurrentTool && setCurrentTool(_Tool.default.Text);
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefixCls, "-fill"),
      style: {
        background: color
      }
    }), currentToolOption.textColor === color ? /*#__PURE__*/_react.default.createElement(_Icon.default, {
      type: "check",
      style: color === '#ffffff' ? {
        color: '#979797'
      } : {
        color: '#fff'
      }
    }) : null);
  }))));
};

exports.useTextDropdown = useTextDropdown;