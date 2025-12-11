import { useVisualizerContext } from "@/context/VisualizerContext";
import { Layer, Label, Tag, Text } from "react-konva";
import { ReactShape } from "./shapes/ReactShape";
import { useState } from "react";
import Konva from "konva";

interface ShowHotspotProps {
  spots: any[];
  activeLayer: any
  setActiveLayer: (layerId: string) => void;
  stageSize: { width: number; height: number };
}

const shapeMap: any = {
  rect: ReactShape,
}


const ShowHotspot = (props: ShowHotspotProps) => {
  const { spots, setActiveLayer, activeLayer, stageSize } = props;
  const { stageRef } = useVisualizerContext();

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    text: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  const handleMouseEnter = (e: Konva.KonvaEventObject<MouseEvent>, spot: any) => {
    const node = e.target;
    const rect = node.getClientRect();

    setTooltip({
      visible: true,
      x: rect.x + rect.width / 2,
      y: rect.y - 10,
      text: spot.title || spot.id,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <Layer>
      {
        spots.map((spot) => {
          const ShapeComponent = shapeMap[spot.type];
          if (!ShapeComponent) return null;
          return (
            <ShapeComponent
              key={spot.id}
              spot={spot}
              activeLayer={activeLayer}
              setActiveLayer={setActiveLayer}
              stageRef={stageRef}
              stageSize={stageSize}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          )
        })
      }
      {tooltip.visible && (
        <Label x={tooltip.x} y={tooltip.y} listening={false}>
          <Tag
            fill="black"
            pointerDirection="down"
            pointerWidth={10}
            pointerHeight={10}
            lineJoin="round"
            shadowColor="black"
            shadowBlur={10}
            shadowOffsetX={5}
            shadowOffsetY={5}
            shadowOpacity={0.2}
            cornerRadius={5}
            opacity={0.8}
          />
          <Text
            text={tooltip.text}
            fontFamily="Calibri"
            fontSize={14}
            padding={5}
            fill="white"
            align="center"
          />
        </Label>
      )}
    </Layer>
  );
};

export default ShowHotspot;