export interface CanvasProps {
  width?: number;
  height?: number;
  className?: string;
}

export interface CanvasCoordinates {
  x: number;
  y: number;
}

export interface CanvasMouseEvent {
  coordinates: CanvasCoordinates;
  originalEvent: MouseEvent;
}