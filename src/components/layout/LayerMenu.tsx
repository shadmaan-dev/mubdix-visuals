import MenuItem from "@/components/ui/menu/MenuItem";
import { useLayers } from "@/hooks/layers";
import { useVisualizerStore } from "@/stores/visualizerStore";
import { Layers2 } from 'lucide-react';
import { useEffect } from "react";
import { View } from "../ui/view/View";
import SearchField from "../ui/fields/search/SearchField";

interface LayerMenuProps {
  project: any;
}

const LayerMenu = ({ project }: LayerMenuProps) => {
  const { data } = useLayers(project.id);

  const { setLayers, setActiveLayer, layers } = useVisualizerStore();

  useEffect(() => {
    if (!data || !project?.root_layer) return;

    const rootId = project.root_layer;

    const rootLayer = data.find(l => l.id === rootId);
    const restLayers = data.filter(l => l.id !== rootId);

    if (!rootLayer) {
      setLayers([...data] as any);
      return;
    }

    setLayers([rootLayer, ...restLayers] as any);
  }, [data, project.root_layer]);

  return (
    <View>
      <View className="flex items-center gap-2 px-2 py-4">
        <SearchField size="sm" />
      </View>
      <View className="flex flex-col gap-1">
        {layers?.map((l) => (
          <MenuItem size="sm" leftIcon={<Layers2 />} key={l.id} label={l.title} onClick={() => setActiveLayer(l.id)} />
        ))}
      </View>
    </View>

  );
};

export default LayerMenu;