interface LayerMenuProps {
  layers: any[];
  setActiveLayer: (layer: any) => void;
}


const LayerMenu = (props: LayerMenuProps) => {
  const { layers, setActiveLayer } = props;
  return (
    <div className="flex flex-col gap-4">
      {layers.map((l) => (
        <button key={l.id} onClick={() => setActiveLayer(l.id)} className="p-2 border border-gray-300 rounded">{l.title}</button>
      ))}
    </div>
  );
};

export default LayerMenu;