import { useRef, useCallback } from 'react';
import type { CanvasCoordinates } from '../types/Canvas';

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // get canvas 2D context
  const getContext = useCallback((): CanvasRenderingContext2D | null => {
    if (!canvasRef.current) return null;
    return canvasRef.current.getContext('2d');
  }, []);

  // extract coordinates from mouse event
  const getCanvasCoordinates = useCallback((event: MouseEvent): CanvasCoordinates => {
    if (!canvasRef.current) {
      return { x: 0, y: 0 };
    }

    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: event.clientX - rect.left, // local X coordinate relative to the left edge of the canvas
      y: event.clientY - rect.top, // local Y coordinate relative to the top edge of the canvas
    };
  }, []);

  return {
    canvasRef,
    getContext,
    getCanvasCoordinates,
  };
};