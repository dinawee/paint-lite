import classNames from "classnames";
import { usePaintStore } from "../../stores/usePaintStore";

const Toolbar = () => {
  const currentTool = usePaintStore((state) => state.currentTool);
  const setCurrentTool = usePaintStore((state) => state.setCurrentTool);

  const handleShapeClick = () => {
    setCurrentTool(currentTool === "shape" ? null : "shape");
  };

  const handleFillClick = () => {
    setCurrentTool(currentTool === "fill" ? null : "fill");
  };

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
