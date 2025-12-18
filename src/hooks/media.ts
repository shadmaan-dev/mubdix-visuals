import { useQuery } from "@tanstack/react-query";
import { getAllPublicMedias, getPublicIcons } from "../services/supabase/media";

export const usePublicMedias = () =>
  useQuery({
    queryKey: ["public-medias"],
    queryFn: getAllPublicMedias,
  });


export const usePublicIcons = () =>
  useQuery({
    queryKey: ["public-icons"],
    queryFn: getPublicIcons,
  });