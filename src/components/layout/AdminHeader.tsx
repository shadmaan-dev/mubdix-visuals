
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



const AdminHeader = () => {
  const { toggleSideMenu, sideMenu } = useApp();
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);


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


  return (
    <View className="surface-inset flex justify-between bg-secondary items-center border-b border-slate-200 h-12 px-4">
      <View className="flex gap-4 items-center">
        <Button size="sm" onClick={handleToggle} variant="solid"><Menu size={18} /></Button>
      </View>
    </View>
  );
};

export default AdminHeader;
