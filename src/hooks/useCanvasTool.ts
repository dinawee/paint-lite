import { useCallback, useMemo } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { usePaintStore } from '../stores/usePaintStore';
import { getToolByType } from '../tools/registry';
import type { Tool } from '../types/Tool';

const noopHandler = (_event: ReactMouseEvent<HTMLCanvasElement>) => {};

// the useCanvasTool hook functions as an intermediary between the canvas component and the specific tool implementation
export const useCanvasTool = () => {
  const currentToolType = usePaintStore((state) => state.currentTool);

  const activeTool = useMemo<Tool | null>(() => getToolByType(currentToolType), [currentToolType]);

  const dispatchToolEvent = useCallback(
    (handler: keyof Tool, event: MouseEvent) => {
      if (!activeTool) {
        return;
      }
      const store = usePaintStore.getState();
      activeTool[handler](event, store);
    },
    [activeTool],
  );

  const handleMouseDown = useCallback(
    (event: ReactMouseEvent<HTMLCanvasElement>) => {
      dispatchToolEvent('onMouseDown', event.nativeEvent);
    },
    [dispatchToolEvent],
  );

  const handleMouseMove = useCallback(
    (event: ReactMouseEvent<HTMLCanvasElement>) => {
      dispatchToolEvent('onMouseMove', event.nativeEvent);
    },
    [dispatchToolEvent],
  );

  const handleMouseUp = useCallback(
    (event: ReactMouseEvent<HTMLCanvasElement>) => {
      dispatchToolEvent('onMouseUp', event.nativeEvent);
    },
    [dispatchToolEvent],
  );

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
