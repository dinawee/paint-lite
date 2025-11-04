import { vi, describe, it, expect, beforeEach } from "vitest";
import type { CanvasMouseEvent } from "../types/Canvas";
import type { PaintStore, ShapeType } from "../types/Tool";
import { ShapeTool } from "./ShapeTool";
import {
  placeCircle,
  placeRectangle,
  placeTriangle,
  SHAPE_DEFAULTS,
} from "../utils/drawing";

vi.mock("../utils/drawing", async () => {
  const actual =
    await vi.importActual<typeof import("../utils/drawing")>(
      "../utils/drawing",
    );

  return {
    ...actual,
    placeCircle: vi.fn(),
    placeRectangle: vi.fn(),
    placeTriangle: vi.fn(),
  };
});

vi.mock("../utils/layers", () => ({
  generateLayerId: vi.fn(() => "layer-123"),
}));

const mockedPlaceCircle = placeCircle as unknown as ReturnType<typeof vi.fn>;
const mockedPlaceRectangle = placeRectangle as unknown as ReturnType<
  typeof vi.fn
>;
const mockedPlaceTriangle = placeTriangle as unknown as ReturnType<
  typeof vi.fn
>;

const createStore = (overrides: Partial<PaintStore> = {}): PaintStore => ({
  currentTool: "shape",
  selectedStrokeColor: "#000000",
  selectedFillColor: "#ff0000",
  selectedShape: "circle",
  showControlPanel: true,
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

const createEvent = (x: number, y: number): CanvasMouseEvent => ({
  coordinates: { x, y },
});

describe("ShapeTool", () => {
  const canvas = document.createElement("canvas");
  let tool: ShapeTool;

  beforeEach(() => {
    tool = new ShapeTool();
    mockedPlaceCircle.mockClear();
    mockedPlaceRectangle.mockClear();
    mockedPlaceTriangle.mockClear();
  });

  const getLayerData = (store: PaintStore) => {
    const addLayerMock = store.addLayer as unknown as ReturnType<typeof vi.fn>;
    return addLayerMock.mock.calls[0]?.[0];
  };

  const runDraw = (
    shape: ShapeType,
    strokeColor: string,
    fillColor: string | null,
  ) => {
    const store = createStore({
      selectedShape: shape,
      selectedStrokeColor: strokeColor,
      selectedFillColor: fillColor,
    });
    const event = createEvent(100, 150);

    tool.onMouseDown(event, store, canvas);
    return { store, event };
  };

  it("draws a circle with stroke and fill", () => {
    const { store, event } = runDraw("circle", "#123456", "#abcdef");

    expect(mockedPlaceCircle).toHaveBeenCalledWith(
      canvas,
      event.coordinates.x,
      event.coordinates.y,
      "#123456",
      "#abcdef",
      SHAPE_DEFAULTS.circle,
    );
    expect(store.addLayer).toHaveBeenCalledTimes(1);
    expect(getLayerData(store)).toMatchObject({
      id: "layer-123",
      type: "shape",
      data: expect.objectContaining({
        shape: "circle",
        strokeColor: "#123456",
        fillColor: "#abcdef",
        x: event.coordinates.x,
        y: event.coordinates.y,
        size: SHAPE_DEFAULTS.circle * 2,
      }),
    });
  });

  it("draws a rectangle using default dimensions", () => {
    const { store, event } = runDraw("rectangle", "#ff00ff", "#00ffff");

    expect(mockedPlaceRectangle).toHaveBeenCalledWith(
      canvas,
      event.coordinates.x,
      event.coordinates.y,
      "#ff00ff",
      "#00ffff",
      SHAPE_DEFAULTS.rectangle.width,
      SHAPE_DEFAULTS.rectangle.height,
    );
    expect(store.addLayer).toHaveBeenCalledTimes(1);
    expect(getLayerData(store)).toMatchObject({
      data: expect.objectContaining({
        shape: "rectangle",
        size: Math.max(
          SHAPE_DEFAULTS.rectangle.width,
          SHAPE_DEFAULTS.rectangle.height,
        ),
      }),
    });
  });

  it("draws a triangle using default size", () => {
    const { store, event } = runDraw("triangle", "#0f0f0f", "#f0f0f0");

    expect(mockedPlaceTriangle).toHaveBeenCalledWith(
      canvas,
      event.coordinates.x,
      event.coordinates.y,
      "#0f0f0f",
      "#f0f0f0",
      SHAPE_DEFAULTS.triangle,
    );
    expect(store.addLayer).toHaveBeenCalledTimes(1);
    expect(getLayerData(store)).toMatchObject({
      data: expect.objectContaining({
        shape: "triangle",
        size: SHAPE_DEFAULTS.triangle,
      }),
    });
  });

  it("omits fill when fill color is null", () => {
    const { store } = runDraw("circle", "#111111", null);

    expect(mockedPlaceCircle).toHaveBeenCalledWith(
      canvas,
      expect.any(Number),
      expect.any(Number),
      "#111111",
      null,
      SHAPE_DEFAULTS.circle,
    );
    expect(getLayerData(store)?.data).toMatchObject({
      fillColor: null,
    });
  });

  it("skips drawing when stroke color is missing", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const store = createStore({
      selectedStrokeColor: "",
      selectedShape: "circle",
    });
    const event = createEvent(50, 60);

    tool.onMouseDown(event, store, canvas);

    expect(mockedPlaceCircle).not.toHaveBeenCalled();
    expect(store.addLayer).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
