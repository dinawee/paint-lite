import { describe, it, expect, vi } from "vitest";
import { clearCanvas } from "../../utils/drawing";
import { render, screen, fireEvent } from "@testing-library/react";
import { useEffect } from "react";
import App from "../../App";
import { usePaintStore } from "../../stores/usePaintStore";

const setupMockCanvas = () => {
  const clearRect = vi.fn();
  const getContext = vi.fn(() => ({
    clearRect,
  }));
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 200;
  canvas.getContext = getContext as unknown as typeof canvas.getContext;
  return { canvas, getContext, clearRect };
};

describe("clearCanvas helper", () => {
  it("clears the canvas when context is available", () => {
    const { canvas, getContext, clearRect } = setupMockCanvas();

    clearCanvas(canvas);

    expect(getContext).toHaveBeenCalledWith("2d");
    expect(clearRect).toHaveBeenCalledWith(0, 0, 300, 200);
  });

  it("handles missing canvas gracefully", () => {
    expect(() => clearCanvas(null)).not.toThrow();
  });
});

describe("ControlPanel Clear Canvas integration", () => {
  const registerCanvas = (canvas: HTMLCanvasElement) => {
    usePaintStore.getState().setCanvasElement(canvas);
  };

  const seedLayers = () => {
    const store = usePaintStore.getState();
    store.addLayer({
      id: "layer-1",
      type: "shape",
      createdAt: Date.now(),
      data: { shape: "circle" },
    });
  };

  it("clears the layers and canvas when the button is clicked", () => {
    const { canvas, clearRect } = setupMockCanvas();
    clearRect.mockClear();

    const Wrapper = () => {
      useEffect(() => {
        registerCanvas(canvas);
        seedLayers();
      }, []);
      return <App />;
    };

    render(<Wrapper />);

    const button = screen.getByRole("button", { name: /clear canvas/i });
    fireEvent.click(button);

    expect(clearRect).toHaveBeenCalled();
    expect(usePaintStore.getState().layers).toHaveLength(0);
  });
});
