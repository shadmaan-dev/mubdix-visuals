export const getSpotPosition = (spot: any, activeLayer: any, stageSize: any) => {
  const { x = 0, y = 0 } = spot.meta_data;
  const cx = (x / activeLayer.width) * stageSize?.width;
  const cy = (y / activeLayer.height) * stageSize?.height;
  return { x: cx, y: cy };
}

export const getSpotSize = (spot: any, activeLayer: any, stageSize: any) => {
  const { width = 0, height = 0 } = spot.meta_data;
  const cw = (width / activeLayer.width) * stageSize?.width;
  const ch = (height / activeLayer.height) * stageSize?.height;
  return { width: cw, height: ch };
};

export const getMetaDataSpot = (event: any, stageMode: any) => {
  const { pointerPos } = event.currentTarget;
  const { metadata } = stageMode;

  if (metadata.type === "rect") {
    return {
      width: 100,
      height: 100,
      x: pointerPos.x,
      y: pointerPos.y,
    }
  }

  if (metadata.type === "icon") {
    return {
      width: 50,
      height: 50,
      x: pointerPos.x,
      y: pointerPos.y,
      src: "",
    }
  }
}