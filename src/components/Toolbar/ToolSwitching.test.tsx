import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import type { CanvasMouseEvent } from "../../types/Canvas";
import type { PaintStore, Tool } from "../../types/Tool";
import { registerTool } from "../../tools/registry";
import { ShapeTool } from "../../tools/ShapeTool";
import { FillTool } from "../../tools/FillTool";
import { usePaintStore } from "../../stores/usePaintStore";

type ToolSpy = ReturnType<typeof createToolMock>;

const createToolMock = () => {
  const onMouseDown =
    vi.fn<
      (
        event: CanvasMouseEvent,
        store: PaintStore,
        canvas: HTMLCanvasElement,
      ) => void
    >();
  const onMouseMove =
    vi.fn<
      (
        event: CanvasMouseEvent,
        store: PaintStore,
        canvas: HTMLCanvasElement,
      ) => void
    >();
  const onMouseUp =
    vi.fn<
      (
        event: CanvasMouseEvent,
        store: PaintStore,
        canvas: HTMLCanvasElement,
      ) => void
    >();

  const tool: Tool = {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };

  return { tool, onMouseDown, onMouseMove, onMouseUp };
};

const resetStore = () => {
  usePaintStore.setState({
    currentTool: null,
    layers: [],
    showControlPanel: false,
    canvasElement: null,
    selectedStrokeColor: "#000000",
    selectedFillColor: "#ff0000",
    selectedShape: "rectangle",
  });
};

const getCanvas = () =>
  document.querySelector("canvas") as HTMLCanvasElement | null;

const waitForCanvasReady = async () => {
  await waitFor(() => {
    expect(usePaintStore.getState().canvasElement).not.toBeNull();
  });
  const canvas = getCanvas();
  if (!canvas) {
    throw new Error("Canvas element not found");
  }
  return canvas;
};

describe("Tool switching", () => {
  let shapeMock: ToolSpy;
  let fillMock: ToolSpy;

  beforeEach(() => {
    shapeMock = createToolMock();
    fillMock = createToolMock();
    registerTool("shape", shapeMock.tool);
    registerTool("fill", fillMock.tool);
    act(() => {
      resetStore();
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    registerTool("shape", new ShapeTool());
    registerTool("fill", new FillTool());
    act(() => {
      resetStore();
    });
    vi.clearAllMocks();
  });

  it("activates shape handlers when Shape Tool is selected", async () => {
    const user = userEvent.setup();
    render(<App />);
    const canvas = await waitForCanvasReady();

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /shape tool/i }));
    });
    await act(async () => {
      await user.click(canvas);
    });

    expect(shapeMock.onMouseDown).toHaveBeenCalledTimes(1);
    expect(fillMock.onMouseDown).not.toHaveBeenCalled();
    expect(usePaintStore.getState().currentTool).toBe("shape");
    expect(usePaintStore.getState().showControlPanel).toBe(true);
  });

  it("switches to fill handlers when Fill Tool is selected after Shape Tool", async () => {
    const user = userEvent.setup();
    render(<App />);
    const canvas = await waitForCanvasReady();

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /shape tool/i }));
    });
    await act(async () => {
      await user.click(canvas);
    });

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /fill tool/i }));
    });
    await act(async () => {
      await user.click(canvas);
    });

    expect(shapeMock.onMouseDown).toHaveBeenCalledTimes(1);
    expect(fillMock.onMouseDown).toHaveBeenCalledTimes(1);
    expect(usePaintStore.getState().currentTool).toBe("fill");
  });

  it("disables handlers when the active tool is toggled off", async () => {
    const user = userEvent.setup();
    render(<App />);
    const canvas = await waitForCanvasReady();

    const shapeButton = screen.getByRole("button", { name: /shape tool/i });
    await act(async () => {
      await user.click(shapeButton);
    });
    await act(async () => {
      await user.click(canvas);
    });

    expect(shapeMock.onMouseDown).toHaveBeenCalledTimes(1);

    await act(async () => {
      await user.click(shapeButton);
    }); // toggle off
    await act(async () => {
      await user.click(canvas);
    });

    expect(shapeMock.onMouseDown).toHaveBeenCalledTimes(1);
    expect(fillMock.onMouseDown).not.toHaveBeenCalled();
    expect(usePaintStore.getState().currentTool).toBeNull();
    expect(usePaintStore.getState().showControlPanel).toBe(false);
  });

  it("ignores canvas interaction when no tool is selected", async () => {
    const user = userEvent.setup();
    render(<App />);
    const canvas = await waitForCanvasReady();

    await act(async () => {
      await user.click(canvas);
    });

    expect(shapeMock.onMouseDown).not.toHaveBeenCalled();
    expect(fillMock.onMouseDown).not.toHaveBeenCalled();
    expect(usePaintStore.getState().currentTool).toBeNull();
  });
});
