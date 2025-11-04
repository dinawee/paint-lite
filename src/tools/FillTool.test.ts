import { describe, it, expect, vi, beforeEach } from "vitest";
import type { CanvasMouseEvent } from "../types/Canvas";
import type { PaintStore } from "../types/Tool";
import { FillTool } from "./FillTool";
import { fillCanvas } from "../utils/drawing";

vi.mock("../utils/drawing", async () => {
  const actual =
    await vi.importActual<typeof import("../utils/drawing")>(
      "../utils/drawing",
    );

  return {
    ...actual,
    fillCanvas: vi.fn(),
  };
});

vi.mock("../utils/layers", () => ({
  generateLayerId: vi.fn(() => "fill-layer-1"),
}));

const mockedFillCanvas = fillCanvas as unknown as ReturnType<typeof vi.fn>;

const createStore = (overrides: Partial<PaintStore> = {}): PaintStore => ({
  currentTool: "fill",
  selectedStrokeColor: "#000000",
  selectedFillColor: "#ff0000",
  selectedShape: "circle",
  showControlPanel: false,
  layers: [],
  canvasElement: null,
  setCurrentTool: vi.fn(),
  setSelectedStrokeColor: vi.fn(),
  setSelectedFillColor: vi.fn(),
  setSelectedShape: vi.fn(),
  setShowControlPanel: vi.fn(),
  setCanvasElement: vi.fn(),
  addLayer: vi.fn(),
  clearLayers: vi.fn(),
  ...overrides,
});

const noopEvent: CanvasMouseEvent = {
  coordinates: { x: 0, y: 0 },
};

describe("FillTool", () => {
  const canvas = document.createElement("canvas");

  beforeEach(() => {
    mockedFillCanvas.mockClear();
  });

  it("fills the canvas and logs a layer", () => {
    const store = createStore({
      selectedFillColor: "#123456",
    });
    const addLayerMock = store.addLayer as unknown as ReturnType<typeof vi.fn>;

    const tool = new FillTool();
    tool.onMouseDown(noopEvent, store, canvas);

    expect(mockedFillCanvas).toHaveBeenCalledWith(canvas, "#123456");
    expect(addLayerMock).toHaveBeenCalledTimes(1);
    expect(addLayerMock.mock.calls[0][0]).toMatchObject({
      id: "fill-layer-1",
      type: "fill",
      data: { color: "#123456" },
    });
  });

  it("skips filling when no fill color is selected", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const store = createStore({
      selectedFillColor: null,
    });

    const tool = new FillTool();
    tool.onMouseDown(noopEvent, store, canvas);

    expect(mockedFillCanvas).not.toHaveBeenCalled();
    expect(store.addLayer).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
