const DEFAULT_CIRCLE_RADIUS = 30;
const DEFAULT_RECT_WIDTH = 60;
const DEFAULT_RECT_HEIGHT = 40;
const DEFAULT_TRIANGLE_SIZE = 50;

export const drawOnCanvas = (
  canvas: HTMLCanvasElement,
  drawFn: (ctx: CanvasRenderingContext2D) => void,
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  drawFn(ctx);
};

export const placeCircle = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  radius: number = DEFAULT_CIRCLE_RADIUS,
) => {
  drawOnCanvas(canvas, (ctx) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  });
};

export const placeRectangle = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  width: number = DEFAULT_RECT_WIDTH,
  height: number = DEFAULT_RECT_HEIGHT,
) => {
  drawOnCanvas(canvas, (ctx) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(x - width / 2, y - height / 2, width, height);
  });
};

export const placeTriangle = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  size: number = DEFAULT_TRIANGLE_SIZE,
) => {
  drawOnCanvas(canvas, (ctx) => {
    const height = (size * Math.sqrt(3)) / 2;

    ctx.beginPath();
    ctx.moveTo(x, y - height / 2);
    ctx.lineTo(x - size / 2, y + height / 2);
    ctx.lineTo(x + size / 2, y + height / 2);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  });
};

export const SHAPE_DEFAULTS = {
  circle: DEFAULT_CIRCLE_RADIUS,
  rectangle: {
    width: DEFAULT_RECT_WIDTH,
    height: DEFAULT_RECT_HEIGHT,
  },
  triangle: DEFAULT_TRIANGLE_SIZE,
};
