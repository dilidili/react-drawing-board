"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onImageComplete = exports.onBackgroundImageComplete = exports.drawImage = exports.drawBackgroundImage = void 0;

var _Tool = _interopRequireDefault(require("./enums/Tool"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _cacheImgs = {};
var _cacheBackgroundPosition = {};

var drawImage = function drawImage(item, context, pos, id, rerender) {
  if (!_cacheImgs[id]) {
    fetch(item.imageData).then(function (res) {
      return res.blob();
    }).then(function (blob) {
      return new Promise(function (resolve, reject) {
        var img = document.createElement('img');
        img.addEventListener('load', function () {
          resolve(this);
        });
        img.src = URL.createObjectURL(blob);
      });
    }).then(function (imageBitmap) {
      _cacheImgs[id] = imageBitmap;
      rerender();
    });
  } else {
    context.drawImage(_cacheImgs[id], pos.x, pos.y, pos.w, pos.h);
  }
};

exports.drawImage = drawImage;

var drawBackgroundImage = function drawBackgroundImage(item, canvas, context, viewMatrix, id, rerender) {
  var position = _cacheBackgroundPosition[item.imageData];

  if (position) {
    drawImage(item, context, position, id, rerender);
  } else {
    onImageComplete(item.imageData, canvas, viewMatrix, function (_tool, _data, pos) {
      position = pos;
      _cacheBackgroundPosition[item.imageData] = pos;
      drawImage(item, context, position, id, rerender);
    });
  }
};

exports.drawBackgroundImage = drawBackgroundImage;

var onImageComplete = function onImageComplete(data, canvas, viewMatrix, handleCompleteOperation) {
  var image = new Image();

  image.onload = function () {
    var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
        top = _canvas$getBoundingCl.top,
        left = _canvas$getBoundingCl.left;

    var imageWidth = image.width;
    var imageHeight = image.height;
    var offsetWidth = canvas.offsetWidth;
    var offsetHeight = canvas.offsetHeight;
    var pos = (0, _utils.mapClientToCanvas)({
      clientX: left + (offsetWidth / 2 - imageWidth / 4),
      clientY: top + (offsetHeight / 2 - imageHeight / 4)
    }, canvas, viewMatrix);
    var posEnd = (0, _utils.mapClientToCanvas)({
      clientX: left + (offsetWidth / 2 + imageWidth / 4),
      clientY: top + (offsetHeight / 2 + imageHeight / 4)
    }, canvas, viewMatrix);
    var posInfo = {
      x: pos[0],
      y: pos[1],
      w: posEnd[0] - pos[0],
      h: posEnd[1] - pos[1]
    };
    handleCompleteOperation(_Tool.default.Image, {
      imageData: data
    }, posInfo);
  };

  image.src = data;
};

exports.onImageComplete = onImageComplete;

var onBackgroundImageComplete = function onBackgroundImageComplete(data, canvas, viewMatrix, handleCompleteOperation) {
  handleCompleteOperation(_Tool.default.Background, {
    imageData: data
  });
};

exports.onBackgroundImageComplete = onBackgroundImageComplete;