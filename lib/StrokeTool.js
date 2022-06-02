"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onStrokeMouseDown = onStrokeMouseDown;
exports.onStrokeMouseMove = onStrokeMouseMove;
exports.onStrokeMouseUp = onStrokeMouseUp;
exports.moveStoke = exports.useStrokeDropdown = exports.drawStroke = exports.drawEraser = void 0;

var _react = _interopRequireDefault(require("react"));

var _Tool = _interopRequireWildcard(require("./enums/Tool"));

var _Icon = _interopRequireDefault(require("./icons/Icon"));

require("./StrokeTool.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Stroke tool
var stroke = null;
var points = [];

var drawLine = function drawLine(context, item, start, _ref) {
  var x = _ref.x,
      y = _ref.y;
  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.beginPath();
  context.lineWidth = item.size;
  context.strokeStyle = item.color;
  context.globalCompositeOperation = 'source-over';
  context.moveTo(start.x, start.y);
  var xc = (start.x + x) / 2;
  var yc = (start.y + y) / 2;
  context.quadraticCurveTo(xc, yc, x, y);
  context.closePath();
  context.stroke();
};

var drawEraser = function drawEraser(stroke, context, hover) {
  var points = stroke.points.filter(function (_, index) {
    return index % 2 === 0;
  });

  if (points.length < 3) {
    return;
  }

  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.beginPath();
  context.lineWidth = stroke.size;
  var originalCompositeOperation = context.globalCompositeOperation;
  context.globalCompositeOperation = 'destination-out';
  context.strokeStyle = hover ? '#3AB1FE' : stroke.color; // move to the first point

  context.moveTo(points[0].x, points[0].y);
  var i = 0;

  for (i = 1; i < points.length - 2; i++) {
    var xc = (points[i].x + points[i + 1].x) / 2;
    var yc = (points[i].y + points[i + 1].y) / 2;
    context.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  } // curve through the last two points


  context.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  context.stroke();
  context.globalCompositeOperation = originalCompositeOperation;
};

exports.drawEraser = drawEraser;

var drawStroke = function drawStroke(stroke, context, hover) {
  var points = stroke.points.filter(function (_, index) {
    return index % 2 === 0;
  });

  if (points.length < 3) {
    return;
  }

  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.beginPath();
  context.lineWidth = stroke.size;
  context.globalCompositeOperation = 'source-over';
  context.strokeStyle = hover ? '#3AB1FE' : stroke.color; // move to the first point

  context.moveTo(points[0].x, points[0].y);
  var i = 0;

  for (i = 1; i < points.length - 2; i++) {
    var xc = (points[i].x + points[i + 1].x) / 2;
    var yc = (points[i].y + points[i + 1].y) / 2;
    context.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  } // curve through the last two points


  context.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  context.stroke();
};

exports.drawStroke = drawStroke;

function onStrokeMouseDown(x, y, toolOption) {
  stroke = {
    color: toolOption.strokeColor,
    size: toolOption.strokeSize,
    points: [{
      x: x,
      y: y
    }]
  };
  return [stroke];
}

function onStrokeMouseMove(x, y, context) {
  if (!stroke) return [];
  var newPoint = {
    x: x,
    y: y
  };
  var start = stroke.points.slice(-1)[0];
  drawLine(context, stroke, start, newPoint);
  stroke.points.push(newPoint);
  points.push(newPoint);
  return [stroke];
}

function onStrokeMouseUp(setCurrentTool, handleCompleteOperation) {
  var currentTool = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Tool.default.Stroke;

  if (!stroke) {
    return;
  }

  var item = stroke;
  points = [];
  stroke = null;

  if (item) {
    var lineData = item;
    var pos = null;
    var xMax = -Infinity,
        yMax = -Infinity,
        xMin = lineData.points[0].x,
        yMin = lineData.points[0].y;
    lineData.points.forEach(function (p) {
      if (p.x > xMax) {
        xMax = p.x;
      }

      if (p.x < xMin) {
        xMin = p.x;
      }

      if (p.y > yMax) {
        yMax = p.y;
      }

      if (p.y < yMin) {
        yMin = p.y;
      }
    });
    pos = {
      x: xMin,
      y: yMin,
      w: xMax - xMin,
      h: yMax - yMin
    };
    handleCompleteOperation(currentTool, lineData, pos);
  }

  return [item];
}

var useStrokeDropdown = function useStrokeDropdown(config) {
  var currentToolOption = config.currentToolOption,
      setCurrentToolOption = config.setCurrentToolOption,
      setCurrentTool = config.setCurrentTool,
      basePrefixCls = config.prefixCls;
  var prefixCls = basePrefixCls + '-strokeTool';
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-strokeMenu")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-colorAndSize")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-strokeSelector")
  }, _Tool.strokeSize.map(function (size) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: size,
      onClick: function onClick(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          strokeSize: size
        }));
        setCurrentTool && setCurrentTool(_Tool.default.Stroke);
      },
      onTouchStart: function onTouchStart(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          strokeSize: size
        }));
        setCurrentTool && setCurrentTool(_Tool.default.Stroke);
      },
      style: {
        width: size + 4,
        height: size + 4,
        background: size === currentToolOption.strokeSize ? '#666666' : '#EEEEEE'
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
      onClick: function onClick(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          strokeColor: color
        }));
        setCurrentTool && setCurrentTool(_Tool.default.Stroke);
      },
      onTouchStart: function onTouchStart(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          strokeColor: color
        }));
        setCurrentTool && setCurrentTool(_Tool.default.Stroke);
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefixCls, "-fill"),
      style: {
        background: color
      }
    }), currentToolOption.strokeColor === color ? /*#__PURE__*/_react.default.createElement(_Icon.default, {
      type: "check",
      style: color === '#ffffff' ? {
        color: '#979797'
      } : {
        color: '#fff'
      }
    }) : null);
  }))));
};

exports.useStrokeDropdown = useStrokeDropdown;

var moveStoke = function moveStoke(prev, oldPos, newPos) {
  var diffX = newPos.x - oldPos.x;
  var diffY = newPos.y - oldPos.y;
  return prev.points.map(function (p) {
    return {
      x: p.x + diffX,
      y: p.y + diffY
    };
  });
};

exports.moveStoke = moveStoke;