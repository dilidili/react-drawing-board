import { useRef, TouchEvent, useEffect, RefObject } from 'react';

export function useZoomGesture<T>(refCanvas: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const disableBrowserZoom = (event: WheelEvent) => {
      event.preventDefault();
    };

    if (refCanvas.current) {
      refCanvas.current.addEventListener('wheel', disableBrowserZoom);
      return () => {
        refCanvas.current && refCanvas.current.removeEventListener('wheel', disableBrowserZoom);
      };
    }
  }, []);
}
