"use client";

import { View } from "@/components/ui/view/View";
import { useApp } from "@/stores/appStore";
import clsx from "clsx";

const RightDrawer = () => {
  const { appDrawer } = useApp();
  const { open, component } = appDrawer;
  return (
    <View className={clsx("w-64 h-full bg-background absolute right-0 z-50", open ? "block" : "hidden")}>
      {component}
    </View>
  );
};

export default RightDrawer;
