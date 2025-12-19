"use client";

import React from "react";
import clsx from "clsx";

import { useApp } from "@/stores/appStore";
import { View } from "@/components/ui/view/View";


interface DrawerProps {
  children: React.ReactNode;
}

const Drawer = ({ children }: DrawerProps) => {
  const { sideMenu } = useApp();

  return (
    <View
      className={clsx(
        "three-dim h-screen overflow-hidden transition-all duration-300 border-r border-slate-200",
        {
          "w-70 max-w-70 min-w-70": sideMenu === "toggled",
          "w-15 max-w-15 min-w-15": sideMenu === "collapse",
          "w-0 max-w-0 min-w-0": sideMenu === "hidden",
        }
      )}
    >
      {children}
    </View>
  );
};

export default Drawer;
