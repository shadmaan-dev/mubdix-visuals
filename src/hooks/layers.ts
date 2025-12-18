import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLayer, createUpdateSpot, deleteSpot, getLayers } from "../services/layers";

export const useLayers = () =>
  useQuery({
    queryKey: ["layers"],
    queryFn: getLayers,
  });


export const useCreateLayer = () => {
  return useMutation({
    mutationFn: createLayer
  });
};

export const useCreateUpdateSpot = () => {
  return useMutation({
    mutationFn: createUpdateSpot
  });
};


export const useDeleteSpot = () => {
  return useMutation({
    mutationFn: deleteSpot
  });
};