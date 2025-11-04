const DEFAULT_CIRCLE_RADIUS = 30;
const DEFAULT_RECT_WIDTH = 60;
const DEFAULT_RECT_HEIGHT = 40;
const DEFAULT_TRIANGLE_SIZE = 50;

export const drawOnCanvas = (
  canvas: HTMLCanvasElement,
  drawFn: (ctx: CanvasRenderingContext2D) => void,
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  drawFn(ctx);
};

const DEFAULT_LINE_WIDTH = 2;

export const placeCircle = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  strokeColor: string,
  fillColor: string | null,
  radius: number = DEFAULT_CIRCLE_RADIUS,
  lineWidth: number = DEFAULT_LINE_WIDTH,
) => {
  drawOnCanvas(canvas, (ctx) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  });
};

export const placeRectangle = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  strokeColor: string,
  fillColor: string | null,
  width: number = DEFAULT_RECT_WIDTH,
  height: number = DEFAULT_RECT_HEIGHT,
  lineWidth: number = DEFAULT_LINE_WIDTH,
) => {
  drawOnCanvas(canvas, (ctx) => {
    const topLeftX = x - width / 2;
    const topLeftY = y - height / 2;
    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fillRect(topLeftX, topLeftY, width, height);
    }
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(topLeftX, topLeftY, width, height);
  });
};

export const placeTriangle = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  strokeColor: string,
  fillColor: string | null,
  size: number = DEFAULT_TRIANGLE_SIZE,
  lineWidth: number = DEFAULT_LINE_WIDTH,
) => {
  drawOnCanvas(canvas, (ctx) => {
    const height = (size * Math.sqrt(3)) / 2;

    ctx.beginPath();
    ctx.moveTo(x, y - height / 2);
    ctx.lineTo(x - size / 2, y + height / 2);
    ctx.lineTo(x + size / 2, y + height / 2);
    ctx.closePath();

    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
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

export const fillCanvas = (canvas: HTMLCanvasElement, color: string) => {
  drawOnCanvas(canvas, (ctx) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  });
};

export const clearCanvas = (canvas: HTMLCanvasElement | null) => {
  if (canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
};
