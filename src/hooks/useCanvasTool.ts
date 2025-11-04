import { useMemo } from "react";
import { usePaintStore } from "../stores/usePaintStore";
import { getToolByType } from "../tools/registry";
import type { Tool } from "../types/Tool";
import type { CanvasMouseEvent } from "../types/Canvas";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noopHandler = (_: CanvasMouseEvent) => {};

// the useCanvasTool hook functions as an intermediary between the canvas component and the specific tool implementation
export const useCanvasTool = () => {
  const currentToolType = usePaintStore((state) => state.currentTool);

  const activeTool = useMemo<Tool | null>(
    () => getToolByType(currentToolType),
    [currentToolType],
  );

  const dispatchToolEvent = (handler: keyof Tool, event: CanvasMouseEvent) => {
    if (!activeTool) {
      return;
    }

    const store = usePaintStore.getState();
    const canvas = store.canvasElement;
    if (!canvas) {
      if (import.meta.env.DEV) {
        console.warn("[ToolEvent] Missing canvas reference; cannot draw");
      }
      return;
    }

    activeTool[handler](event, store, canvas);
  };

  const handleMouseDown = (event: CanvasMouseEvent) => {
    dispatchToolEvent("onMouseDown", event);
  };

  const handleMouseMove = (event: CanvasMouseEvent) => {
    dispatchToolEvent("onMouseMove", event);
  };

  const handleMouseUp = (event: CanvasMouseEvent) => {
    dispatchToolEvent("onMouseUp", event);
  };

  return {
    currentToolType,
    activeTool,
    handlers: {
      onMouseDown: activeTool ? handleMouseDown : noopHandler,
      onMouseMove: activeTool ? handleMouseMove : noopHandler,
      onMouseUp: activeTool ? handleMouseUp : noopHandler,
    },
  };
};
