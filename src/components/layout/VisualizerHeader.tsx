
"use client";

import React, { useEffect, useState } from "react";
import { View } from "@/components/ui/view/View";
import { useApp } from "@/stores/appStore";
import { useVisualizerContext } from "@/context/VisualizerContext";
import Konva from "konva";

interface VisualizerHeaderProps {
  project: any;
}

const VisualizerHeader = ({ project }: VisualizerHeaderProps) => {
  const { stageRef, layerRef } = useVisualizerContext();
  const { toggleSideMenu, sideMenu } = useApp();
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);


  const handleToggle = () => {
    let state: any = "";
    if (sideMenu === "toggled") {
      state = "collapse";
    } else if (sideMenu === "collapse") {
      state = "hidden";
    } else if (sideMenu === "hidden") {
      state = "toggled";
    } else {
      state = "toggled";
    }
    toggleSideMenu(state);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 995 && sideMenu !== "hidden") {
      toggleSideMenu("hidden");
    } else if (windowWidth >= 995 && sideMenu === "hidden") {
      toggleSideMenu("toggled");
    }
  }, [windowWidth]);

  const MIN_SCALE = 0.2;
  const MAX_SCALE = 5;
  const SCALE_STEP = 1.15;

  const handleZoom = (factor: number, center?: { x: number; y: number }) => {
    const stage = stageRef.current;
    if (!stage) return;
    const oldScale = stage.scaleX();
    let newScale = oldScale * factor;
    newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
    const pointer = center || { x: stage.width() / 2, y: stage.height() / 2 };
    const mousePointTo = { x: (pointer.x - stage.x()) / oldScale, y: (pointer.y - stage.y()) / oldScale };
    stage.scale({ x: newScale, y: newScale });
    const newPos = { x: pointer.x - mousePointTo.x * newScale, y: pointer.y - mousePointTo.y * newScale };
    stage.position(newPos);
    layerRef.current?.batchDraw();
  }

  const addRect = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const layer = layerRef.current;
    if (!layer) return;
    const rect = new Konva.Rect({
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      opacity: 0.5,
      stroke: "red",
      strokeWidth: 2,
      draggable: true,
      resizable: true,
      cornerRadius: 5,
    });
    layer.add(rect);
    layer.batchDraw();
  }

  return (
    <View className="surface-inset flex justify-between bg-secondary items-center border-b border-default h-14 px-4">
      <View>
        <button
          onClick={handleToggle}
        >X</button>
      </View>
      <View className="flex gap-4 items-center">
        <button onClick={() => handleZoom(1 / SCALE_STEP)}>Zoom Out</button>
        <button onClick={() => handleZoom(SCALE_STEP)}>Zoom In</button>
        <button onClick={addRect}>Add Rect</button>
      </View>
    </View>
  );
};

export default VisualizerHeader;
