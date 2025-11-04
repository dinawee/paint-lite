import type { PaintStore, Tool } from "../types/Tool";
import {
  placeCircle,
  placeRectangle,
  placeTriangle,
  SHAPE_DEFAULTS,
} from "../utils/drawing";
import { generateLayerId } from "../utils/layers";
import type { CanvasMouseEvent } from "../types/Canvas";

export class ShapeTool implements Tool {
  onMouseDown(
    event: CanvasMouseEvent,
    store: PaintStore,
    canvas: HTMLCanvasElement,
  ) {
    const { selectedStrokeColor, selectedFillColor, selectedShape } = store;

    if (!selectedStrokeColor || !selectedShape) {
      if (import.meta.env.DEV) {
        console.warn(
          "[ShapeTool] Missing color or shape reference; cannot draw",
        );
      }
      return;
    }

    const { x, y } = event.coordinates;

    switch (selectedShape) {
      case "circle":
        placeCircle(
          canvas,
          x,
          y,
          selectedStrokeColor,
          selectedFillColor,
          SHAPE_DEFAULTS.circle,
        );
        break;
      case "rectangle":
        placeRectangle(
          canvas,
          x,
          y,
          selectedStrokeColor,
          selectedFillColor,
          SHAPE_DEFAULTS.rectangle.width,
          SHAPE_DEFAULTS.rectangle.height,
        );
        break;
      case "triangle":
        placeTriangle(
          canvas,
          x,
          y,
          selectedStrokeColor,
          selectedFillColor,
          SHAPE_DEFAULTS.triangle,
        );
        break;
      default:
        break;
    }

    store.addLayer({
      id: generateLayerId(),
      type: "shape",
      createdAt: Date.now(),
      data: {
        shape: selectedShape,
        strokeColor: selectedStrokeColor,
        fillColor: selectedFillColor,
        x,
        y,
        size:
          selectedShape === "rectangle"
            ? Math.max(
                SHAPE_DEFAULTS.rectangle.width,
                SHAPE_DEFAULTS.rectangle.height,
              )
            : selectedShape === "circle"
              ? SHAPE_DEFAULTS.circle * 2
              : SHAPE_DEFAULTS.triangle,
      },
    });
  }

  onMouseMove() {
    // Not tracked
  }

  onMouseUp() {
    // Not tracked
  }
}
