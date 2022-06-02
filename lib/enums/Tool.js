"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultToolOption = exports.TextSize = exports.strokeColor = exports.strokeSize = exports.MIN_SCALE = exports.MAX_SCALE = exports.ShapeType = void 0;
var Tool;

(function (Tool) {
  Tool["Select"] = "Select";
  Tool["Stroke"] = "Stroke";
  Tool["Shape"] = "Shape";
  Tool["Text"] = "Text";
  Tool["Image"] = "Image";
  Tool["Undo"] = "Undo";
  Tool["Redo"] = "Redo";
  Tool["Clear"] = "Clear";
  Tool["Eraser"] = "Eraser";
  Tool["Zoom"] = "Zoom";
  Tool["ZoomIn"] = "ZoomIn";
  Tool["ZoomOut"] = "ZoomOut";
  Tool["Save"] = "Save";
  Tool["Update"] = "Update";
  Tool["LazyUpdate"] = "LazyUpdate";
  Tool["Remove"] = "Remove";
  Tool["Background"] = "Background";
  Tool["RemoveBackground"] = "RemoveBackground";
})(Tool || (Tool = {}));

var ShapeType;
exports.ShapeType = ShapeType;

(function (ShapeType) {
  ShapeType["Rectangle"] = "Rectangle";
  ShapeType["Oval"] = "Oval";
  ShapeType["Line"] = "Line";
})(ShapeType || (exports.ShapeType = ShapeType = {}));

var MAX_SCALE = 2;
exports.MAX_SCALE = MAX_SCALE;
var MIN_SCALE = 0.5;
exports.MIN_SCALE = MIN_SCALE;
var strokeSize = [2, 4, 6];
exports.strokeSize = strokeSize;
var strokeColor = ['#4a4a4a', '#f55b6c', '#f7c924', '#63d321', '#50e3c2', '#59b9ff', '#bd10e0', '#ffffff'];
exports.strokeColor = strokeColor;
var TextSize;
exports.TextSize = TextSize;

(function (TextSize) {
  TextSize[TextSize["Small"] = 12] = "Small";
  TextSize[TextSize["Default"] = 20] = "Default";
  TextSize[TextSize["Large"] = 28] = "Large";
})(TextSize || (exports.TextSize = TextSize = {}));

var defaultToolOption = {
  strokeSize: strokeSize[1],
  strokeColor: strokeColor[0],
  shapeType: ShapeType.Rectangle,
  shapeBorderColor: strokeColor[0],
  shapeBorderSize: strokeSize[1],
  textColor: strokeColor[0],
  textSize: TextSize.Default,
  defaultText: {
    id: 'umi.block.sketch.text.placeholder'
  }
};
exports.defaultToolOption = defaultToolOption;
var _default = Tool;
exports.default = _default;