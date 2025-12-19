import { supabaseClient } from "./supabase/client";

export const getProjects = async () => {
  const supabase = supabaseClient();
  const { data } = await supabase.from("visual_projects").select("*");
  return data
};