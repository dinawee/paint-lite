export type ToolType = 'shape' | 'fill';

export type ShapeType = 'circle' | 'rectangle' | 'triangle';

export type LayerType = 'shape' | 'fill';

export interface Layer<TData = unknown> {
  id: string;
  type: LayerType;
  data?: TData;
  createdAt?: number;
}

export interface PaintState {
  currentTool: ToolType | null;
  selectedColor: string;
  selectedShape: ShapeType;
  showControlPanel: boolean;
  layers: Layer[];
}

export interface PaintActions {
  setCurrentTool: (tool: ToolType | null) => void;
  setSelectedColor: (color: string) => void;
  setSelectedShape: (shape: ShapeType) => void;
  setShowControlPanel: (visible: boolean) => void;
  addLayer: (layer: Layer) => void;
}

export interface Tool {
  onMouseDown: (event: MouseEvent, store: PaintStore) => void;
  onMouseMove: (event: MouseEvent, store: PaintStore) => void;
  onMouseUp: (event: MouseEvent, store: PaintStore) => void;
}

export type ToolRegistry = Partial<Record<ToolType, Tool>>;

export type PaintStore = PaintState & PaintActions;
