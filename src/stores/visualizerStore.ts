"use client";

import { v4 as uuidv4 } from 'uuid';
import { getMetaDataSpot } from "@/utils/visualizer";
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
  activeLayer: LayerType | null;
  spots: any[];
  activeSpotIndex: number | null;
  setLayers: (layers: LayerType[]) => void;
  setActiveLayer: (layer_id: string) => void;
  setSpots: (spots: any[]) => void;
  setActiveSpotIndex: (spot_id: string) => void;
  onAddShape: (event: any, stageMode: any) => void;
}


export const useVisualizerStore = create<VisualizerStore>((set) => ({
  loading: true,
  layers: [],
  activeLayer: null,
  spots: [],
  activeSpotIndex: null,
  setLayers: (layers: LayerType[]) => {
    set((state) => {
      return { layers, activeLayer: layers[0], spots: layers[0]?.spots || [] };
    });
  },

  setActiveLayer: (layer_id: string) => {
    set((state) => {
      const layer = state.layers.find((l) => l.id === layer_id);
      return { activeLayer: layer, spots: layer?.spots || [] };
    });
  },


  setSpots: (spots: any[]) => {
    set((state) => {
      return { spots };
    });
  },

  setActiveSpotIndex: (spot_id: string) => {
    set((state) => {
      const spots = state.spots;
      const index = spots.findIndex((spot) => spot.id === spot_id);
      return { activeSpotIndex: index };
    });
  },
  onAddShape: (event: any, stageMode: any) => {
    set((state) => {
      if (!state.activeLayer) return state;
      const spots = state.activeLayer.spots || [];
      const spotMetaData = getMetaDataSpot(event, stageMode);
      const newSpots = [...spots, {
        id: uuidv4(),
        title: 'Spot ' + (spots.length + 1),
        type: stageMode.metadata.type,
        layer_id: state.activeLayer.id,
        target_layer_id: null,
        meta_data: spotMetaData,
      }];
      return { spots: newSpots, activeSpotIndex: newSpots.length - 1 };
    });
  },
}));
