import type { ChangeEvent } from "react";
import { useEffect, useRef } from "react";
import { usePaintStore } from "../../stores/usePaintStore";
import type { ShapeType } from "../../types/Tool";
import { clearCanvas } from "../../utils/drawing";

const SHAPE_OPTIONS: Array<{ value: ShapeType; label: string }> = [
  { value: "circle", label: "Circle" },
  { value: "rectangle", label: "Rectangle" },
  { value: "triangle", label: "Triangle" },
];

const ControlPanel = () => {
  const currentTool = usePaintStore((state) => state.currentTool);
  const setSelectedShape = usePaintStore((state) => state.setSelectedShape);
  const selectedShape = usePaintStore((state) => state.selectedShape);
  const selectedStrokeColor = usePaintStore(
    (state) => state.selectedStrokeColor,
  );
  const setSelectedStrokeColor = usePaintStore(
    (state) => state.setSelectedStrokeColor,
  );
  const selectedFillColor = usePaintStore((state) => state.selectedFillColor);
  const setSelectedFillColor = usePaintStore(
    (state) => state.setSelectedFillColor,
  );
  const clearLayers = usePaintStore((state) => state.clearLayers);
  const canvas = usePaintStore((state) => state.canvasElement);
  const showControlPanel = usePaintStore((state) => state.showControlPanel);

  const handleShapeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedShape(event.target.value as ShapeType);
  };

  const lastFillColorRef = useRef<string>(selectedFillColor ?? "#ff0000");

  useEffect(() => {
    if (selectedFillColor) {
      lastFillColorRef.current = selectedFillColor;
    }
  }, [selectedFillColor]);

  const handleStrokeColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedStrokeColor(event.target.value);
  };

  const handleFillColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextColor = event.target.value;
    lastFillColorRef.current = nextColor;
    setSelectedFillColor(nextColor);
  };

  const handleFillToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const enabled = event.target.checked;
    if (enabled) {
      setSelectedFillColor(lastFillColorRef.current);
    } else {
      if (selectedFillColor) {
        lastFillColorRef.current = selectedFillColor;
      }
      setSelectedFillColor(null);
    }
  };

  const handleClearCanvas = () => {
    clearCanvas(canvas);
    clearLayers();
  };

  const isShapeToolActive = currentTool === "shape";
  const isFillToolActive = currentTool === "fill";
  const isFillEnabled = selectedFillColor !== null;

  useEffect(() => {
    if (isFillToolActive && selectedFillColor === null) {
      setSelectedFillColor(lastFillColorRef.current);
    }
  }, [isFillToolActive, selectedFillColor, setSelectedFillColor]);

  return (
    <div className="control-panel">
      <div className="panel-toolbar">
        <button
          type="button"
          className="clear-button"
          onClick={handleClearCanvas}
        >
          Clear Canvas
        </button>
      </div>
      {showControlPanel ? <h3>Tool Options</h3> : null}
      <div className="control-content">
        {!showControlPanel || !currentTool ? (
          <p>No tool selected</p>
        ) : isShapeToolActive ? (
          <>
            <div className="form-field">
              <label htmlFor="shape-select">Shape</label>
              <select
                id="shape-select"
                value={selectedShape}
                onChange={handleShapeChange}
              >
                {SHAPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="shape-stroke-color">Stroke Color</label>
              <input
                id="shape-stroke-color"
                type="color"
                value={selectedStrokeColor}
                onChange={handleStrokeColorChange}
                aria-label="Shape stroke color"
              />
            </div>
            <div className="form-field">
              <label htmlFor="shape-fill-toggle" className="fill-toggle">
                <input
                  id="shape-fill-toggle"
                  type="checkbox"
                  checked={isFillEnabled}
                  onChange={handleFillToggle}
                  aria-label="Shape fill toggle"
                />
                <span>Enable Fill</span>
              </label>
              {isFillEnabled && (
                <input
                  id="shape-fill-color"
                  type="color"
                  value={selectedFillColor ?? lastFillColorRef.current}
                  onChange={handleFillColorChange}
                  aria-label="Shape fill color"
                />
              )}
            </div>
          </>
        ) : isFillToolActive ? (
          <div className="form-field">
            <label htmlFor="fill-tool-color">Fill Color</label>
            <input
              id="fill-tool-color"
              type="color"
              value={selectedFillColor ?? lastFillColorRef.current}
              onChange={handleFillColorChange}
              aria-label="Fill tool color"
            />
          </div>
        ) : (
          <p>Controls for {currentTool} coming soon</p>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
