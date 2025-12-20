"use client";

import { View } from "@/components/ui/view/View";
import { useApp } from "@/stores/appStore";
import clsx from "clsx";

const RightDrawer = () => {
  const { appDrawer, setAppDrawer } = useApp();
  const { open, component, absolute = false } = appDrawer;

  return (
    <View
      className={clsx(
        "h-full bg-white/95 backdrop-blur-sm border-l border-slate-200 transition-all duration-300 ease-out shadow-2xl z-50",
        absolute ? "absolute right-0 top-0 h-full" : "relative",
        open ? "w-80 translate-x-0 opacity-100" : "w-0 translate-x-20 opacity-0 overflow-hidden border-none"
      )}
    >
      <div className="w-80 h-full overflow-y-auto flex flex-col">
        {component}
      </div>
    </View>
  );
};

export default RightDrawer;
