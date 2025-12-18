
import { supabaseClient } from "./supabase/client";

export const getLayers = async () => {
  const supabase = supabaseClient();
  const { data } = await supabase.from("visual_layers").select(`*, spots:visual_spots (*)`);
  return data
};

export const createLayer = async (layer: any) => {
  const supabase = supabaseClient();
  const { data } = await supabase.from("visual_layers").insert([layer]);
  return data
};

export const createUpdateSpot = async (spot: any) => {
  const supabase = supabaseClient();
  const { data } = await supabase.from("visual_spots").upsert([spot], { onConflict: "id" });
  return data
};