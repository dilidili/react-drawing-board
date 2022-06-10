"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Tool = _interopRequireWildcard(require("./enums/Tool"));

var _reactIntl = require("react-intl");

var _utils = require("./utils");

var _StrokeTool = require("./StrokeTool");

var _ShapeTool = require("./ShapeTool");

var _ImageTool = require("./ImageTool");

var _TextTool = require("./TextTool");

var _SelectTool = require("./SelectTool");

var _lodash = require("lodash");

var _Icon = _interopRequireDefault(require("./icons/Icon"));

var _uuid = require("uuid");

var _sketch_stroke_cursor = _interopRequireDefault(require("./images/sketch_stroke_cursor"));

var _sketch_eraser_cursor = _interopRequireDefault(require("./images/sketch_eraser_cursor"));

var _gesture = require("./gesture");

var _EnableSketchPadContext = _interopRequireDefault(require("./contexts/EnableSketchPadContext"));

require("./SketchPad.css");

var _ConfigContext = _interopRequireDefault(require("./ConfigContext"));

var _reactUseGesture = require("react-use-gesture");

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

var DPR = window.devicePixelRatio || 1;
var SELECT_BOX_PADDING = 3;
var BackgroundOperationId = 'Background/' + (0, _uuid.v4)();

var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};

var reduceOperations = function reduceOperations(operations) {
  var undoHistory = [];
  operations = operations.sort(function (a, b) {
    return a.timestamp - b.timestamp;
  }); // convert background image to draw image

  var backgroundOperation;
  operations = operations.reduce(function (r, v) {
    if (v.tool === _Tool.default.Background) {
      backgroundOperation = v;
      return r;
    } else if (v.tool === _Tool.default.RemoveBackground) {
      backgroundOperation = undefined;
      return r;
    } else {
      r.push(v);
      return r;
    }
  }, []);
  operations = operations.reduce(function (r, v) {
    switch (v.tool) {
      case _Tool.default.Undo:
        if (r.length) {
          undoHistory.push(r.pop());
        }

        break;

      case _Tool.default.Redo:
        if (undoHistory.length) {
          r.push(undoHistory.pop());
        }

        break;

      default:
        undoHistory.splice(0);
        r.push(v);
        break;
    }

    return r;
  }, []);
  operations.forEach(function (v) {
    if (v.tool === _Tool.default.Update) {
      var update = v;
      var targetIndex = operations.findIndex(function (w) {
        return w && w.id === update.operationId;
      });

      if (~targetIndex) {
        var target = operations[targetIndex]; // @ts-ignore

        operations[targetIndex] = _objectSpread(_objectSpread({}, operations[targetIndex]), update.data); // move other properties related to pos

        if (update.data.pos) {
          switch (target.tool) {
            case _Tool.default.Eraser:
            case _Tool.default.Stroke:
              operations[targetIndex] = _objectSpread(_objectSpread({}, operations[targetIndex]), {
                points: (0, _StrokeTool.moveStoke)(target, target.pos, update.data.pos)
              });
              break;

            case _Tool.default.Shape:
              {
                var newOperation = _objectSpread({}, operations[targetIndex]);

                var shapeTarget = target;

                if (shapeTarget.type !== _Tool.ShapeType.Line) {
                  newOperation.start = {
                    x: newOperation.pos.x,
                    y: newOperation.pos.y
                  };
                  newOperation.end = {
                    x: newOperation.pos.x + newOperation.pos.w,
                    y: newOperation.pos.y + newOperation.pos.h
                  };
                } else {
                  // line tool need decide direction
                  if ((shapeTarget.end.x - shapeTarget.start.x) * (shapeTarget.end.y - shapeTarget.start.y) > 0) {
                    newOperation.start = {
                      x: newOperation.pos.x,
                      y: newOperation.pos.y
                    };
                    newOperation.end = {
                      x: newOperation.pos.x + newOperation.pos.w,
                      y: newOperation.pos.y + newOperation.pos.h
                    };
                  } else {
                    newOperation.start = {
                      x: newOperation.pos.x,
                      y: newOperation.pos.y + newOperation.pos.h
                    };
                    newOperation.end = {
                      x: newOperation.pos.x + newOperation.pos.w,
                      y: newOperation.pos.y
                    };
                  }
                }

                operations[targetIndex] = _objectSpread({}, newOperation);
                break;
              }

            default:
              break;
          }
        }
      }
    }
  });
  var removeIds = operations.filter(function (v) {
    return v.tool === _Tool.default.Remove;
  }).map(function (v) {
    return v.operationId;
  });
  operations = operations.filter(function (v) {
    return v.tool !== _Tool.default.Update && removeIds.indexOf(v.id) < 0;
  }); // keep Remove operation to keep undoable

  if (backgroundOperation) {
    operations.unshift(backgroundOperation);
  }

  return operations;
};

var operationListReducer = function operationListReducer(isControlled, onChange) {
  return function (state, action) {
    switch (action.type) {
      case 'add':
        {
          var operation = action.payload.operation;
          var isLazy = action.payload.isLazy;
          var newQueue = state.queue.concat([operation]);

          if (!isControlled || isLazy) {
            return {
              queue: newQueue,
              reduced: reduceOperations(newQueue)
            };
          } else {
            onChange && onChange(operation, newQueue);
            return state;
          }
        }

      case 'replaceLast':
        {
          var _operation = action.payload.operation;

          var _newQueue = state.queue.slice(0, -1).concat([_operation]);

          return {
            queue: _newQueue,
            reduced: reduceOperations(_newQueue)
          };
        }

      case 'replaceAll':
        {
          var _newQueue2 = action.payload.queue;
          return {
            queue: _newQueue2,
            reduced: reduceOperations(_newQueue2)
          };
        }

      case 'completeLazyUpdate':
        {
          var _operation2 = state.queue[state.queue.length - 1];

          if (isControlled && _operation2 && _operation2.tool === _Tool.default.Update) {
            onChange && onChange(_operation2, state.queue);
          }

          return state;
        }

      default:
        return state;
    }
  };
};

var ResizeDirection;

(function (ResizeDirection) {
  ResizeDirection["TopLeft"] = "TopLeft";
  ResizeDirection["TopCenter"] = "TopCenter";
  ResizeDirection["MiddleRight"] = "MiddleRight";
  ResizeDirection["MiddleLeft"] = "MiddleLest";
  ResizeDirection["BottomRight"] = "BottomRight";
  ResizeDirection["BottomCenter"] = "BottomCenter";
  ResizeDirection["BottomLeft"] = "BottomLeft";
})(ResizeDirection || (ResizeDirection = {}));

var isResizing = null;
var startResizePoint = [0, 0];
var startResizePos = null;

var useResizeHandler = function useResizeHandler(selectedOperation, viewMatrix, items, operationListDispatch, setSelectedOperation, handleCompleteOperation, refCanvas, prefixCls) {
  if (selectedOperation && (selectedOperation.tool === _Tool.default.Shape || selectedOperation.tool === _Tool.default.Image)) {
    var _viewMatrix = _slicedToArray(viewMatrix, 6),
        a = _viewMatrix[0],
        b = _viewMatrix[1],
        c = _viewMatrix[2],
        d = _viewMatrix[3],
        e = _viewMatrix[4],
        f = _viewMatrix[5];

    var pos = {
      x: selectedOperation.pos.x - SELECT_BOX_PADDING,
      y: selectedOperation.pos.y - SELECT_BOX_PADDING,
      w: selectedOperation.pos.w + 2 * SELECT_BOX_PADDING,
      h: selectedOperation.pos.h + 2 * SELECT_BOX_PADDING
    };
    var tl = [a * pos.x + c * pos.y + e, b * pos.x + d * pos.y + f];
    var br = [a * (pos.x + pos.w) + c * (pos.y + pos.h) + e, b * (pos.x + pos.w) + d * (pos.y + pos.h) + f];
    var w = br[0] - tl[0],
        h = br[1] - tl[1];

    var onMouseDown = function onMouseDown(direction) {
      return function (e) {
        e.stopPropagation();

        if (refCanvas.current) {
          isResizing = direction;
          startResizePoint = (0, _utils.mapClientToCanvas)(e, refCanvas.current, viewMatrix);
          startResizePos = _objectSpread({}, selectedOperation.pos);
        }
      };
    };

    var onTouchStart = function onTouchStart(direction) {
      return function (e) {
        e.stopPropagation();

        if (refCanvas.current && e.touches[0]) {
          isResizing = direction;
          startResizePoint = (0, _utils.mapClientToCanvas)(e.touches[0], refCanvas.current, viewMatrix);
          startResizePos = _objectSpread({}, selectedOperation.pos);
        }
      };
    };

    var onMouseMove = function onMouseMove(e) {
      if (selectedOperation && isResizing && refCanvas.current && startResizePos) {
        var _pos = (0, _utils.mapClientToCanvas)(e, refCanvas.current, viewMatrix);

        var diff = {
          x: _pos[0] - startResizePoint[0],
          y: _pos[1] - startResizePoint[1]
        };

        var updatePos = _objectSpread({}, startResizePos);

        if (isResizing === ResizeDirection.TopLeft) {
          var _selectedOperation$po, _selectedOperation$po2;

          diff.x = Math.min(diff.x, updatePos.w);
          diff.y = Math.min(diff.y, updatePos.h);
          updatePos.x += diff.x;
          updatePos.w -= diff.x; // Keep the diff as same radio of selected item

          if ((selectedOperation === null || selectedOperation === void 0 ? void 0 : (_selectedOperation$po = selectedOperation.pos) === null || _selectedOperation$po === void 0 ? void 0 : _selectedOperation$po.w) && ((_selectedOperation$po2 = selectedOperation.pos) === null || _selectedOperation$po2 === void 0 ? void 0 : _selectedOperation$po2.h)) {
            var _selectedOperation$po3;

            var ratio = (selectedOperation === null || selectedOperation === void 0 ? void 0 : selectedOperation.pos.w) / (selectedOperation === null || selectedOperation === void 0 ? void 0 : (_selectedOperation$po3 = selectedOperation.pos) === null || _selectedOperation$po3 === void 0 ? void 0 : _selectedOperation$po3.h);
            updatePos.h = updatePos.w / ratio;
            updatePos.y += diff.x / ratio;
          } else {
            updatePos.y += diff.y;
            updatePos.h -= diff.y;
          }
        } else if (isResizing === ResizeDirection.TopCenter) {
          diff.y = Math.min(diff.y, updatePos.h);
          updatePos.y += diff.y;
          updatePos.h -= diff.y;
        } else if (isResizing === ResizeDirection.MiddleRight) {
          diff.x = Math.max(diff.x, -updatePos.w);
          updatePos.w += diff.x;
        } else if (isResizing === ResizeDirection.BottomRight) {
          var _selectedOperation$po4, _selectedOperation$po5;

          diff.x = Math.max(diff.x, -updatePos.w);
          updatePos.w += diff.x; // Keep the diff as same radio of selected item

          if ((selectedOperation === null || selectedOperation === void 0 ? void 0 : (_selectedOperation$po4 = selectedOperation.pos) === null || _selectedOperation$po4 === void 0 ? void 0 : _selectedOperation$po4.w) && ((_selectedOperation$po5 = selectedOperation.pos) === null || _selectedOperation$po5 === void 0 ? void 0 : _selectedOperation$po5.h)) {
            var _selectedOperation$po6;

            var _ratio = (selectedOperation === null || selectedOperation === void 0 ? void 0 : selectedOperation.pos.w) / (selectedOperation === null || selectedOperation === void 0 ? void 0 : (_selectedOperation$po6 = selectedOperation.pos) === null || _selectedOperation$po6 === void 0 ? void 0 : _selectedOperation$po6.h);

            updatePos.h = updatePos.w / _ratio;
          } else {
            diff.y = Math.max(diff.y, -updatePos.h);
            updatePos.h += diff.y;
          }
        } else if (isResizing === ResizeDirection.BottomCenter) {
          diff.y = Math.max(diff.y, -updatePos.h);
          updatePos.h += diff.y;
        } else if (isResizing === ResizeDirection.BottomLeft) {
          var _selectedOperation$po7, _selectedOperation$po8;

          diff.x = Math.min(diff.x, updatePos.w);
          updatePos.x += diff.x;
          updatePos.w -= diff.x; // Keep the diff as same radio of selected item

          if ((selectedOperation === null || selectedOperation === void 0 ? void 0 : (_selectedOperation$po7 = selectedOperation.pos) === null || _selectedOperation$po7 === void 0 ? void 0 : _selectedOperation$po7.w) && ((_selectedOperation$po8 = selectedOperation.pos) === null || _selectedOperation$po8 === void 0 ? void 0 : _selectedOperation$po8.h)) {
            var _selectedOperation$po9;

            var _ratio2 = (selectedOperation === null || selectedOperation === void 0 ? void 0 : selectedOperation.pos.w) / (selectedOperation === null || selectedOperation === void 0 ? void 0 : (_selectedOperation$po9 = selectedOperation.pos) === null || _selectedOperation$po9 === void 0 ? void 0 : _selectedOperation$po9.h);

            updatePos.h = updatePos.w / _ratio2;
          } else {
            diff.y = Math.max(diff.y, -updatePos.h);
            updatePos.h += diff.y;
          }
        } else if (isResizing === ResizeDirection.MiddleLeft) {
          diff.x = Math.min(diff.x, updatePos.w);
          updatePos.x += diff.x;
          updatePos.w -= diff.x;
        }

        var lastOperation = items[items.length - 1];

        if (lastOperation && lastOperation.tool === _Tool.default.Update && lastOperation.operationId === selectedOperation.id && lastOperation.data.pos) {
          var update = lastOperation;

          if (update.data.pos) {
            update.data.pos = _objectSpread({}, updatePos);
            operationListDispatch({
              type: 'replaceLast',
              payload: {
                operation: update
              }
            });
          }
        } else {
          handleCompleteOperation(_Tool.default.LazyUpdate, {
            operationId: selectedOperation.id,
            data: {
              pos: _objectSpread({}, updatePos)
            }
          });
        }

        setSelectedOperation(_objectSpread(_objectSpread({}, selectedOperation), {}, {
          pos: _objectSpread({}, updatePos)
        }));
      }
    };

    var onMouseUp = function onMouseUp() {
      operationListDispatch({
        type: 'completeLazyUpdate'
      });
      isResizing = null;
    };

    return {
      onMouseMove: onMouseMove,
      onMouseUp: onMouseUp,
      resizer: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        key: ResizeDirection.TopLeft,
        onTouchStart: onTouchStart(ResizeDirection.TopLeft),
        onMouseDown: onMouseDown(ResizeDirection.TopLeft),
        className: "".concat(prefixCls, "-resizer"),
        style: {
          left: tl[0] + 'px',
          top: tl[1] + 'px'
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        key: ResizeDirection.TopCenter,
        onTouchStart: onTouchStart(ResizeDirection.TopCenter),
        onMouseDown: onMouseDown(ResizeDirection.TopCenter),
        className: "".concat(prefixCls, "-resizer"),
        style: {
          left: tl[0] + w / 2 + 'px',
          top: tl[1] + 'px'
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        key: ResizeDirection.MiddleRight,
        onTouchStart: onTouchStart(ResizeDirection.MiddleRight),
        onMouseDown: onMouseDown(ResizeDirection.MiddleRight),
        className: "".concat(prefixCls, "-resizer"),
        style: {
          left: tl[0] + w + 'px',
          top: tl[1] + h / 2 + 'px'
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        key: ResizeDirection.BottomRight,
        onTouchStart: onTouchStart(ResizeDirection.BottomRight),
        onMouseDown: onMouseDown(ResizeDirection.BottomRight),
        className: "".concat(prefixCls, "-resizer"),
        style: {
          left: br[0] + 'px',
          top: br[1] + 'px'
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        key: ResizeDirection.BottomCenter,
        onTouchStart: onTouchStart(ResizeDirection.BottomCenter),
        onMouseDown: onMouseDown(ResizeDirection.BottomCenter),
        className: "".concat(prefixCls, "-resizer"),
        style: {
          left: br[0] - w / 2 + 'px',
          top: br[1] + 'px'
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        key: ResizeDirection.BottomLeft,
        onTouchStart: onTouchStart(ResizeDirection.BottomLeft),
        onMouseDown: onMouseDown(ResizeDirection.BottomLeft),
        className: "".concat(prefixCls, "-resizer"),
        style: {
          left: br[0] - w + 'px',
          top: br[1] + 'px'
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        key: ResizeDirection.MiddleLeft,
        onTouchStart: onTouchStart(ResizeDirection.MiddleLeft),
        onMouseDown: onMouseDown(ResizeDirection.MiddleLeft),
        className: "".concat(prefixCls, "-resizer"),
        style: {
          left: tl[0] + 'px',
          top: tl[1] + h / 2 + 'px'
        }
      }))
    };
  } else return {
    onMouseMove: function onMouseMove() {},
    onMouseUp: function onMouseUp() {},
    resizer: null
  };
};

var SketchPad = function SketchPad(props, ref) {
  var currentTool = props.currentTool,
      setCurrentTool = props.setCurrentTool,
      userId = props.userId,
      currentToolOption = props.currentToolOption,
      operations = props.operations,
      initialBackground = props.initialBackground,
      onChange = props.onChange,
      viewMatrix = props.viewMatrix,
      onViewMatrixChange = props.onViewMatrixChange;
  var refCanvas = (0, _react.useRef)(null);
  var refContext = (0, _react.useRef)(null);
  var refInput = (0, _react.useRef)(null);
  var lastTapRef = (0, _react.useRef)(0);
  var intl = (0, _reactIntl.useIntl)();

  var _useContext = (0, _react.useContext)(_ConfigContext.default),
      prefixCls = _useContext.prefixCls;

  var enableSketchPadContext = (0, _react.useContext)(_EnableSketchPadContext.default);
  var sketchpadPrefixCls = prefixCls + '-sketchpad';

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      hoverOperationId = _useState2[0],
      setHoverOperationId = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedOperation = _useState4[0],
      setSelectedOperation = _useState4[1];

  var isControlled = !!operations;
  var scale = (0, _utils.extract_scale_from_matrix)(viewMatrix);
  var reducer = (0, _react.useCallback)(operationListReducer(isControlled, onChange), []);

  var _useReducer = (0, _react.useReducer)(reducer, {
    queue: [],
    reduced: []
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      operationListState = _useReducer2[0],
      operationListDispatch = _useReducer2[1];

  if (isControlled) {
    (0, _react.useEffect)(function () {
      operationListDispatch({
        type: 'replaceAll',
        payload: {
          queue: operations
        }
      });
    }, [operations.length]);
  }

  var refOperationListState = (0, _react.useRef)(operationListState);
  refOperationListState.current = operationListState;

  var saveGlobalTransform = function saveGlobalTransform() {
    if (!refContext.current) return;
    var context = refContext.current;
    context.save();
    context.scale(DPR, DPR);

    var _viewMatrix2 = _slicedToArray(viewMatrix, 6),
        a = _viewMatrix2[0],
        b = _viewMatrix2[1],
        c = _viewMatrix2[2],
        d = _viewMatrix2[3],
        e = _viewMatrix2[4],
        f = _viewMatrix2[5];

    context.transform(a, b, c, d, e, f);
  };

  var restoreGlobalTransform = function restoreGlobalTransform() {
    if (!refContext.current) return;
    var context = refContext.current;
    context.restore();
  };

  var renderOperations = function renderOperations(operations) {
    if (!refContext.current || !refCanvas.current) return;
    var context = refContext.current; // clear canvas

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    saveGlobalTransform();

    var renderBackgroundOperation = function renderBackgroundOperation(operation) {
      // restoreGlobalTransform();
      (0, _ImageTool.drawBackgroundImage)(operation, refCanvas.current, context, viewMatrix, operation.id, function () {
        renderOperations(operations);
      }); // saveGlobalTransform();
    };

    operations.forEach(function (operation) {
      var hover = (!selectedOperation || selectedOperation.id !== operation.id) && operation.id === hoverOperationId;

      switch (operation.tool) {
        case _Tool.default.Clear:
          restoreGlobalTransform();
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          saveGlobalTransform(); // background image should not be removed

          if (backgroundOperation) {
            renderBackgroundOperation(backgroundOperation);
          }

          break;

        case _Tool.default.Eraser:
          (0, _StrokeTool.drawEraser)(operation, context, hover);
          break;

        case _Tool.default.Stroke:
          (0, _StrokeTool.drawStroke)(operation, context, hover);
          break;

        case _Tool.default.Shape:
          (0, _ShapeTool.drawRectangle)(operation, context, hover);
          break;

        case _Tool.default.Text:
          (0, _TextTool.drawText)(operation, context, operation.pos);
          break;

        case _Tool.default.Background:
          backgroundOperation = operation;
          renderBackgroundOperation(backgroundOperation);
          break;

        case _Tool.default.Image:
          (0, _ImageTool.drawImage)(operation, context, operation.pos, operation.id, function () {
            renderOperations(operations);
          });

        default:
          break;
      }
    }); // selected box

    if (selectedOperation) {
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = '#d0d0d0';
      context.rect(selectedOperation.pos.x - SELECT_BOX_PADDING, selectedOperation.pos.y - SELECT_BOX_PADDING, selectedOperation.pos.w + 2 * SELECT_BOX_PADDING, selectedOperation.pos.h + 2 * SELECT_BOX_PADDING);
      context.stroke();
      context.closePath();
    }

    var backgroundOperation;

    if (initialBackground) {
      backgroundOperation = {
        id: "".concat(BackgroundOperationId, "/").concat(initialBackground),
        userId: userId,
        timestamp: Date.now(),
        tool: _Tool.default.Background,
        imageData: initialBackground
      };
      renderBackgroundOperation(backgroundOperation);
    }

    restoreGlobalTransform();
  };

  (0, _react.useEffect)(function () {
    var keydownHandler = function keydownHandler(evt) {
      var keyCode = evt.keyCode; // key 'delete'

      if (keyCode === 8) {
        if (selectedOperation) {
          setSelectedOperation(null);
          handleCompleteOperation(_Tool.default.Remove, {
            operationId: selectedOperation.id
          });
        }
      } else if (keyCode === 27) {
        // key 'esc'
        setSelectedOperation(null);
      }
    };

    addEventListener('keydown', keydownHandler);
    return function () {
      return removeEventListener('keydown', keydownHandler);
    };
  }, [selectedOperation && selectedOperation.id]);
  (0, _react.useEffect)(function () {
    var resizeHandler = (0, _lodash.debounce)(function () {
      var canvas = refCanvas.current;

      if (canvas && refOperationListState.current) {
        // high resolution canvas.
        var rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * DPR;
        canvas.height = rect.height * DPR;
        (0, _ImageTool.clearBackgroundPostionCache)();
        renderOperations(refOperationListState.current.reduced);
      }
    }, 200);
    addEventListener('resize', resizeHandler);
    return function () {
      return removeEventListener('resize', resizeHandler);
    };
  }, []); // disable default scrolling on mobile device.
  // refer: https://stackoverflow.com/questions/49500339/cant-prevent-touchmove-from-scrolling-window-on-ios

  (0, _react.useEffect)(function () {
    var handler = function handler(e) {
      // only disable scroll when interact with this board.
      if (lastTapRef.current) {
        e.preventDefault();
      }

      onTouchMoveRef.current && onTouchMoveRef.current(e);
    };

    document.addEventListener('touchmove', handler, {
      passive: false
    });
    return function () {
      document.removeEventListener('touchmove', handler);
    };
  }, []);

  var handleCompleteOperation = function handleCompleteOperation(tool, data, pos) {
    if (!tool) {
      renderOperations(operationListState.reduced);
      return;
    } // coerce update.


    var isLazy = tool === _Tool.default.LazyUpdate;
    tool = isLazy ? _Tool.default.Update : tool;
    var message = Object.assign({}, data, {
      id: (0, _uuid.v4)(),
      userId: userId,
      timestamp: Date.now(),
      pos: pos,
      tool: tool
    });
    operationListDispatch({
      type: 'add',
      payload: {
        operation: message,
        isLazy: isLazy
      }
    });
  };

  var _useResizeHandler = useResizeHandler(selectedOperation, viewMatrix, operationListState.queue, operationListDispatch, setSelectedOperation, handleCompleteOperation, refCanvas, sketchpadPrefixCls),
      onMouseResizeMove = _useResizeHandler.onMouseMove,
      onMouseResizeUp = _useResizeHandler.onMouseUp,
      resizer = _useResizeHandler.resizer;

  var onMouseDown = function onMouseDown(e) {
    if (!refCanvas.current) return null;
    if (!enableSketchPadContext.enable) return null;

    var _mapClientToCanvas = (0, _utils.mapClientToCanvas)(e, refCanvas.current, viewMatrix),
        _mapClientToCanvas2 = _slicedToArray(_mapClientToCanvas, 2),
        x = _mapClientToCanvas2[0],
        y = _mapClientToCanvas2[1];

    switch (currentTool) {
      case _Tool.default.Select:
        (0, _SelectTool.onSelectMouseDown)(e, x, y, scale, operationListState, viewMatrix, setSelectedOperation);
        break;

      case _Tool.default.Stroke:
        (0, _StrokeTool.onStrokeMouseDown)(x, y, currentToolOption);
        break;

      case _Tool.default.Eraser:
        (0, _StrokeTool.onStrokeMouseDown)(x, y, _objectSpread(_objectSpread({}, currentToolOption), {}, {
          strokeSize: _Tool.defaultToolOption.strokeSize * 2 / scale,
          strokeColor: 'rgba(255, 255, 255, 1)'
        }));
        break;

      case _Tool.default.Shape:
        (0, _ShapeTool.onShapeMouseDown)(x, y, currentToolOption);
        break;

      default:
        break;
    }
  };

  var onTouchStart = function onTouchStart(e) {
    if (e.touches.length === 1) {
      if (e.timeStamp - lastTapRef.current < 300) {
        onDoubleClick(e.touches[0]);
      } else {
        onMouseDown(e.touches[0]);
      }
    }

    lastTapRef.current = e.timeStamp;
  };

  var onDoubleClick = function onDoubleClick(e) {
    if (!refCanvas.current) return null;

    var _mapClientToCanvas3 = (0, _utils.mapClientToCanvas)(e, refCanvas.current, viewMatrix),
        _mapClientToCanvas4 = _slicedToArray(_mapClientToCanvas3, 2),
        x = _mapClientToCanvas4[0],
        y = _mapClientToCanvas4[1];

    switch (currentTool) {
      case _Tool.default.Select:
        (0, _SelectTool.onSelectMouseDoubleClick)(x, y, scale, operationListState, handleCompleteOperation, viewMatrix, refInput, refCanvas, intl);
        setSelectedOperation(null);
        break;

      default:
        setCurrentTool(_Tool.default.Select);
        break;
    }
  };

  var onMouseMove = function onMouseMove(e) {
    if (!refCanvas.current) return null;
    if (!enableSketchPadContext.enable) return null;
    onMouseResizeMove(e);

    var _mapClientToCanvas5 = (0, _utils.mapClientToCanvas)(e, refCanvas.current, viewMatrix),
        _mapClientToCanvas6 = _slicedToArray(_mapClientToCanvas5, 2),
        x = _mapClientToCanvas6[0],
        y = _mapClientToCanvas6[1];

    switch (currentTool) {
      case _Tool.default.Select:
        (0, _SelectTool.onSelectMouseMove)(e, x, y, scale, operationListState, selectedOperation, onViewMatrixChange, setHoverOperationId, handleCompleteOperation, operationListDispatch, setSelectedOperation);
        break;

      case _Tool.default.Eraser:
      case _Tool.default.Stroke:
        {
          saveGlobalTransform();
          refContext.current && (0, _StrokeTool.onStrokeMouseMove)(x, y, refContext.current);
          restoreGlobalTransform();
          break;
        }

      case _Tool.default.Shape:
        {
          renderOperations(operationListState.reduced);
          saveGlobalTransform();
          refContext.current && (0, _ShapeTool.onShapeMouseMove)(x, y, refContext.current);
          restoreGlobalTransform();
          break;
        }

      default:
        break;
    }
  };

  var onTouchMove = function onTouchMove(e) {
    if (e.touches.length === 1) {
      onMouseMove(e.touches[0]);
    }
  };

  var onTouchMoveRef = (0, _react.useRef)(onTouchMove);
  (0, _react.useEffect)(function () {
    onTouchMoveRef.current = onTouchMove;
  }, [onTouchMove]);

  var onMouseUp = function onMouseUp(e) {
    if (!refCanvas.current) return null;
    if (!enableSketchPadContext.enable) return null;
    onMouseResizeUp(e);

    switch (currentTool) {
      case _Tool.default.Select:
        (0, _SelectTool.onSelectMouseUp)(operationListDispatch);
        break;

      case _Tool.default.Eraser:
        {
          refContext.current && (0, _StrokeTool.onStrokeMouseUp)(setCurrentTool, handleCompleteOperation, _Tool.default.Eraser);
          break;
        }

      case _Tool.default.Stroke:
        {
          refContext.current && (0, _StrokeTool.onStrokeMouseUp)(setCurrentTool, handleCompleteOperation);
          break;
        }

      case _Tool.default.Shape:
        {
          var _mapClientToCanvas7 = (0, _utils.mapClientToCanvas)(e, refCanvas.current, viewMatrix),
              _mapClientToCanvas8 = _slicedToArray(_mapClientToCanvas7, 2),
              x = _mapClientToCanvas8[0],
              y = _mapClientToCanvas8[1];

          refContext.current && (0, _ShapeTool.onShapeMouseUp)(x, y, setCurrentTool, handleCompleteOperation);
          break;
        }

      case _Tool.default.Text:
        {
          (0, _TextTool.onTextMouseUp)({
            clientX: e.clientX + 2,
            clientY: e.clientY - currentToolOption.textSize / 2
          }, currentToolOption, scale, refInput, refCanvas, intl);
          break;
        }

      default:
        break;
    }
  };

  var onTouchEnd = function onTouchEnd(e) {
    if (e.changedTouches.length === 1) {
      onMouseUp(e.changedTouches[0]);
    }

    lastTapRef.current = 0;
  };

  var onWheel = function onWheel(evt) {
    if (_utils.isMobileDevice && !evt.forceWheel) return;
    evt.stopPropagation && evt.stopPropagation();
    var deltaY = evt.deltaY,
        ctrlKey = evt.ctrlKey;

    var _viewMatrix3 = _slicedToArray(viewMatrix, 6),
        a = _viewMatrix3[0],
        b = _viewMatrix3[1],
        c = _viewMatrix3[2],
        d = _viewMatrix3[3],
        e = _viewMatrix3[4],
        f = _viewMatrix3[5];

    var newScale = a + (ctrlKey ? -deltaY : deltaY) / 100;
    newScale = Math.max(Math.min(newScale, _Tool.MAX_SCALE), _Tool.MIN_SCALE);

    if (refCanvas.current) {
      var pos = (0, _utils.mapClientToCanvas)(evt, refCanvas.current, viewMatrix);
      var scaleChange = newScale - a;
      onViewMatrixChange([newScale, b, c, newScale, e - pos[0] * scaleChange, f - pos[1] * scaleChange]);
    }

    setSelectedOperation(null);
  };

  var onRemoveOperation = function onRemoveOperation(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (selectedOperation) {
      setSelectedOperation(null);
      handleCompleteOperation(_Tool.default.Remove, {
        operationId: selectedOperation.id
      });
    }
  };

  (0, _react.useEffect)(function () {
    var canvas = refCanvas.current; // high resolution canvas.

    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * DPR;
    canvas.height = rect.height * DPR;
    refContext.current = canvas.getContext('2d');

    canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };
  }, []);
  (0, _react.useEffect)(function () {
    renderOperations(operationListState.reduced);
  }, [operationListState.reduced, viewMatrix, hoverOperationId, selectedOperation, initialBackground, refContext.current]);
  var canvasStyle = {};

  if (currentTool === _Tool.default.Stroke) {
    canvasStyle.cursor = "url(".concat(_sketch_stroke_cursor.default, ") 0 14, crosshair");
  } else if (currentTool === _Tool.default.Shape) {
    canvasStyle.cursor = "crosshair";
  } else if (currentTool === _Tool.default.Eraser) {
    canvasStyle.cursor = "url(".concat(_sketch_eraser_cursor.default, ") 10 10, grab");
  } else if (currentTool === _Tool.default.Text) {
    canvasStyle.cursor = "text";
  }

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      selectImage: function selectImage(image) {
        if (image && refCanvas.current) {
          (0, _ImageTool.onImageComplete)(image, refCanvas.current, viewMatrix, handleCompleteOperation, {
            imageSize: "contain"
          });
        }
      },
      selectBackgroundImage: function selectBackgroundImage(image) {
        if (image && refCanvas.current) {
          (0, _ImageTool.onBackgroundImageComplete)(image, refCanvas.current, viewMatrix, handleCompleteOperation);
        }
      },
      removeBackgroundImage: function removeBackgroundImage() {
        if (refCanvas.current) {
          handleCompleteOperation(_Tool.default.RemoveBackground);
        }
      },
      undo: function undo() {
        setSelectedOperation(null);

        if (operationListState.reduced.length) {
          handleCompleteOperation(_Tool.default.Undo);
        }
      },
      redo: function redo() {
        setSelectedOperation(null);
        var isRedoable = 0;
        var queue = operationListState.queue;

        for (var i = queue.length - 1; i >= 0; i--) {
          if (queue[i].tool === _Tool.default.Undo) {
            isRedoable++;
          } else if (queue[i].tool === _Tool.default.Redo) {
            isRedoable--;
          } else {
            break;
          }
        }

        if (isRedoable > 0) {
          handleCompleteOperation(_Tool.default.Redo);
        }
      },
      clear: function clear() {
        setSelectedOperation(null);
        handleCompleteOperation(_Tool.default.Clear);
      },
      save: function save(handleSave) {
        if (refCanvas.current && refContext.current) {
          var canvas = refCanvas.current;
          var w = canvas.width;
          var h = canvas.height;
          var context = refContext.current;
          context.globalCompositeOperation = 'destination-over';
          context.fillStyle = '#fff';
          context.fillRect(0, 0, w, h);
          var dataUrl = canvas.toDataURL('image/png');

          if (handleSave) {
            handleSave({
              canvas: canvas,
              dataUrl: dataUrl
            });
          } else {
            var a = document.createElement('a');
            a.href = dataUrl;
            a.download = 'sketch.png';
            a.click();
          }
        }
      },
      getCanvas: function getCanvas() {
        return refCanvas.current;
      }
    };
  });
  (0, _gesture.useZoomGesture)(refCanvas);
  var bindPinch = (0, _reactUseGesture.usePinch)(function (state) {
    var ctrlKey = state.ctrlKey,
        origin = state.origin,
        delta = state.delta;

    if (origin) {
      onWheel({
        deltaY: delta[0],
        ctrlKey: ctrlKey,
        clientX: origin[0],
        clientY: origin[1],
        forceWheel: true
      });
    }
  });
  var bindWheel = (0, _reactUseGesture.useWheel)(function (state) {
    var ctrlKey = state.ctrlKey,
        event = state.event,
        delta = state.delta,
        last = state.last;

    if (event && !last && 'clientX' in event) {
      onWheel({
        deltaY: delta[1] / 4,
        ctrlKey: ctrlKey,
        clientX: event.clientX + 0,
        clientY: event.clientY + 0,
        forceWheel: true
      });
    }
  });
  var settingMenu = null;
  var removeButton = null;

  if (selectedOperation) {
    var content = null;

    switch (selectedOperation.tool) {
      case _Tool.default.Stroke:
        content = (0, _StrokeTool.useStrokeDropdown)({
          currentToolOption: {
            strokeSize: selectedOperation.size,
            strokeColor: selectedOperation.color
          },
          setCurrentToolOption: function setCurrentToolOption(option) {
            var data = {
              color: option.strokeColor,
              size: option.strokeSize
            };
            handleCompleteOperation(_Tool.default.Update, {
              operationId: selectedOperation.id,
              data: data
            });
            setSelectedOperation(_objectSpread(_objectSpread({}, selectedOperation), data));
          },
          setCurrentTool: function setCurrentTool() {},
          prefixCls: prefixCls
        });
        break;

      case _Tool.default.Shape:
        content = (0, _ShapeTool.useShapeDropdown)({
          currentToolOption: {
            shapeType: selectedOperation.type,
            shapeBorderColor: selectedOperation.color,
            shapeBorderSize: selectedOperation.size
          },
          setCurrentToolOption: function setCurrentToolOption(option) {
            var data = {
              type: option.shapeType,
              color: option.shapeBorderColor,
              size: option.shapeBorderSize
            };
            handleCompleteOperation(_Tool.default.Update, {
              operationId: selectedOperation.id,
              data: data
            });
            setSelectedOperation(_objectSpread(_objectSpread({}, selectedOperation), data));
          },
          setCurrentTool: function setCurrentTool() {},
          prefixCls: prefixCls
        });
        break;

      case _Tool.default.Text:
        {
          var textOperation = selectedOperation;
          content = (0, _TextTool.useTextDropdown)({
            currentToolOption: {
              textSize: textOperation.size,
              textColor: textOperation.color
            },
            setCurrentToolOption: function setCurrentToolOption(option) {
              var data = {
                color: option.textColor,
                size: option.textSize
              };

              if (refContext.current && option.textSize !== textOperation.size) {
                var context = refContext.current; // font size has changed, need to update pos

                context.font = "".concat(option.textSize, "px ").concat(_TextTool.font);
                context.textBaseline = 'alphabetic'; // measureText does not support multi-line

                var lines = textOperation.text.split('\n');
                data.pos = _objectSpread(_objectSpread({}, selectedOperation.pos), {}, {
                  w: Math.max.apply(Math, _toConsumableArray(lines.map(function (line) {
                    return context.measureText(line).width;
                  }))),
                  h: lines.length * option.textSize
                });
              }

              handleCompleteOperation(_Tool.default.Update, {
                operationId: selectedOperation.id,
                data: data
              }); // @ts-ignore

              setSelectedOperation(_objectSpread(_objectSpread({}, selectedOperation), data));
            },
            setCurrentTool: function setCurrentTool() {},
            prefixCls: prefixCls,
            intl: intl
          });
          break;
        }

      default:
        break;
    }

    var resultRect = {
      xMin: selectedOperation.pos.x,
      xMax: selectedOperation.pos.x + selectedOperation.pos.w,
      yMin: selectedOperation.pos.y,
      yMax: selectedOperation.pos.y + selectedOperation.pos.h
    };

    var _viewMatrix4 = _slicedToArray(viewMatrix, 6),
        a = _viewMatrix4[0],
        b = _viewMatrix4[1],
        c = _viewMatrix4[2],
        d = _viewMatrix4[3],
        e = _viewMatrix4[4],
        f = _viewMatrix4[5];

    var selectPadding = Math.max(_SelectTool.SELECT_PADDING * 1 / scale || 0, _SelectTool.SELECT_PADDING);
    var left = resultRect.xMin;
    var top = resultRect.yMax + selectPadding;
    var menuStyle = {
      position: 'absolute',
      left: a * left + c * top + e,
      top: b * left + d * top + f
    };
    settingMenu = /*#__PURE__*/_react.default.createElement("div", {
      style: menuStyle,
      onMouseDown: stopPropagation
    }, content);
    var removeX = selectedOperation.tool === _Tool.default.Text ? resultRect.xMax - 5 / scale : resultRect.xMax - 7 / scale;
    var removeY = selectedOperation.tool === _Tool.default.Text ? resultRect.yMin - 11 / scale : resultRect.yMin - 9 / scale;
    var removeStyle = {
      position: 'absolute',
      left: a * removeX + c * removeY + e,
      top: b * removeX + d * removeY + f,
      background: 'white',
      lineHeight: '16px',
      fontSize: '16px',
      borderRadius: '50%',
      cursor: 'pointer',
      color: '#f45b6c'
    };
    removeButton = /*#__PURE__*/_react.default.createElement("div", {
      style: removeStyle,
      onMouseDown: onRemoveOperation,
      onTouchStart: onRemoveOperation
    }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
      type: "close-circle"
    }));
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(sketchpadPrefixCls, "-container"),
    onMouseDown: onMouseDown,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseUp,
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd,
    onMouseUp: onMouseUp
  }, /*#__PURE__*/_react.default.createElement("canvas", _objectSpread(_objectSpread({
    ref: refCanvas,
    onDoubleClick: onDoubleClick,
    className: "".concat(sketchpadPrefixCls, "-canvas"),
    style: canvasStyle
  }, bindPinch()), bindWheel())), /*#__PURE__*/_react.default.createElement("div", {
    ref: refInput,
    contentEditable: true,
    style: {
      fontSize: "".concat(12 * scale, "px")
    },
    className: "".concat(sketchpadPrefixCls, "-textInput"),
    onBlur: function onBlur() {
      (0, _TextTool.onTextComplete)(refInput, refCanvas, viewMatrix, scale, handleCompleteOperation, setCurrentTool);
    }
  }), settingMenu, removeButton, resizer);
};

var _default = /*#__PURE__*/(0, _react.forwardRef)(SketchPad);

exports.default = _default;