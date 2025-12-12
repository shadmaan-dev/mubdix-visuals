"use client";

import { useEffect } from "react";
import { useLayers } from "@/hooks/layers";
import { useVisualizerStore } from "@/stores/visualizerStore";
import LayerMenu from "./LayerMenu";
import Drawer from "./Drawer";
import { View } from "../ui/view/View";
import AppLogo from "./AppLogo";
import { useApp } from "@/stores/appStore";
import AddLayerForm from "../views/visualizer/AddLayerForm";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "lucide-react";
import SearchField from "../ui/fields/search/SearchField";

interface VisualizerSidebarProps {
  project: any;
}

const VisualizerSidebar = ({ project }: VisualizerSidebarProps) => {

  const { data: layers } = useLayers();
  const setAppDrawer = useApp((state) => state.setAppDrawer);
  const { setLayers, setActiveLayer } = useVisualizerStore();

  useEffect(() => {
    if (layers) {
      setLayers(layers as any);
    }
  }, [layers]);

  const handleAddLayer = () => {
    setAppDrawer({ open: true, component: <AddLayerForm /> });
  };

  if (!layers) return <div>Loading...</div>;

  return (
    <Drawer>
      <View>
        <View className="flex items-center border-b border-default">
          <AppLogo />
        </View>
        <View className="flex items-center gap-2 px-2 py-4">
          <SearchField size="sm" />
          <Button label="" size="sm" leftIcon={<PlusIcon size={14} />} variant="outlined" severity="primary" onClick={handleAddLayer} />
        </View>
        <LayerMenu layers={layers as any} setActiveLayer={setActiveLayer} />
      </View>
    </Drawer>
  );
};

export default VisualizerSidebar;