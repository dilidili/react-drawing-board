"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onSelectMouseUp = exports.onSelectMouseDoubleClick = exports.onSelectMouseMove = exports.onSelectMouseDown = exports.SELECT_PADDING = void 0;

var _Tool = _interopRequireDefault(require("./enums/Tool"));

var _TextTool = require("./TextTool");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var lastSelectX = 0;
var lastSelectY = 0;
var isDragging = false;
var startDragPos = null;
var startDragViewMatrix = [1, 0, 0, 1, 0, 0];
var isLazy = false;
var SELECT_PADDING = 10;
exports.SELECT_PADDING = SELECT_PADDING;

var getRotatedWidgets = function getRotatedWidgets(px, py, ox, oy, rotate) {
  var x = Math.cos(rotate) * (px - ox) - Math.sin(rotate) * (py - oy) + ox;
  var y = Math.sin(rotate) * (px - ox) + Math.cos(rotate) * (py - oy) + oy;
  return [x, y];
};

function rectContain(_ref, _ref2, rotate) {
  var parentX = _ref.x,
      parentY = _ref.y,
      width = _ref.w,
      height = _ref.h;

  var _ref3 = _slicedToArray(_ref2, 2),
      x = _ref3[0],
      y = _ref3[1];

  if (rotate) {
    var _getRotatedWidgets = getRotatedWidgets(x, y, parentX + width / 2, parentY + height / 2, -rotate);

    var _getRotatedWidgets2 = _slicedToArray(_getRotatedWidgets, 2);

    x = _getRotatedWidgets2[0];
    y = _getRotatedWidgets2[1];
  }

  return !!(x >= parentX && x <= parentX + width && y >= parentY && y <= parentY + height);
}

var findSelectedItem = function findSelectedItem(items, pos, scale) {
  var selectPadding = Math.max(SELECT_PADDING * 1 / scale || 0, SELECT_PADDING);

  for (var i = items.length - 1; i >= 0; i--) {
    var item = items[i];

    if ((item.tool === _Tool.default.Stroke || item.tool === _Tool.default.Eraser) && rectContain(item.pos, pos, 0)) {
      var points = item.points;

      if (points.some(function (p) {
        return Math.pow(p.x - pos[0], 2) + Math.pow(p.y - pos[1], 2) < Math.pow(selectPadding * 2, 2);
      })) {
        return item;
      }
    } else if (item.tool === _Tool.default.Shape || item.tool === _Tool.default.Text || item.tool === _Tool.default.Image) {
      var rotate = 0;
      var selectedItem = rectContain({
        x: item.pos.x - selectPadding,
        y: item.pos.y - selectPadding,
        w: item.pos.w + 2 * selectPadding,
        h: item.pos.h + 2 * selectPadding
      }, pos, rotate) ? item : null;

      if (selectedItem) {
        return _objectSpread({}, selectedItem);
      }
    }
  }

  return null;
};

var onSelectMouseDown = function onSelectMouseDown(e, x, y, scale, operationListState, viewMatrix, setSelectedOperation) {
  var pos = [x, y];
  lastSelectX = e.clientX;
  lastSelectY = e.clientY;
  var selectedItem = findSelectedItem(operationListState.reduced, pos, scale);
  setSelectedOperation(selectedItem);

  if (selectedItem !== null) {
    startDragPos = selectedItem.pos;
  }

  isDragging = true;
  startDragViewMatrix = viewMatrix;
};

exports.onSelectMouseDown = onSelectMouseDown;

var onSelectMouseMove = function onSelectMouseMove(e, x, y, scale, operationListState, selectedOperation, setViewMatrix, setHoverOperationId, handleCompleteOperation, operationListDispatch, setSelectedOperation) {
  if (isDragging) {
    var items = operationListState.queue;
    var diff = {
      x: (e.clientX - lastSelectX) / scale,
      y: (e.clientY - lastSelectY) / scale
    };

    if (selectedOperation && startDragPos) {
      var lastOperation = items[items.length - 1];

      if (lastOperation && lastOperation.tool === _Tool.default.Update && lastOperation.operationId === selectedOperation.id && lastOperation.data.pos) {
        var update = lastOperation;

        if (update.data.pos) {
          update.data.pos = _objectSpread(_objectSpread({}, update.data.pos), {}, {
            x: startDragPos.x + diff.x,
            y: startDragPos.y + diff.y
          });
          operationListDispatch({
            type: 'replaceLast',
            payload: {
              operation: update
            }
          });
        }
      } else {
        isLazy = true;
        handleCompleteOperation(_Tool.default.LazyUpdate, {
          operationId: selectedOperation.id,
          data: {
            pos: _objectSpread(_objectSpread({}, startDragPos), {}, {
              x: startDragPos.x + diff.x,
              y: startDragPos.y + diff.y
            })
          }
        });
      }

      setSelectedOperation(_objectSpread(_objectSpread({}, selectedOperation), {}, {
        pos: _objectSpread(_objectSpread({}, startDragPos), {}, {
          x: startDragPos.x + diff.x,
          y: startDragPos.y + diff.y
        })
      }));
    } else {
      setViewMatrix((0, _utils.matrix_multiply)([1, 0, 0, 1, diff.x * scale, diff.y * scale], startDragViewMatrix));
    }
  } else if (!_utils.isMobileDevice) {
    var pos = [x, y];
    var selectedItem = findSelectedItem(operationListState.reduced, pos, scale);
    setHoverOperationId(selectedItem ? selectedItem.id : selectedItem);
  }
};

exports.onSelectMouseMove = onSelectMouseMove;

var onSelectMouseDoubleClick = function onSelectMouseDoubleClick(x, y, scale, operationListState, handleCompleteOperation, viewMatrix, refInput, refCanvas, intl) {
  var pos = [x, y];
  var selectedItem = findSelectedItem(operationListState.reduced, pos, scale);

  if (selectedItem !== null && refCanvas.current) {
    if (selectedItem.tool === _Tool.default.Text) {
      var operation = selectedItem;

      var _viewMatrix = _slicedToArray(viewMatrix, 6),
          a = _viewMatrix[0],
          b = _viewMatrix[1],
          c = _viewMatrix[2],
          d = _viewMatrix[3],
          e = _viewMatrix[4],
          f = _viewMatrix[5];

      var canvas = refCanvas.current;

      var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
          top = _canvas$getBoundingCl.top,
          left = _canvas$getBoundingCl.left;

      handleCompleteOperation(_Tool.default.Remove, {
        operationId: selectedItem.id
      });
      (0, _TextTool.onTextMouseUp)({
        clientX: a * selectedItem.pos.x + c * selectedItem.pos.y + e + left,
        clientY: b * selectedItem.pos.x + d * selectedItem.pos.y + f + top
      }, {
        textSize: operation.size,
        textColor: operation.color,
        defaultText: operation.text
      }, scale, refInput, refCanvas, intl);
    }
  }
};

exports.onSelectMouseDoubleClick = onSelectMouseDoubleClick;

var onSelectMouseUp = function onSelectMouseUp(operationListDispatch) {
  if (isLazy) {
    isLazy = false;
    operationListDispatch({
      type: 'completeLazyUpdate'
    });
  }

  if (isDragging) {
    isDragging = false;
  }
};

exports.onSelectMouseUp = onSelectMouseUp;