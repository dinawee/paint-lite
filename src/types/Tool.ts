import type { CanvasMouseEvent } from "./Canvas";

export type ToolType = "shape" | "fill";

export interface Tool {
  onMouseDown: (
    event: CanvasMouseEvent,
    store: PaintStore,
    canvas: HTMLCanvasElement,
  ) => void;
  onMouseMove: (
    event: CanvasMouseEvent,
    store: PaintStore,
    canvas: HTMLCanvasElement,
  ) => void;
  onMouseUp: (
    event: CanvasMouseEvent,
    store: PaintStore,
    canvas: HTMLCanvasElement,
  ) => void;
}

export type ToolRegistry = Partial<Record<ToolType, Tool>>;

export type ShapeType = "circle" | "rectangle" | "triangle";

export interface ShapeLayerData {
  shape: ShapeType;
  strokeColor: string;
  fillColor: string | null;
  x: number;
  y: number;
  size: number;
}

export type LayerType = "shape" | "fill";

export interface Layer<TData = unknown> {
  id: string;
  type: LayerType;
  data?: TData;
  createdAt?: number;
}

export interface FillLayerData {
  color: string | null;
}

interface PaintState {
  currentTool: ToolType | null;
  selectedStrokeColor: string;
  selectedFillColor: string | null;
  selectedShape: ShapeType;
  showControlPanel: boolean;
  layers: Layer[];
  canvasElement: HTMLCanvasElement | null;
}

interface PaintActions {
  setCurrentTool: (tool: ToolType | null) => void;
  setSelectedStrokeColor: (color: string) => void;
  setSelectedFillColor: (color: string | null) => void;
  setSelectedShape: (shape: ShapeType) => void;
  setShowControlPanel: (visible: boolean) => void;
  setCanvasElement: (canvas: HTMLCanvasElement | null) => void;
  addLayer: (layer: Layer) => void;
  clearLayers: () => void;
}

export type PaintStore = PaintState & PaintActions;
