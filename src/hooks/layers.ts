import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLayer, createUpdateSpot, deleteSpot, getLayers, deleteLayer, updateLayer } from "../services/layers";

export const useLayers = (projectId: string) =>
  useQuery({
    queryKey: ["layers", projectId],
    queryFn: () => getLayers(projectId),
  });


export const useCreateLayer = () => {
  return useMutation({
    mutationFn: createLayer
  });
};

export const useUpdateLayer = () => {
  return useMutation({
    mutationFn: updateLayer
  });
};

export const useDeleteLayer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (layerId: string) => deleteLayer(layerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["layers"] });
    },
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

