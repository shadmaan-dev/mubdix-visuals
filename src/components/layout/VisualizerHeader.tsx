
"use client";

import React, { useEffect, useState } from "react";
import { View } from "@/components/ui/view/View";
import { useApp } from "@/stores/appStore";
import { useVisualizerContext } from "@/context/VisualizerContext";
import Konva from "konva";

import { Circle, Menu, Square, ZoomIn, ZoomOut, Image as ImageIcon } from "lucide-react";
import Typography from "../ui/typography/Typography";
import { useVisualizerStore } from "@/stores/visualizerStore";
import Button from "../ui/button/Button";

interface VisualizerHeaderProps {
  project: any;
}

const VisualizerHeader = ({ project }: VisualizerHeaderProps) => {
  const { stageRef, layerRef, stageMode } = useVisualizerContext();
  const { toggleSideMenu, sideMenu } = useApp();
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const activeLayer = useVisualizerStore((state) => state.activeLayer);


  const handleToggle = () => {
    toggleSideMenu(sideMenu === 'toggled' ? 'hidden' : 'toggled');
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

  const addShape = (type: string) => {
    stageMode.current = {
      mode: "edit",
      action: "addShape",
      metadata: {
        type: type,
      }
    }
  }

  return (
    <View className="surface-inset flex justify-between bg-secondary items-center border-b border-default h-14 px-4">
      <View className="flex gap-4 items-center">
        <Button size="sm" onClick={handleToggle} variant="solid"><Menu size={18} /></Button>
        <View className="flex flex-col gap-1">
          <Typography variant="subtitle2" >{project?.title}</Typography>
          <Typography variant="caption" >{activeLayer?.title}</Typography>
        </View>
      </View>
      <View className="flex gap-2 items-center">

        <Button variant="ghost" size="xs" onClick={() => addShape("rect")}><Square size={20} /></Button>
        {/* <Button onClick={() => addShape("icon")}><ImageIcon /></Button> */}
        {/* <Button onClick={() => addShape("circle")}><Circle /></Button> */}
        <View className="w-0.5 h-4 bg-gray-500" />
        <Button variant="ghost" size="xs" onClick={() => handleZoom(1 / SCALE_STEP)}> <ZoomOut size={20} /></Button>
        <Button variant="ghost" size="xs" onClick={() => handleZoom(SCALE_STEP)}><ZoomIn size={20} /></Button>
      </View>
    </View>
  );
};

export default VisualizerHeader;
