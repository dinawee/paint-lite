import type { Tool, PaintStore } from "../types/Tool";
import { fillCanvas } from "../utils/drawing";
import { generateLayerId } from "../utils/layers";
import type { CanvasMouseEvent } from "../types/Canvas";

export class FillTool implements Tool {
  onMouseDown(
    _: CanvasMouseEvent,
    store: PaintStore,
    canvas: HTMLCanvasElement,
  ) {
    const fillColor = store.selectedFillColor;

    if (!fillColor) {
      if (import.meta.env.DEV) {
        console.warn("[FillTool] Missing fill color reference; cannot draw");
      }
      return;
    }

    fillCanvas(canvas, fillColor);

    store.addLayer({
      id: generateLayerId(),
      type: "fill",
      createdAt: Date.now(),
      data: { color: fillColor },
    });
  }

  onMouseMove() {
    // Not tracked
  }

  onMouseUp() {
    // Not tracked
  }
}
