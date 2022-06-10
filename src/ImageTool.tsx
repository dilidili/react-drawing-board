import { MouseEvent } from 'react';
import { getBackgroundPosition } from './BackgroundTool';
import Tool, { Position } from './enums/Tool';
import { mapClientToCanvas } from './utils';

export type Image = {
  imageData: string;
};

export type Background = {
  imageData: string;
};

const _cacheImgs: {
  [any: string]: HTMLImageElement;
} = {};

let _cacheBackgroundPosition: {
  [any: string]: Position;
} = {};

export const clearBackgroundPostionCache = () => {
  _cacheBackgroundPosition = {};
}

export const drawImage = (
  item: Image,
  context: CanvasRenderingContext2D,
  pos: Position,
  id: string,
  rerender: () => void,
) => {
  if (!_cacheImgs[id]) {
    fetch(item.imageData)
      .then((res) => res.blob())
      .then((blob) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          let img = document.createElement('img');
          img.addEventListener('load', function () {
            resolve(this);
          });
          img.src = URL.createObjectURL(blob);
        });
      })
      .then((imageBitmap) => {
        _cacheImgs[id] = imageBitmap;
        rerender();
      });
  } else {
    context.drawImage(_cacheImgs[id], pos.x, pos.y, pos.w, pos.h);
  }
};

export const drawBackgroundImage = (
  item: Image,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  viewMatrix: number[],
  id: string,
  rerender: () => void,
) => {
  const originalCompositeOperation = context.globalCompositeOperation;
  let position: Position | undefined = _cacheBackgroundPosition[item.imageData];
  if (position) {
    context.globalCompositeOperation = "destination-over";
    drawImage(item, context, position, id, rerender);
    context.globalCompositeOperation = originalCompositeOperation;
  } else {
    onImageComplete(item.imageData, canvas, viewMatrix, (_tool, _data, pos) => {
      position = pos;
      _cacheBackgroundPosition[item.imageData] = pos;
      context.globalCompositeOperation = "destination-over";
      rerender();
      context.globalCompositeOperation = originalCompositeOperation;
    }, {
      imageSize: "contain"
    });
  }
};

export const onImageComplete = (
  data: string,
  canvas: HTMLCanvasElement,
  viewMatrix: number[],
  handleCompleteOperation: (tool?: Tool, data?: Image, pos?: Position) => void,
  options?: {
    imageSize?: 'contain'
  },
) => {
  const image = new Image();

  image.onload = () => {
    const { top, left } = canvas.getBoundingClientRect();
    const imageWidth = image.width;
    const imageHeight = image.height;
    const offsetWidth = canvas.offsetWidth;
    const offsetHeight = canvas.offsetHeight;

    const imageRatio = imageWidth / imageHeight;
    const canvasRatio = offsetWidth / offsetHeight;

    let targetImageWidth = imageWidth;
    let targetImageHeight = imageHeight;

    const clientPos = {
      clientX: 0,
      clientY: 0,
    }
    const clientPosEnd = {
      clientX: 0,
      clientY: 0,
    }
    if (options?.imageSize == "contain") {
      if (imageRatio >= canvasRatio) {
        targetImageWidth = offsetWidth;
        targetImageHeight = targetImageWidth / imageRatio;
      } else {
        targetImageHeight = offsetHeight;
        targetImageWidth = targetImageHeight * imageRatio;
      }

      clientPos.clientX = left + (offsetWidth / 2 - targetImageWidth / 2);
      clientPos.clientY = top + (offsetHeight / 2 - targetImageHeight / 2);
      clientPosEnd.clientX = left + (offsetWidth / 2 + targetImageWidth / 2);
      clientPosEnd.clientY = top + (offsetHeight / 2 + targetImageHeight / 2);
    } else {
      clientPos.clientX = left + (offsetWidth / 2 - targetImageWidth / 4);
      clientPos.clientY = top + (offsetHeight / 2 - targetImageHeight / 4);
      clientPosEnd.clientX = left + (offsetWidth / 2 + targetImageWidth / 4);
      clientPosEnd.clientY = top + (offsetHeight / 2 + targetImageHeight / 4);
    }

    const pos = mapClientToCanvas(
      clientPos as MouseEvent<HTMLCanvasElement>,
      canvas,
      viewMatrix,
    );
    const posEnd = mapClientToCanvas(
      clientPosEnd as MouseEvent<HTMLCanvasElement>,
      canvas,
      viewMatrix,
    );

    const posInfo = {
      x: pos[0],
      y: pos[1],
      w: posEnd[0] - pos[0],
      h: posEnd[1] - pos[1],
    };

    handleCompleteOperation(
      Tool.Image,
      {
        imageData: data,
      },
      posInfo,
    );
  };

  image.src = data;
};

export const onBackgroundImageComplete = (
  data: string,
  canvas: HTMLCanvasElement,
  viewMatrix: number[],
  handleCompleteOperation: (tool?: Tool, data?: Image, pos?: Position) => void,
) => {
  handleCompleteOperation(Tool.Background, {
    imageData: data,
  });
};
