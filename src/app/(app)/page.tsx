"use client";

import { useEffect, useRef, useState } from "react";
import ShowHotspot from "@/components/views/visualizer/ShowHotspot";
import ShowLayer from "@/components/views/visualizer/ShowLayer";
import { useVisualizerStore } from "@/stores/visualizerStore";
import { Stage } from "react-konva";
import { View } from "@/components/ui/view/View";
import { useVisualizerContext } from "@/context/VisualizerContext";


export default function VisualizerPage() {

  const { activeLayer, setActiveLayer, stageMode } = useVisualizerStore();
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  const { stageRef } = useVisualizerContext();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect) {
          setStageSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
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
    <View ref={containerRef} className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0">
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
      </div>
    </View>

  );
}
