import { View } from "@/components/ui/view/View";
import Typography from "@/components/ui/typography/Typography";

interface LayerListProps {
  layers: any[];
  activeLayerId?: string | null;
  onSelect?: (layer: any) => void;
}

const LayerList = ({ layers, activeLayerId, onSelect }: LayerListProps) => {
  return (
    <View>

      {(!layers || layers.length === 0) ? (
        <View className="text-center py-10">
          <Typography variant="body1" className="text-gray-500">No layers found.</Typography>
        </View>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {layers.map((layer) => (
            <View
              key={layer.id}
              className={`group bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer ${activeLayerId === layer.id ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'}`}
              onClick={() => onSelect && onSelect(layer)}
            >
              <div className="relative h-40 w-full bg-gray-50 overflow-hidden group-hover:bg-gray-100 transition-colors">
                {layer.type === 'video' && layer.src ? (
                  <video
                    src={layer.src}
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                ) : layer?.src ? (
                  <img
                    src={layer.src}
                    alt={layer.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-100">
                    <span className="text-xs">No Preview</span>
                  </div>
                )}
              </div>
              <View className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Typography variant="subtitle2" className="font-bold text-gray-900 truncate flex-1" title={layer.title}>
                    {layer.title}
                  </Typography>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded border border-gray-200">
                    {layer.type}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <Typography variant="caption" className="text-xs text-gray-500">
                    {layer.spots ? `${layer.spots.length} Spots` : '0 Spots'}
                  </Typography>
                </div>
              </View>
            </View>
          ))}
        </div>
      )}
    </View>
  );
};

export default LayerList;