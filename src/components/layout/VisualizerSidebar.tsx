"use client";

import { useEffect } from "react";
import { useLayers } from "@/hooks/layers";
import { useVisualizerStore } from "@/stores/visualizerStore";
import LayerMenu from "./LayerMenu";
import Drawer from "./Drawer";
import { View } from "../ui/view/View";
import AppLogo from "./AppLogo";

interface VisualizerSidebarProps {
  project: any;
}

const VisualizerSidebar = ({ project }: VisualizerSidebarProps) => {

  const { data: layers } = useLayers();
  const { setLayers, setActiveLayer } = useVisualizerStore();

  useEffect(() => {
    if (layers) {
      setLayers(layers as any);
    }
  }, [layers]);

  if (!layers) return <div>Loading...</div>;

  return (
    <Drawer>
      <View>
        <AppLogo />
        <LayerMenu layers={layers as any} setActiveLayer={setActiveLayer} />
      </View>
    </Drawer>
  );
};

export default VisualizerSidebar;