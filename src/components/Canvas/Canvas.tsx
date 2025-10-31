import { useCallback } from 'react';
import type { CanvasProps, CanvasMouseEvent } from '../../types/Canvas';
import { useCanvas } from '../../hooks/useCanvas';
import { usePaintStore } from '../../stores/usePaintStore';

const getLayerId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const Canvas = ({ width = 600, height = 400, className = '' }: CanvasProps) => {
  const { canvasRef, getCanvasCoordinates } = useCanvas();
  const currentTool = usePaintStore((state) => state.currentTool);
  const selectedColor = usePaintStore((state) => state.selectedColor);
  const addLayer = usePaintStore((state) => state.addLayer);

  const createLayer = useCallback(
    (eventName: string, event: CanvasMouseEvent) => {
      if (!currentTool) {
        return;
      }

      addLayer({
        id: getLayerId(),
        type: currentTool,
        data: {
          event: eventName,
          coordinates: event.coordinates,
          color: selectedColor,
        },
        createdAt: Date.now(),
      });
    },
    [addLayer, currentTool, selectedColor],
  );

  const buildCanvasEvent = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>): CanvasMouseEvent => {
      const coordinates = getCanvasCoordinates(event.nativeEvent);
      return {
        coordinates,
        originalEvent: event.nativeEvent,
      };
    },
    [getCanvasCoordinates],
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvasEvent = buildCanvasEvent(event);

      // eslint-disable-next-line no-console
      console.debug('Canvas mousedown:', { canvasEvent, currentTool });
      createLayer('mousedown', canvasEvent);
    },
    [buildCanvasEvent, createLayer, currentTool],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvasEvent = buildCanvasEvent(event);

      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug('Canvas mousemove:', { canvasEvent, currentTool });
      }
    },
    [buildCanvasEvent, currentTool],
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvasEvent = buildCanvasEvent(event);

      // eslint-disable-next-line no-console
      console.debug('Canvas mouseup:', { canvasEvent, currentTool });
      createLayer('mouseup', canvasEvent);
    },
    [buildCanvasEvent, createLayer, currentTool],
  );

  return (
    <div className={`${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          border: '1px solid #ccc',
          cursor: currentTool ? 'crosshair' : 'default',
        }}
      />
    </div>
  );
};

export default Canvas;
