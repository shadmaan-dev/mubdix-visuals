
"use client";

import { useEffect, useState } from "react";
import { View } from "@/components/ui/view/View";
import { useApp } from "@/stores/appStore";
import { Menu } from "lucide-react";
import Button from "@/components/ui/button/Button";

const AdminHeader = () => {
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

  return (
    <View className="surface-inset flex justify-between bg-secondary items-center border-b border-slate-200 h-12 px-4">
      <View className="flex gap-4 items-center">
        <Button size="sm" onClick={handleToggle} variant="solid"><Menu size={18} /></Button>
      </View>
    </View>
  );
};

export default AdminHeader;
