import { useQuery } from "@tanstack/react-query";
import { getLayers } from "../services/layers";

export const useLayers = () =>
  useQuery({
    queryKey: ["layers"],
    queryFn: getLayers,
  });
