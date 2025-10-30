import { useCallback } from 'react';
import type { CanvasProps, CanvasMouseEvent } from '../../types/Canvas';
import { useCanvas } from '../../hooks/useCanvas';

const Canvas = ({ width = 600, height = 400, className = '' }: CanvasProps) => {
  const { canvasRef, getCanvasCoordinates } = useCanvas();

  // Mouse event handlers
  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const coordinates = getCanvasCoordinates(event.nativeEvent);
    const canvasEvent: CanvasMouseEvent = {
      coordinates,
      originalEvent: event.nativeEvent,
    };

    console.log('Canvas mousedown:', canvasEvent);
    // TODO: Connect to tool system in future
  }, [getCanvasCoordinates]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const coordinates = getCanvasCoordinates(event.nativeEvent);
    const canvasEvent: CanvasMouseEvent = {
      coordinates,
      originalEvent: event.nativeEvent,
    };

    console.log('Canvas mousemove:', canvasEvent);
    // TODO: Connect to tool system in future
  }, [getCanvasCoordinates]);

  const handleMouseUp = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const coordinates = getCanvasCoordinates(event.nativeEvent);
    const canvasEvent: CanvasMouseEvent = {
      coordinates,
      originalEvent: event.nativeEvent,
    };

    console.log('Canvas mouseup:', canvasEvent);
    // TODO: Connect to tool system in future
  }, [getCanvasCoordinates]);

  return (
    <div className={`canvas-container ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          border: '1px solid #ccc',
          cursor: 'crosshair',
        }}
      />
    </div>
  );
};

export default Canvas;