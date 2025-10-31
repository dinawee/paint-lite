import type { Tool, PaintStore } from "../types/Tool";
import { fillCanvas } from "../utils/drawing";
import { generateLayerId } from "../utils/layers";

export class FillTool implements Tool {
  onMouseDown(event: MouseEvent, store: PaintStore) {
    const canvas = store.canvasElement;
    const fillColor = store.selectedFillColor;

    if (!canvas || !fillColor) {
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
    // Click-to-place interaction does not track mouse move.
  }

  onMouseUp() {
    // Click-to-place interaction does not track mouse move.
  }
}
