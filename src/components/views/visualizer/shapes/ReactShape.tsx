import Konva from "konva";
import LongPressShape from "./LongPressShape";
import { Rect } from "react-konva";
import { getSpotPosition, getSpotSize } from "@/utils/visualizer";
import { useRef } from "react";

interface HotspotProps {
  spot: any;
  activeLayer: any;
  setActiveLayer: (layerId: string) => void;
  stageRef: React.RefObject<Konva.Stage | null>;
  stageSize: { width: number; height: number };
  onMouseEnter: (e: Konva.KonvaEventObject<MouseEvent>, spot: any) => void;
  onMouseLeave: (e: Konva.KonvaEventObject<MouseEvent>) => void;
}


export const ReactShape = (props: HotspotProps) => {
  const { spot, setActiveLayer, activeLayer, stageSize, onMouseEnter, onMouseLeave } = props;

  const shapeRef = useRef<Konva.Rect | null>(null);
  const { x, y } = getSpotPosition(spot, activeLayer, stageSize);
  const { width, height } = getSpotSize(spot, activeLayer, stageSize);

  const handleLongPress = () => {

  }

  const handleClick = () => {
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