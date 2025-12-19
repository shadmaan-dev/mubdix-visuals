import MenuItem from "@/components/ui/menu/MenuItem";
import { useLayers } from "@/hooks/layers";
import { useVisualizerStore } from "@/stores/visualizerStore";
import { Layers } from 'lucide-react';
import { useEffect } from "react";
import { View } from "../ui/view/View";
import SearchField from "../ui/fields/search/SearchField";

const LayerMenu = () => {
  const { data: layers } = useLayers();

  const { setLayers, setActiveLayer } = useVisualizerStore();

  useEffect(() => {
    if (layers) {
      setLayers(layers as any);
    }
  }, [layers]);

  return (
    <View>
      <View className="flex items-center gap-2 px-2 py-4">
        <SearchField size="sm" />
      </View>
      <View className="flex flex-col gap-1">
        {layers?.map((l) => (
          <MenuItem size="sm" leftIcon={<Layers />} key={l.id} label={l.title} onClick={() => setActiveLayer(l.id)} />
        ))}
      </View>
    </View>

  );
};

export default LayerMenu;