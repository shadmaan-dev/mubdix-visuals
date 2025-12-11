"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useRef,
} from "react";

import Konva from "konva";

export interface IVisualizerContext {
  stageRef: React.RefObject<Konva.Stage | null>;
  layerRef: React.RefObject<Konva.Layer | null>;
}

const VisualizerContext = createContext<IVisualizerContext | null>(null);

interface VisualizerProviderProps {
  children: ReactNode;
}

export const VisualizerProvider: React.FC<VisualizerProviderProps> = ({
  children,
}) => {

  const stageRef = useRef<Konva.Stage | null>(null);
  const layerRef = useRef<Konva.Layer | null>(null);

  const context: IVisualizerContext = {
    stageRef,
    layerRef
  };

  return (
    <VisualizerContext.Provider value={context}>
      {children}
    </VisualizerContext.Provider>
  );
};

export const useVisualizerContext = (): IVisualizerContext => {
  const context = useContext(VisualizerContext);
  if (context === null) {
    throw new Error("useVisualizerContext must be used within an VisualizerProvider");
  }
  return context;
};
