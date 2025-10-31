import { useMemo } from "react";
import { usePaintStore } from "../../stores/usePaintStore";
import type { Layer, ShapeLayerData, FillLayerData } from "../../types/Tool";

const formatTimestamp = (timestamp?: number) => {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString();
};

const isShapeLayer = (layer: Layer): layer is Layer<ShapeLayerData> => {
  return (
    layer.type === "shape" &&
    !!layer.data &&
    typeof layer.data === "object" &&
    "shape" in layer.data &&
    "strokeColor" in layer.data
  );
};

const isFillLayer = (layer: Layer): layer is Layer<FillLayerData> => {
  return (
    layer.type === "fill" &&
    !!layer.data &&
    typeof layer.data === "object" &&
    "color" in layer.data
  );
};

const LayersPanel = () => {
  const layers = usePaintStore((state) => state.layers);

  const orderedLayers = useMemo(() => [...layers].reverse(), [layers]);

  return (
    <div className="layers-panel">
      <h3>Layers ({layers.length})</h3>
      <div className="layers-list">
        {orderedLayers.length === 0 ? (
          <p>No layers yet</p>
        ) : (
          <ul className="layer-items">
            {orderedLayers.map((layer) => {
              const shapeData = isShapeLayer(layer) ? layer.data : null;
              const fillData = isFillLayer(layer) ? layer.data : null;

              return (
                <li key={layer.id} className="layer-item">
                  <div className="layer-header">
                    <span className="layer-type">
                      {layer.type.toUpperCase()}
                    </span>
                    <span className="layer-time">
                      {formatTimestamp(layer.createdAt)}
                    </span>
                  </div>
                  {shapeData && (
                    <div className="layer-meta">
                      <span>Shape: {shapeData.shape}</span>
                      <span>Stroke: {shapeData.strokeColor}</span>
                      <span>Fill: {shapeData.fillColor ?? "none"}</span>
                    </div>
                  )}
                  {fillData && (
                    <div className="layer-meta">
                      <span>Fill color: {fillData.color ?? "none"}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LayersPanel;
