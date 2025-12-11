"use client";

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
  stageMode: {
    mode: "view" | "draw" | "select";
    action: "ADDSPOT" | null;
    metaData: any;
  }
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
  stageMode: {
    mode: "view",
    action: null,
    metaData: null,
  },
}));
