"use client";

import { useVisualizerContext } from "@/context/VisualizerContext";
import { LayerType } from "@/types/visualizer";
import Konva from "konva";
import { Layer, Image } from "react-konva";
import { useEffect, useState } from "react";
import { useVisualizerStore } from "@/stores/visualizerStore";


const ShowLayer = () => {
  const { stageRef, layerRef } = useVisualizerContext();
  const activeLayer = useVisualizerStore((state) => state.activeLayer);
  const stage = stageRef.current;

  const [element, setElement] = useState<HTMLImageElement | HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!activeLayer) return;
    let el: HTMLImageElement | HTMLVideoElement;

    if (activeLayer.type === "image") {
      el = document.createElement("img");
      el.onload = () => {
        setLoaded(true);
      };
      el.src = activeLayer.src;
      el.crossOrigin = "anonymous";
    } else {
      el = document.createElement("video");
      el.onloadedmetadata = () => {
        setLoaded(true);
      };
      el.src = activeLayer.src;
      el.crossOrigin = "anonymous";
      el.muted = true;
      el.autoplay = true;
      el.loop = false;
      el.playsInline = true;
      el.style.display = "none";
      el.play().catch((e) => console.error("Video play failed", e));
    }

    setElement(el);
    setLoaded(false);

    return () => {
      if (el instanceof HTMLVideoElement) {
        el.pause();
        el.src = "";
        el.load();
      }
    };

  }, [activeLayer]);

  // Video Animation Loop
  useEffect(() => {
    if (!element || !(element instanceof HTMLVideoElement) || !layerRef.current) {
      return;
    }

    const anim = new Konva.Animation(() => {
      // do nothing, just redraw layer
    }, layerRef.current);

    anim.start();

    return () => {
      anim.stop();
    };
  }, [element, layerRef]);

  if (!stage) {
    return null;
  }

  let x = 0;
  let y = 0;
  let width = stage.width();
  let height = stage.height();

  if (loaded && element) {
    const natWidth = (element instanceof HTMLImageElement) ? element.naturalWidth : (element as HTMLVideoElement).videoWidth;
    const natHeight = (element instanceof HTMLImageElement) ? element.naturalHeight : (element as HTMLVideoElement).videoHeight;

    if (natWidth && natHeight) {
      const scale = Math.min(
        stage.width() / natWidth,
        stage.height() / natHeight
      );

      width = natWidth * scale;
      height = natHeight * scale;

      x = (stage.width() - width) / 2;
      y = (stage.height() - height) / 2;
    }
  }

  return (
    <Layer ref={(node) => {
      layerRef.current = node as unknown as Konva.Layer | null;
    }}>
      {element && (
        <Image
          image={element}
          x={x}
          y={y}
          width={width}
          height={height}
        />
      )}
    </Layer>
  );
};

export default ShowLayer;