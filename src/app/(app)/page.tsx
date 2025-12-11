"use client";

import { useEffect, useRef, useState } from "react";
import ShowHotspot from "@/components/views/visualizer/ShowHotspot";
import ShowLayer from "@/components/views/visualizer/ShowLayer";
import { useVisualizerStore } from "@/stores/visualizerStore";
import { Stage } from "react-konva";
import { View } from "@/components/ui/view/View";
import { useVisualizerContext } from "@/context/VisualizerContext";


export default function Home() {

  const { activeLayer, setActiveLayer, stageMode } = useVisualizerStore();
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  const { stageRef } = useVisualizerContext();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateSize = () => {
      const cont = containerRef.current;
      if (!cont || !activeLayer) return;
      const maxW = cont.clientWidth;
      const aspect = activeLayer.width / activeLayer.height;
      const width = Math.min(maxW, 1900);
      const height = Math.round(width / aspect);
      setStageSize({ width, height });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [activeLayer]);


  const handleStagePointerDown = () => {
    if (stageMode.mode === "draw") {
      if (stageMode.action === "ADDSPOT") {
        if (stageMode.metaData.shape === "rect") {

        }
      }
    }

  };

  if (!activeLayer) return <div>Loading...</div>;

  return (
    <View ref={containerRef}>
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        ref={(n) => (stageRef.current = n as any)}
        style={{ backgroundColor: "#222" }}
        onMouseDown={handleStagePointerDown}
      >
        {
          activeLayer && (
            <>
              <ShowLayer layer={activeLayer} />
              {activeLayer?.spots && (
                <ShowHotspot spots={activeLayer.spots} activeLayer={activeLayer} setActiveLayer={setActiveLayer} stageSize={stageSize} />
              )}
            </>
          )
        }
      </Stage>
    </View>

  );
}
