"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matrix_invert = matrix_invert;
exports.isMobileDevice = exports.detectMobileDevice = exports.zoom_matrix = exports.extract_scale_from_matrix = exports.matrix_multiply = exports.mapClientToCanvas = void 0;

var _Tool = require("./enums/Tool");

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

function matrix_invert(M) {
  // I use Guassian Elimination to calculate the inverse:
  // (1) 'augment' the matrix (left) by the identity (on the right)
  // (2) Turn the matrix on the left into the identity by elemetry row ops
  // (3) The matrix on the right is the inverse (was the identity matrix)
  // There are 3 elemtary row ops: (I combine b and c in my code)
  // (a) Swap 2 rows
  // (b) Multiply a row by a scalar
  // (c) Add 2 rows
  //if the matrix isn't square: exit (error)
  if (M.length !== M[0].length) {
    return;
  } //create the identity matrix (I), and a copy (C) of the original


  var i = 0,
      ii = 0,
      j = 0,
      dim = M.length,
      e = 0,
      t = 0;
  var I = [],
      C = [];

  for (i = 0; i < dim; i += 1) {
    // Create the row
    I[I.length] = [];
    C[C.length] = [];

    for (j = 0; j < dim; j += 1) {
      //if we're on the diagonal, put a 1 (for identity)
      if (i == j) {
        I[i][j] = 1;
      } else {
        I[i][j] = 0;
      } // Also, make the copy of the original


      C[i][j] = M[i][j];
    }
  } // Perform elementary row operations


  for (i = 0; i < dim; i += 1) {
    // get the element e on the diagonal
    e = C[i][i]; // if we have a 0 on the diagonal (we'll need to swap with a lower row)

    if (e == 0) {
      //look through every row below the i'th row
      for (ii = i + 1; ii < dim; ii += 1) {
        //if the ii'th row has a non-0 in the i'th col
        if (C[ii][i] != 0) {
          //it would make the diagonal have a non-0 so swap it
          for (j = 0; j < dim; j++) {
            e = C[i][j]; //temp store i'th row

            C[i][j] = C[ii][j]; //replace i'th row by ii'th

            C[ii][j] = e; //repace ii'th by temp

            e = I[i][j]; //temp store i'th row

            I[i][j] = I[ii][j]; //replace i'th row by ii'th

            I[ii][j] = e; //repace ii'th by temp
          } //don't bother checking other rows since we've swapped


          break;
        }
      } //get the new diagonal


      e = C[i][i]; //if it's still 0, not invertable (error)

      if (e == 0) {
        return;
      }
    } // Scale this row down by e (so we have a 1 on the diagonal)


    for (j = 0; j < dim; j++) {
      C[i][j] = C[i][j] / e; //apply to original matrix

      I[i][j] = I[i][j] / e; //apply to identity
    } // Subtract this row (scaled appropriately for each row) from ALL of
    // the other rows so that there will be 0's in this column in the
    // rows above and below this one


    for (ii = 0; ii < dim; ii++) {
      // Only apply to other rows (we want a 1 on the diagonal)
      if (ii == i) {
        continue;
      } // We want to change this element to 0


      e = C[ii][i]; // Subtract (the row above(or below) scaled by e) from (the
      // current row) but start at the i'th column and assume all the
      // stuff left of diagonal is 0 (which it should be if we made this
      // algorithm correctly)

      for (j = 0; j < dim; j++) {
        C[ii][j] -= e * C[i][j]; //apply to original matrix

        I[ii][j] -= e * I[i][j]; //apply to identity
      }
    }
  } //we've done all operations, C should be the identity
  //matrix I should be the inverse:


  return I;
}

var mapClientToCanvas = function mapClientToCanvas(evt, canvas, viewMatrix) {
  var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
      top = _canvas$getBoundingCl.top,
      left = _canvas$getBoundingCl.left;

  var _viewMatrix = _slicedToArray(viewMatrix, 6),
      a = _viewMatrix[0],
      b = _viewMatrix[1],
      c = _viewMatrix[2],
      d = _viewMatrix[3],
      e = _viewMatrix[4],
      f = _viewMatrix[5];

  var x = evt.clientX - left;
  var y = evt.clientY - top;
  var inverse = matrix_invert([[a, c, e], [b, d, f], [0, 0, 1]]);
  return [inverse[0][0] * x + inverse[0][1] * y + inverse[0][2], inverse[1][0] * x + inverse[1][1] * y + inverse[1][2]];
};

exports.mapClientToCanvas = mapClientToCanvas;

var matrix_multiply = function matrix_multiply(_ref, _ref2) {
  var _ref3 = _slicedToArray(_ref, 6),
      a1 = _ref3[0],
      b1 = _ref3[1],
      c1 = _ref3[2],
      d1 = _ref3[3],
      e1 = _ref3[4],
      f1 = _ref3[5];

  var _ref4 = _slicedToArray(_ref2, 6),
      a2 = _ref4[0],
      b2 = _ref4[1],
      c2 = _ref4[2],
      d2 = _ref4[3],
      e2 = _ref4[4],
      f2 = _ref4[5];

  return [a1 * a2 + c1 * b2, d1 * b2 + b1 * a2, a1 * c2 + c1 * d2, b1 * c2 + d1 * d2, a1 * e2 + c1 * f2 + e1, b1 * e2 + d1 * f2 + f1];
};

exports.matrix_multiply = matrix_multiply;

var extract_scale_from_matrix = function extract_scale_from_matrix(viewMatrix) {
  return viewMatrix[0];
};

exports.extract_scale_from_matrix = extract_scale_from_matrix;

var zoom_matrix = function zoom_matrix(viewMatrix, scale, canvas) {
  if (!canvas) return viewMatrix;
  var boundingClient = canvas.getBoundingClientRect();
  var pos = mapClientToCanvas({
    clientX: boundingClient.left + boundingClient.width / 2,
    clientY: boundingClient.top + boundingClient.height / 2
  }, canvas, viewMatrix);

  var newViewMatrix = _toConsumableArray(viewMatrix);

  var newScale = Math.max(_Tool.MIN_SCALE, Math.min(_Tool.MAX_SCALE, scale));
  var scaleChange = newScale - viewMatrix[0];
  newViewMatrix[0] = newScale;
  newViewMatrix[3] = newScale;
  newViewMatrix[4] = newViewMatrix[4] - pos[0] * scaleChange;
  newViewMatrix[5] = newViewMatrix[5] - pos[1] * scaleChange;
  return newViewMatrix;
};

exports.zoom_matrix = zoom_matrix;

var detectMobileDevice = function detectMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

exports.detectMobileDevice = detectMobileDevice;
var isMobileDevice = detectMobileDevice();
exports.isMobileDevice = isMobileDevice;