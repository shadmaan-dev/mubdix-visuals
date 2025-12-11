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
}


export const ReactShape = (props: HotspotProps) => {
  const { spot, setActiveLayer, activeLayer, stageSize } = props;

  const shapeRef = useRef<Konva.Rect | null>(null);
  const { x, y } = getSpotPosition(spot, activeLayer, stageSize);
  const { width, height } = getSpotSize(spot, activeLayer, stageSize);

  const handleLongPress = () => {

  }

  const handleClick = () => {
    setActiveLayer(spot.target_layer_id);
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
        ref={(node) => (shapeRef.current = node as any)}
      />
    </LongPressShape>
  );
};