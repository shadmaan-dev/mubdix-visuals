"use client";

import { useVisualizerContext } from "@/context/VisualizerContext";
import { LayerType } from "@/types/visualizer";
import Konva from "konva";
import { Layer, Image } from "react-konva";

interface ShowLayerProps {
  layer: LayerType;
}

const ShowLayer = (props: ShowLayerProps) => {

  const { stageRef, layerRef } = useVisualizerContext();
  const { layer } = props;


  const stage = stageRef.current;

  if (!stage) {
    return null;
  }

  let element: HTMLImageElement | HTMLVideoElement;
  if (layer.type === "image") {
    element = document.createElement("img");
    element.src = layer.src;
    element.crossOrigin = "anonymous";

  } else {
    element = document.createElement("video");
    element.src = layer.src;
    element.crossOrigin = "anonymous";
    element.muted = true;
    element.autoplay = true;
    element.loop = false;
    element.playsInline = true;
    element.style.display = "none";
  }

  return (
    <Layer ref={(node) => {
      layerRef.current = node as unknown as Konva.Layer | null;
    }}>
      <Image image={element} x={0} y={0} width={stage.width()} height={stage.height()} />
    </Layer>
  );
};

export default ShowLayer;