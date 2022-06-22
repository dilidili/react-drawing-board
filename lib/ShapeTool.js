"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useShapeDropdown = exports.drawRectangle = exports.onShapeMouseMove = exports.onShapeMouseUp = exports.onShapeMouseDown = void 0;

var _Tool = _interopRequireWildcard(require("./enums/Tool"));

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("./icons/Icon"));

require("./ShapeTool.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var shape = null;

var onShapeMouseDown = function onShapeMouseDown(x, y, toolOption) {
  shape = {
    type: toolOption.shapeType,
    color: toolOption.shapeBorderColor,
    size: toolOption.shapeBorderSize,
    start: {
      x: x,
      y: y
    },
    end: null
  };
  return [shape];
};

exports.onShapeMouseDown = onShapeMouseDown;

var draw = function draw(item, mouseX, mouseY, context, hover) {
  var startX = mouseX < item.start.x ? mouseX : item.start.x;
  var startY = mouseY < item.start.y ? mouseY : item.start.y;
  var widthX = Math.abs(item.start.x - mouseX);
  var widthY = Math.abs(item.start.y - mouseY);

  if (item.type === _Tool.ShapeType.Rectangle) {
    context.beginPath();
    context.lineWidth = item.size;
    context.strokeStyle = item.color;
    context.rect(startX, startY, widthX, widthY);
    context.stroke();
    context.closePath();

    if (hover) {
      context.beginPath();
      context.strokeStyle = '#3AB1FE';
      context.lineWidth = item.size / 2;
      context.rect(startX - item.size / 2, startY - item.size / 2, widthX + item.size, widthY + item.size);
      context.stroke();
      context.closePath();
    }
  } else if (item.type === _Tool.ShapeType.Line) {
    context.beginPath();
    context.lineWidth = item.size;
    context.strokeStyle = item.color;
    context.lineCap = 'round';
    context.moveTo(item.start.x, item.start.y);
    context.lineTo(mouseX, mouseY);
    context.stroke();
    context.closePath();

    if (hover) {
      context.beginPath();
      context.strokeStyle = '#3AB1FE';
      context.lineWidth = item.size;
      context.moveTo(item.start.x, item.start.y);
      context.lineTo(mouseX, mouseY);
      context.stroke();
      context.closePath();
    }
  } else if (item.type === _Tool.ShapeType.Oval) {
    var endX = mouseX >= item.start.x ? mouseX : item.start.x;
    var endY = mouseY >= item.start.y ? mouseY : item.start.y;
    var radiusX = (endX - startX) * 0.5;
    var radiusY = (endY - startY) * 0.5;
    var centerX = startX + radiusX;
    var centerY = startY + radiusY;
    context.beginPath();
    context.lineWidth = item.size;
    context.strokeStyle = item.color;

    if (typeof context.ellipse === 'function') {
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    } else {
      var xPos;
      var yPos;
      var i = 0;

      for (i; i < 2 * Math.PI; i += 0.01) {
        xPos = centerX - radiusY * Math.sin(i) * Math.sin(0) + radiusX * Math.cos(i) * Math.cos(0);
        yPos = centerY + radiusX * Math.cos(i) * Math.sin(0) + radiusY * Math.sin(i) * Math.cos(0);

        if (i === 0) {
          context.moveTo(xPos, yPos);
        } else {
          context.lineTo(xPos, yPos);
        }
      }
    }

    context.stroke();
    context.closePath();

    if (hover) {
      context.beginPath();
      context.strokeStyle = '#3AB1FE';
      context.lineWidth = item.size / 2;

      if (typeof context.ellipse === 'function') {
        context.ellipse(centerX, centerY, radiusX + item.size / 2, radiusY + item.size / 2, 0, 0, 2 * Math.PI);
      } else {
        var _xPos;

        var _yPos;

        var _i = 0;

        for (_i; _i < 2 * Math.PI; _i += 0.01) {
          _xPos = centerX - (radiusY + item.size / 2) * Math.sin(_i) * Math.sin(0) + (radiusX + item.size / 2) * Math.cos(_i) * Math.cos(0);
          _yPos = centerY + (radiusX + item.size / 2) * Math.cos(_i) * Math.sin(0) + (radiusY + item.size / 2) * Math.sin(_i) * Math.cos(0);

          if (_i === 0) {
            context.moveTo(_xPos, _yPos);
          } else {
            context.lineTo(_xPos, _yPos);
          }
        }
      }

      context.stroke();
      context.closePath();
    }
  }
};

var onShapeMouseUp = function onShapeMouseUp(x, y, setCurrentTool, handleCompleteOperation) {
  if (!shape) return;
  var item = shape;
  shape = null;
  item.end = {
    x: x,
    y: y
  }; // avoid touch by mistake.

  if (Math.abs(item.start.x - item.end.x) + Math.abs(item.start.x - item.end.x) < 6) {
    return;
  }

  handleCompleteOperation(_Tool.default.Shape, item, {
    x: Math.min(item.start.x, item.end.x),
    y: Math.min(item.start.y, item.end.y),
    w: Math.abs(item.end.x - item.start.x),
    h: Math.abs(item.end.y - item.start.y)
  });
  return [item];
};

exports.onShapeMouseUp = onShapeMouseUp;

var onShapeMouseMove = function onShapeMouseMove(x, y, context) {
  if (!shape) return;
  draw(shape, x, y, context, false);
};

exports.onShapeMouseMove = onShapeMouseMove;

var drawRectangle = function drawRectangle(rect, context, hover) {
  if (!rect.end) return null;
  draw(rect, rect.end.x, rect.end.y, context, hover);
};

exports.drawRectangle = drawRectangle;

var useShapeDropdown = function useShapeDropdown(config) {
  var currentToolOption = config.currentToolOption,
      setCurrentToolOption = config.setCurrentToolOption,
      setCurrentTool = config.setCurrentTool,
      basePrefixCls = config.prefixCls;
  var prefixCls = basePrefixCls + '-strokeTool';
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-strokeMenu")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-shape")
  }, /*#__PURE__*/_react.default.createElement("div", {
    onClick: function onClick(evt) {
      evt.stopPropagation();
      setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
        shapeType: _Tool.ShapeType.Rectangle
      }));
      setCurrentTool(_Tool.default.Shape);
    },
    onTouchStart: function onTouchStart(evt) {
      evt.stopPropagation();
      setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
        shapeType: _Tool.ShapeType.Rectangle
      }));
      setCurrentTool(_Tool.default.Shape);
    },
    className: "".concat(prefixCls, "-shapeItem"),
    style: currentToolOption.shapeType === _Tool.ShapeType.Rectangle ? {
      background: 'rgba(238, 238, 238, 1)'
    } : {}
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-rect"),
    style: currentToolOption.shapeType === _Tool.ShapeType.Rectangle ? {
      borderColor: currentToolOption.shapeBorderColor
    } : {}
  })), /*#__PURE__*/_react.default.createElement("div", {
    onTouchStart: function onTouchStart(evt) {
      evt.stopPropagation();
      setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
        shapeType: _Tool.ShapeType.Oval
      }));
      setCurrentTool(_Tool.default.Shape);
    },
    onClick: function onClick(evt) {
      evt.stopPropagation();
      setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
        shapeType: _Tool.ShapeType.Oval
      }));
      setCurrentTool(_Tool.default.Shape);
    },
    className: "".concat(prefixCls, "-shapeItem"),
    style: currentToolOption.shapeType === _Tool.ShapeType.Oval ? {
      background: 'rgba(238, 238, 238, 1)'
    } : {}
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-circle"),
    style: currentToolOption.shapeType === _Tool.ShapeType.Oval ? {
      borderColor: currentToolOption.shapeBorderColor
    } : {}
  })), /*#__PURE__*/_react.default.createElement("div", {
    onTouchStart: function onTouchStart(evt) {
      evt.stopPropagation();
      setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
        shapeType: _Tool.ShapeType.Line
      }));
      setCurrentTool(_Tool.default.Shape);
    },
    onClick: function onClick(evt) {
      evt.stopPropagation();
      setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
        shapeType: _Tool.ShapeType.Line
      }));
      setCurrentTool(_Tool.default.Shape);
    },
    className: "".concat(prefixCls, "-shapeItem"),
    style: currentToolOption.shapeType === _Tool.ShapeType.Line ? {
      background: 'rgba(238, 238, 238, 1)'
    } : {}
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-line"),
    style: currentToolOption.shapeType === _Tool.ShapeType.Line ? {
      borderColor: currentToolOption.shapeBorderColor
    } : {}
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    version: '1.1',
    viewBox: '0 0 100 100'
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: 'M0 99 L99 0 L100 1 L1 100',
    strokeWidth: '5',
    stroke: 'black'
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-colorAndSize")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-strokeSelector")
  }, _Tool.strokeSize.map(function (size) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: size,
      onTouchStart: function onTouchStart(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          shapeBorderSize: size
        }));
        setCurrentTool(_Tool.default.Shape);
      },
      onClick: function onClick(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          shapeBorderSize: size
        }));
        setCurrentTool(_Tool.default.Shape);
      },
      style: {
        width: size + 4,
        height: size + 4,
        background: size === currentToolOption.shapeBorderSize ? '#666666' : '#EEEEEE'
      }
    });
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-split")
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-palette")
  }, _Tool.strokeColor.map(function (color) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefixCls, "-color"),
      key: color,
      onTouchStart: function onTouchStart(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          shapeBorderColor: color
        }));
        setCurrentTool(_Tool.default.Shape);
      },
      onClick: function onClick(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          shapeBorderColor: color
        }));
        setCurrentTool(_Tool.default.Shape);
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefixCls, "-fill"),
      style: {
        background: color
      }
    }), currentToolOption.shapeBorderColor === color ? /*#__PURE__*/_react.default.createElement(_Icon.default, {
      type: "check",
      style: color === '#ffffff' ? {
        color: '#979797'
      } : {
        color: '#fff'
      }
    }) : null);
  }))));
};

exports.useShapeDropdown = useShapeDropdown;