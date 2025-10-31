import { create } from "zustand";

import type { Layer, PaintStore, ToolType } from "../types/Tool";

const initialState: Pick<
  PaintStore,
  | "currentTool"
  | "layers"
  | "selectedStrokeColor"
  | "selectedFillColor"
  | "selectedShape"
  | "showControlPanel"
  | "canvasElement"
> = {
  currentTool: null,
  layers: [],
  selectedStrokeColor: "#000000",
  selectedFillColor: "#ff0000",
  selectedShape: "rectangle",
  showControlPanel: false,
  canvasElement: null,
};

const isDev = import.meta.env.DEV;

const logStoreChange = (action: string, payload?: unknown) => {
  if (!isDev) {
    return;
  }

  // eslint-disable-next-line no-console
  console.debug(`[PaintStore] ${action}`, payload);
};

export const usePaintStore = create<PaintStore>((set) => ({
  ...initialState,

  setCurrentTool: (tool: ToolType | null) => {
    set(() => ({
      currentTool: tool,
      showControlPanel: Boolean(tool),
    }));
    logStoreChange("setCurrentTool", { tool });
  },

  setSelectedStrokeColor: (color: string) => {
    set(() => ({ selectedStrokeColor: color }));
    logStoreChange("setSelectedStrokeColor", { color });
  },

  setSelectedFillColor: (color: string | null) => {
    set(() => ({ selectedFillColor: color }));
    logStoreChange("setSelectedFillColor", { color });
  },

  setSelectedShape: (shape) => {
    set(() => ({ selectedShape: shape }));
    logStoreChange("setSelectedShape", { shape });
  },

  setShowControlPanel: (visible: boolean) => {
    set(() => ({ showControlPanel: visible }));
    logStoreChange("setShowControlPanel", { visible });
  },

  setCanvasElement: (canvas: HTMLCanvasElement | null) => {
    set(() => ({ canvasElement: canvas }));
    logStoreChange("setCanvasElement", { registered: Boolean(canvas) });
  },

  addLayer: (layer: Layer) => {
    set((state) => {
      const layers = [...state.layers, layer];
      logStoreChange("addLayer", { layerCount: layers.length });
      return { layers };
    });
  },

  clearCanvas: () => {
    set((state) => {
      const { canvasElement } = state;
      if (canvasElement) {
        const ctx = canvasElement.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        }
      }
      logStoreChange("clearCanvas");
      return { layers: [] };
    });
  },
}));
