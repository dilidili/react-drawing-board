"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useZoomGesture = useZoomGesture;

var _react = require("react");

function useZoomGesture(refCanvas) {
  (0, _react.useEffect)(function () {
    var disableBrowserZoom = function disableBrowserZoom(event) {
      event.preventDefault();
    };

    if (refCanvas.current) {
      refCanvas.current.addEventListener('wheel', disableBrowserZoom);
      return function () {
        refCanvas.current && refCanvas.current.removeEventListener('wheel', disableBrowserZoom);
      };
    }
  }, []);
}