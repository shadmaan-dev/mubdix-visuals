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