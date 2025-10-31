import type { PaintStore, Tool } from "../types/Tool";
import {
  placeCircle,
  placeRectangle,
  placeTriangle,
  SHAPE_DEFAULTS,
} from "../utils/drawing";
import { generateLayerId } from "../utils/layers";

export class ShapeTool implements Tool {
  onMouseDown(event: MouseEvent, store: PaintStore) {
    const canvas = store.canvasElement;

    if (!canvas) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn("[ShapeTool] Missing canvas reference; cannot draw");
      }
      return;
    }

    const { selectedStrokeColor, selectedFillColor, selectedShape } = store;
    const x = event.offsetX;
    const y = event.offsetY;

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
    // Click-to-place interaction does not track mouse move.
  }

  onMouseUp() {
    // No-op for click-to-place tool.
  }
}
