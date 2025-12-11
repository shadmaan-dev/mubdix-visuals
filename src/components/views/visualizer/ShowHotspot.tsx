import { useVisualizerContext } from "@/context/VisualizerContext";
import { Layer } from "react-konva";
import { ReactShape } from "./shapes/ReactShape";

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
            />
          )
        })
      }
    </Layer>
  );
};

export default ShowHotspot;