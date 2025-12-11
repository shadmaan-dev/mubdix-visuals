import { layers } from "@/constants/layers";
import { spots } from "@/constants/spots";

export const getLayers = async () => {

  return layers.map((layer) => {
    return {
      ...layer,
      spots: spots.filter((spot) => spot.layer_id === layer.id)
    }
  })
};