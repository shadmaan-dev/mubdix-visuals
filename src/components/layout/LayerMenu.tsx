import MenuItem from "@/components/ui/menu/MenuItem";
import { Layers } from 'lucide-react';

interface LayerMenuProps {
  layers: any[];
  setActiveLayer: (layer: any) => void;
}


const LayerMenu = (props: LayerMenuProps) => {
  const { layers, setActiveLayer } = props;
  return (
    <div className="flex flex-col gap-1">
      {layers.map((l) => (
        <MenuItem size="sm" leftIcon={<Layers />} key={l.id} label={l.title} onClick={() => setActiveLayer(l.id)} />
      ))}
    </div>
  );
};

export default LayerMenu;