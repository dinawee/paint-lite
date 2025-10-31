import { ChangeEvent, useCallback } from 'react';
import { usePaintStore } from '../../stores/usePaintStore';
import type { ShapeType } from '../../types/Tool';

const SHAPE_OPTIONS: Array<{ value: ShapeType; label: string }> = [
  { value: 'circle', label: 'Circle' },
  { value: 'rectangle', label: 'Rectangle' },
  { value: 'triangle', label: 'Triangle' },
];

const ControlPanel = () => {
  const currentTool = usePaintStore((state) => state.currentTool);
  const setSelectedShape = usePaintStore((state) => state.setSelectedShape);
  const selectedShape = usePaintStore((state) => state.selectedShape);
  const selectedColor = usePaintStore((state) => state.selectedColor);
  const setSelectedColor = usePaintStore((state) => state.setSelectedColor);
  const clearCanvas = usePaintStore((state) => state.clearCanvas);
  const showControlPanel = usePaintStore((state) => state.showControlPanel);

  const handleShapeChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedShape(event.target.value as ShapeType);
    },
    [setSelectedShape],
  );

  const handleColorChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedColor(event.target.value);
    },
    [setSelectedColor],
  );

  const isShapeToolActive = currentTool === 'shape';

  return (
    <div className="control-panel">
      <div className="panel-toolbar">
        <button type="button" className="clear-button" onClick={clearCanvas}>
          Clear Canvas
        </button>
      </div>
      <h3>Tool Options</h3>
      <div className="control-content">
        {!showControlPanel || !currentTool ? (
          <p>No tool selected</p>
        ) : isShapeToolActive ? (
          <>
            <div className="form-field">
              <label htmlFor="shape-select">Shape</label>
              <select id="shape-select" value={selectedShape} onChange={handleShapeChange}>
                {SHAPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="shape-color">Color</label>
              <input
                id="shape-color"
                type="color"
                value={selectedColor}
                onChange={handleColorChange}
                aria-label="Shape color"
              />
            </div>
          </>
        ) : (
          <p>Controls for {currentTool} coming soon</p>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
