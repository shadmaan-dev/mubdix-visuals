"use client";

import { View } from "@/components/ui/view/View";
import LayerList from "@/components/views/visualizer/LayerList";
import { useLayers, useDeleteLayer } from "@/hooks/layers";
import Typography from "@/components/ui/typography/Typography";
import Button from "@/components/ui/button/Button";
import { Plus, Search, Filter, Trash2, X, Pencil } from "lucide-react";
import { useState } from "react";
import AddLayerAction from "@/components/shared/AddLayerAction";
import { useApp } from "@/stores/appStore";
import AddLayerForm from "@/components/views/visualizer/AddLayerForm";

const LayersPage = () => {
  const { data: layers } = useLayers('d55f314e-ade3-4cb0-9f39-dbbf8cb4498d');
  const setAppDrawer = useApp((state) => state.setAppDrawer);
  const deleteLayerMutation = useDeleteLayer();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedLayer, setSelectedLayer] = useState<any>(null);

  const filteredLayers = layers?.filter((layer) => {
    const matchesSearch = layer.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || layer.type === filterType;
    return matchesSearch && matchesType;
  }) || [];

  const handleDeleteLayer = () => {
    if (selectedLayer && confirm("Are you sure you want to delete this layer?")) {
      deleteLayerMutation.mutate(selectedLayer.id, {
        onSuccess: () => {
          setSelectedLayer(null);
        }
      });
    }
  };

  const onEditLayer = (layer: any) => {
    setAppDrawer({ open: true, component: <AddLayerForm layer={layer} /> });
  };

  return (
    <View className="h-full w-full flex flex-col">
      {/* Header & Toolbar Combined */}
      <View className="flex flex-row items-center justify-between p-6 border-b border-slate-200 bg-white gap-4 shrink-0">
        <Typography variant="h5" className="font-bold text-gray-800 shrink-0">Layers Library</Typography>

        <View className="flex flex-row items-center gap-4 flex-1 justify-end">
          {/* Search */}
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 transition-all"
              placeholder="Search layers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className="relative w-40 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-8 py-2 text-sm text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 cursor-pointer"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          {/* Add Button */}
          <AddLayerAction />
        </View>
      </View>

      {/* Main Layout: List + Details */}
      <div className="flex-1 flex overflow-hidden">
        {/* Layer List */}
        <View className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <LayerList
            layers={filteredLayers}
            activeLayerId={selectedLayer?.id}
            onSelect={setSelectedLayer}
          />
        </View>

        {/* Side Details Panel */}
        {selectedLayer && (
          <View className="w-80 border-l border-slate-200 bg-white flex flex-col shadow-xl z-20">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <Typography variant="subtitle1" className="font-bold text-gray-800">Layer Details</Typography>
              <button onClick={() => setSelectedLayer(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {/* Preview */}
              <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden border border-slate-100 mb-4 flex items-center justify-center">
                {selectedLayer.type === 'video' && selectedLayer.src ? (
                  <video src={selectedLayer.src} controls className="w-full h-full object-contain" />
                ) : selectedLayer.src ? (
                  <img src={selectedLayer.src} alt={selectedLayer.title} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-xs text-gray-400">No Preview</span>
                )}
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div>
                  <Typography variant="caption" className="text-gray-500 uppercase tracking-wider text-[10px] font-bold">Title</Typography>
                  <Typography variant="body2" className="text-gray-900 font-medium">{selectedLayer.title}</Typography>
                </div>
                <div>
                  <Typography variant="caption" className="text-gray-500 uppercase tracking-wider text-[10px] font-bold">Type</Typography>
                  <div className="mt-1">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium border border-gray-200 inline-block capitalize">
                      {selectedLayer.type}
                    </span>
                  </div>
                </div>
                <div>
                  <Typography variant="caption" className="text-gray-500 uppercase tracking-wider text-[10px] font-bold">ID</Typography>
                  <Typography variant="caption" className="text-gray-400 font-mono text-[10px] break-all">{selectedLayer.id}</Typography>
                </div>
              </div>
            </div>

            <View className="flex flex-row gap-2 p-4 border-t border-slate-200 bg-gray-50">
              <Button
                label="Remove"
                leftIcon={<Trash2 size={16} />}
                className="w-full !bg-white !text-red-600 !border !border-red-200 hover:!bg-red-50 hover:!border-red-300 transition-colors"
                onClick={handleDeleteLayer}
                variant="outlined"
                severity="danger"
              />
              <Button
                label="Edit"
                leftIcon={<Pencil size={16} />}
                className="w-full !bg-white !text-gray-600 !border !border-gray-200 hover:!bg-gray-50 hover:!border-gray-300 transition-colors"
                onClick={() => onEditLayer(selectedLayer)}
                variant="outlined"
              />
            </View>
          </View>
        )}
      </div>
    </View>
  );
};

export default LayersPage;
