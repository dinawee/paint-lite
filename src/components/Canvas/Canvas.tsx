import { useCallback, useEffect } from "react";
import type { CanvasProps, CanvasMouseEvent } from "../../types/Canvas";
import { useCanvas } from "../../hooks/useCanvas";
import { useCanvasTool } from "../../hooks/useCanvasTool";
import { usePaintStore } from "../../stores/usePaintStore";

const Canvas = ({ width = 600, height = 400, className = "" }: CanvasProps) => {
  const { canvasRef, getCanvasCoordinates } = useCanvas();
  const { handlers, currentToolType } = useCanvasTool();
  const {
    onMouseDown: toolMouseDown,
    onMouseMove: toolMouseMove,
    onMouseUp: toolMouseUp,
  } = handlers;
  const setCanvasElement = usePaintStore((state) => state.setCanvasElement);

  useEffect(() => {
    const canvas = canvasRef.current ?? null;
    setCanvasElement(canvas);

    return () => setCanvasElement(null);
  }, [canvasRef, setCanvasElement]);

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

      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug("Canvas mousedown:", { canvasEvent, currentToolType });
      }

      toolMouseDown(event);
    },
    [buildCanvasEvent, currentToolType, toolMouseDown],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvasEvent = buildCanvasEvent(event);

      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        // console.debug('Canvas mousemove:', { canvasEvent, currentToolType });
      }

      toolMouseMove(event);
    },
    [buildCanvasEvent, currentToolType, toolMouseMove],
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvasEvent = buildCanvasEvent(event);

      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug("Canvas mouseup:", { canvasEvent, currentToolType });
      }

      toolMouseUp(event);
    },
    [buildCanvasEvent, currentToolType, toolMouseUp],
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
          border: "1px solid #ccc",
          cursor: currentToolType ? "crosshair" : "default",
        }}
      />
    </div>
  );
};

export default Canvas;
