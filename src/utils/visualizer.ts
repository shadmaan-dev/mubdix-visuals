export const getSpotPosition = (spot: any, activeLayer: any, stageSize: any) => {
  const x = (spot.x / activeLayer.width) * stageSize?.width;
  const y = (spot.y / activeLayer.height) * stageSize?.height;
  return { x, y };
}

export const getSpotSize = (spot: any, activeLayer: any, stageSize: any) => {
  const width = (spot.width / activeLayer.width) * stageSize?.width;
  const height = (spot.height / activeLayer.height) * stageSize?.height;
  return { width, height };
};

export const getShapeData = (pointerPos: any, metadata: any) => {
  let shapeData: any = {
    id: "spot_3",
    type: metadata.type,
    title: "Spot B",
    layer_id: "layer_1",
    x: pointerPos.x,
    y: pointerPos.y,
  };
  if (metadata.type === "rect") {
    shapeData = {
      ...shapeData,
      width: 100,
      height: 100,
    }
  }

  if (metadata.type === "circle") {
    shapeData = {
      ...shapeData,
      radius: 50,
    }
  }

  return shapeData;
}