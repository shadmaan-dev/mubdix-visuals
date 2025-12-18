import { useQuery } from "@tanstack/react-query";
import { getAllPublicMedias } from "../services/supabase/media";

export const usePublicMedias = () =>
  useQuery({
    queryKey: ["public-medias"],
    queryFn: getAllPublicMedias,
  });
