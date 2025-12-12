import MenuItem from "@/components/ui/menu/MenuItem";

interface LayerMenuProps {
  layers: any[];
  setActiveLayer: (layer: any) => void;
}


const LayerMenu = (props: LayerMenuProps) => {
  const { layers, setActiveLayer } = props;
  return (
    <div className="flex flex-col gap-1">
      {layers.map((l) => (
        <MenuItem size="sm" key={l.id} label={l.title} onClick={() => setActiveLayer(l.id)} />
      ))}
    </div>
  );
};

export default LayerMenu;