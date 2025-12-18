import Konva from "konva";
import LongPressShape from "./LongPressShape";
import { Rect } from "react-konva";
import { getSpotPosition, getSpotSize } from "@/utils/visualizer";
import { useRef } from "react";
import { useVisualizerStore } from "@/stores/visualizerStore";
import { useApp } from "@/stores/appStore";
import AddShapeForm from "../AddShapeForm";

interface HotspotProps {
  spot: any;
  activeLayer: any;
  setActiveLayer: (layerId: string) => void;
  stageRef: React.RefObject<Konva.Stage | null>;
  onMouseEnter: (e: Konva.KonvaEventObject<MouseEvent>, spot: any) => void;
  onMouseLeave: (e: Konva.KonvaEventObject<MouseEvent>) => void;
}


export const ReactShape = (props: HotspotProps) => {
  const { spot, stageRef, setActiveLayer, activeLayer, onMouseEnter, onMouseLeave } = props;
  const setActiveSpotIndex = useVisualizerStore((state) => state.setActiveSpotIndex);
  const setAppDrawer = useApp((state) => state.setAppDrawer);


  const stage = stageRef.current;
  const stageSize = stage?.size() || { width: 0, height: 0 };

  const shapeRef = useRef<Konva.Rect | null>(null);
  const { x, y } = getSpotPosition(spot, activeLayer, stageSize);
  const { width, height } = getSpotSize(spot, activeLayer, stageSize);


  const handleLongPress = () => {
    setActiveSpotIndex(spot.id);
    setAppDrawer({ open: true, component: <AddShapeForm /> });
  }

  const handleClick = () => {
    if (!spot.target_layer_id) return;
    setActiveLayer(spot.target_layer_id);
    onMouseLeave({} as any);
  }

  return (
    <LongPressShape onLongPress={handleLongPress} onClick={handleClick}>
      <Rect
        key={spot.id}
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="red"
        strokeWidth={1}
        cornerRadius={2}
        draggable={true}
        ref={(node) => (shapeRef.current = node as any)}
        onMouseEnter={(e) => {
          const container = e.target.getStage()?.container();
          if (container) container.style.cursor = "pointer";
          if (onMouseEnter) onMouseEnter(e, spot);
        }}
        onMouseLeave={(e) => {
          const container = e.target.getStage()?.container();
          if (container) container.style.cursor = "default";
          if (onMouseLeave) onMouseLeave(e);
        }}
      />
    </LongPressShape>
  );
};