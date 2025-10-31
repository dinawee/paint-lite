import type { Tool, PaintStore } from '../types/Tool';

export class FillTool implements Tool {
  onMouseDown(event: MouseEvent, store: PaintStore) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[FillTool] onMouseDown', {
        x: event.offsetX,
        y: event.offsetY,
        color: store.selectedColor,
      });
    }
  }

  onMouseMove(event: MouseEvent, store: PaintStore) {
    console.log('fill mouse move')
    if (!import.meta.env.DEV) {
      return;
    }

    // eslint-disable-next-line no-console
    console.debug('[FillTool] onMouseMove', {
      x: event.offsetX,
      y: event.offsetY,
      color: store.selectedColor,
    });
  }

  onMouseUp(event: MouseEvent, store: PaintStore) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[FillTool] onMouseUp', {
        x: event.offsetX,
        y: event.offsetY,
        color: store.selectedColor,
      });
    }
  }
}
