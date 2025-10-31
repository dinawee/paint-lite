import type { Tool, PaintStore } from '../types/Tool';

export class ShapeTool implements Tool {
  private isDrawing = false;

  onMouseDown(event: MouseEvent, store: PaintStore) {
    this.isDrawing = true;
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[ShapeTool] onMouseDown', {
        x: event.offsetX,
        y: event.offsetY,
        color: store.selectedColor,
        shape: store.selectedShape,
      });
    }
  }

  onMouseMove(event: MouseEvent, store: PaintStore) {
    if (!this.isDrawing || !import.meta.env.DEV) {
      return;
    }

    // eslint-disable-next-line no-console
    console.debug('[ShapeTool] onMouseMove', {
      x: event.offsetX,
      y: event.offsetY,
      color: store.selectedColor,
      shape: store.selectedShape,
    });
  }

  onMouseUp(event: MouseEvent, store: PaintStore) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[ShapeTool] onMouseUp', {
        x: event.offsetX,
        y: event.offsetY,
        color: store.selectedColor,
        shape: store.selectedShape,
      });
    }
    this.isDrawing = false;
  }
}
