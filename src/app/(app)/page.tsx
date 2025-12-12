"use client";

import { useEffect, useRef, useState } from "react";
import { Stage } from "react-konva";
import { View } from "@/components/ui/view/View";
import { useVisualizerContext } from "@/context/VisualizerContext";

import ShowHotspot from "@/components/views/visualizer/ShowHotspot";
import ShowLayer from "@/components/views/visualizer/ShowLayer";
import { useVisualizerStore } from "@/stores/visualizerStore";
import { useApp } from "@/stores/appStore";
import AddShapeForm from "@/components/views/visualizer/AddShapeForm";

export default function VisualizerPage() {

  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const onAddShape = useVisualizerStore((state) => state.onAddShape);
  const setAppDrawer = useApp((state) => state.setAppDrawer);

  const { stageRef, stageMode } = useVisualizerContext();
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
  }, []);

  const handleStagePointerDown = (e: any) => {
    if (stageMode.current.mode === 'edit' && stageMode.current.action === 'addShape') {
      onAddShape(e, stageMode.current);
      stageMode.current = { mode: 'view', action: null, metadata: null, };
      setAppDrawer({ open: true, component: <AddShapeForm /> });
    }
  };

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
          <ShowLayer />
          <ShowHotspot />
        </Stage>
      </div>
    </View>

  );
}
