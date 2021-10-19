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

const _cacheBackgroundPosition: {
  [any: string]: Position;
} = {};

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
  let position: Position | undefined = _cacheBackgroundPosition[item.imageData];
  if (position) {
    drawImage(item, context, position, id, rerender);
  } else {
    onImageComplete(item.imageData, canvas, viewMatrix, (_tool, _data, pos) => {
      position = pos;
      _cacheBackgroundPosition[item.imageData] = pos;
      drawImage(item, context, position, id, rerender);
    });
  }
};

export const onImageComplete = (
  data: string,
  canvas: HTMLCanvasElement,
  viewMatrix: number[],
  handleCompleteOperation: (tool?: Tool, data?: Image, pos?: Position) => void,
) => {
  const image = new Image();

  image.onload = () => {
    const { top, left } = canvas.getBoundingClientRect();
    const imageWidth = image.width;
    const imageHeight = image.height;
    const offsetWidth = canvas.offsetWidth;
    const offsetHeight = canvas.offsetHeight;

    const pos = mapClientToCanvas(
      {
        clientX: left + (offsetWidth / 2 - imageWidth / 4),
        clientY: top + (offsetHeight / 2 - imageHeight / 4),
      } as MouseEvent<HTMLCanvasElement>,
      canvas,
      viewMatrix,
    );
    const posEnd = mapClientToCanvas(
      {
        clientX: left + (offsetWidth / 2 + imageWidth / 4),
        clientY: top + (offsetHeight / 2 + imageHeight / 4),
      } as MouseEvent<HTMLCanvasElement>,
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
