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

    let isCancelled = false;
    const newEl = activeLayer.type === "image"
      ? document.createElement("img")
      : document.createElement("video");

    const onReady = () => {
      if (newEl instanceof HTMLImageElement) {
        newEl.onload = null;
      } else if (newEl instanceof HTMLVideoElement) {
        newEl.oncanplay = null;
      }

      if (isCancelled) {
        if (newEl instanceof HTMLVideoElement) {
          newEl.pause();
          newEl.src = "";
          newEl.load();
        }
        return;
      }

      setElement((prevEl) => {
        if (prevEl === newEl) return prevEl;

        if (prevEl && prevEl instanceof HTMLVideoElement) {
          prevEl.pause();
          prevEl.src = "";
          prevEl.load();
        }
        return newEl;
      });
      setLoaded(true);
    };

    newEl.crossOrigin = "anonymous";
    newEl.src = activeLayer.src;

    if (newEl instanceof HTMLImageElement) {
      newEl.onload = onReady;
    } else if (newEl instanceof HTMLVideoElement) {
      newEl.oncanplay = onReady;
      newEl.muted = true;
      newEl.autoplay = true;
      newEl.loop = false;
      newEl.playsInline = true;
      newEl.play().catch((e) => console.error("Video play failed", e));
    }

    return () => {
      isCancelled = true;
    };
  }, [activeLayer]);

  useEffect(() => {
    if (!element || !(element instanceof HTMLVideoElement) || !layerRef.current) {
      return;
    }

    const anim = new Konva.Animation(() => {
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