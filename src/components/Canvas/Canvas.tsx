import { useEffect } from "react";
import type { CanvasProps, CanvasMouseEvent } from "../../types/Canvas";
import { useCanvas } from "../../hooks/useCanvas";
import { useCanvasTool } from "../../hooks/useCanvasTool";
import { usePaintStore } from "../../stores/usePaintStore";

const Canvas = ({
  width = 1600,
  height = 900,
  className = "",
}: CanvasProps) => {
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

  const buildCanvasEvent = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ): CanvasMouseEvent => {
    const coordinates = getCanvasCoordinates(event.nativeEvent);
    return {
      coordinates,
    };
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvasEvent = buildCanvasEvent(event);

    if (import.meta.env.DEV) {
      console.debug("Canvas mousedown:", { canvasEvent, currentToolType });
    }

    toolMouseDown(canvasEvent);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvasEvent = buildCanvasEvent(event);

    toolMouseMove(canvasEvent);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvasEvent = buildCanvasEvent(event);

    if (import.meta.env.DEV) {
      console.debug("Canvas mouseup:", { canvasEvent, currentToolType });
    }

    toolMouseUp(canvasEvent);
  };

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
