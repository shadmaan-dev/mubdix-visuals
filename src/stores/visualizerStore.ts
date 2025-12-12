"use client";

import { getShapeData } from "@/utils/visualizer";
import { create } from "zustand";

interface LayerType {
  id: string;
  type: "image" | "video";
  src: string;
  width: number;
  height: number;
  title: string;
  spots?: any[];
}

interface VisualizerStore {
  loading: boolean;
  layers: LayerType[];
  setLayers: (layers: LayerType[]) => void;
  activeLayer: LayerType | null;
  setActiveLayer: (layer_id: string) => void;
  onAddShape: (event: any, stageMode: any) => void;
}


export const useVisualizerStore = create<VisualizerStore>((set) => ({
  loading: true,
  layers: [],
  setLayers: (layers: LayerType[]) => {
    set((state) => {
      return { layers, activeLayer: layers[0] };
    });
  },
  activeLayer: null,
  setActiveLayer: (layer_id: string) => {
    set((state) => {
      const layer = state.layers.find((l) => l.id === layer_id);
      return { activeLayer: layer };
    });
  },
  onAddShape: (event: any, stageMode: any) => {
    set((state) => {
      if (!state.activeLayer) return state;
      const spots = state.activeLayer.spots || [];
      const shapeData = getShapeData(event.currentTarget.pointerPos, stageMode.metadata);
      const newSpots = [...spots, shapeData];
      return { activeLayer: { ...state.activeLayer, spots: newSpots } };
    });
  },
}));
