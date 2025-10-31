export type ToolType = 'shape' | 'fill';

export type ShapeType = 'circle' | 'rectangle' | 'triangle';

export type LayerType = 'shape' | 'fill';

export interface Layer<TData = unknown> {
  id: string;
  type: LayerType;
  data?: TData;
  createdAt?: number;
}

export interface ShapeLayerData {
  shape: ShapeType;
  strokeColor: string;
  fillColor: string;
  x: number;
  y: number;
  size: number;
}

export interface PaintState {
  currentTool: ToolType | null;
  selectedStrokeColor: string;
  selectedFillColor: string | null;
  selectedShape: ShapeType;
  showControlPanel: boolean;
  layers: Layer[];
  canvasElement: HTMLCanvasElement | null;
}

export interface PaintActions {
  setCurrentTool: (tool: ToolType | null) => void;
  setSelectedStrokeColor: (color: string) => void;
  setSelectedFillColor: (color: string | null) => void;
  setSelectedShape: (shape: ShapeType) => void;
  setShowControlPanel: (visible: boolean) => void;
  setCanvasElement: (canvas: HTMLCanvasElement | null) => void;
  addLayer: (layer: Layer) => void;
  clearCanvas: () => void;
}

export interface Tool {
  onMouseDown: (event: MouseEvent, store: PaintStore) => void;
  onMouseMove: (event: MouseEvent, store: PaintStore) => void;
  onMouseUp: (event: MouseEvent, store: PaintStore) => void;
}

export type ToolRegistry = Partial<Record<ToolType, Tool>>;

export type PaintStore = PaintState & PaintActions;
