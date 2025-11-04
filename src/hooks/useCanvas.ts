import { useRef } from "react";
import type { CanvasCoordinates } from "../types/Canvas";

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // get canvas 2D context
  const getContext = (): CanvasRenderingContext2D | null => {
    if (!canvasRef.current) {
      if (import.meta.env.DEV) {
        console.warn("[CanvasContext] Missing canvas reference");
      }
      return null;
    }
    return canvasRef.current.getContext("2d");
  };

  // extract coordinates from mouse event
  const getCanvasCoordinates = (event: MouseEvent): CanvasCoordinates => {
    if (!canvasRef.current) {
      return { x: 0, y: 0 };
    }

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width || 1;
    const scaleY = canvas.height / rect.height || 1;

    return {
      x: (event.clientX - rect.left) * scaleX, // local X coordinate relative to the left edge of the canvas
      y: (event.clientY - rect.top) * scaleY, // local Y coordinate relative to the top edge of the canvas
    };
  };

  return {
    canvasRef,
    getContext,
    getCanvasCoordinates,
  };
};
