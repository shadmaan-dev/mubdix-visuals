"use client";

import { View } from "@/components/ui/view/View";
import LayerList from "@/components/views/visualizer/LayerList";
import { useLayers } from "@/hooks/layers";

const LayersPage = () => {
  const { data: layers } = useLayers()
  return (
    <View>
      <LayerList layers={layers || []} />
    </View>
  );
};

export default LayersPage;
