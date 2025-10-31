import classNames from "classnames";
import { useCallback } from "react";
import { usePaintStore } from "../../stores/usePaintStore";

const Toolbar = () => {
  const currentTool = usePaintStore((state) => state.currentTool);
  const setCurrentTool = usePaintStore((state) => state.setCurrentTool);

  const handleShapeClick = useCallback(() => {
    setCurrentTool(currentTool === "shape" ? null : "shape");
  }, [currentTool, setCurrentTool]);

  const handleFillClick = useCallback(() => {
    setCurrentTool(currentTool === "fill" ? null : "fill");
  }, [currentTool, setCurrentTool]);

  return (
    <div className="toolbar">
      <h2>Tools</h2>
      <div className="tool-buttons">
        <button
          type="button"
          className={classNames("tool-button", {
            active: currentTool === "shape",
          })}
          onClick={handleShapeClick}
        >
          Shape Tool
        </button>
        <button
          type="button"
          className={classNames("tool-button", {
            active: currentTool === "fill",
          })}
          onClick={handleFillClick}
        >
          Fill Tool
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
