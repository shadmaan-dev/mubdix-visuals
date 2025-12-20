
import { supabaseClient } from "./supabase/client";

export const getLayers = async (projectId: string) => {
  const supabase = supabaseClient();
  const { data } = await supabase.from("visual_layers").select(`*, spots:visual_spots (*)`).eq("project_id", projectId);
  return data
};

export const createLayer = async (layer: any) => {
  const supabase = supabaseClient();
  const { data } = await supabase.from("visual_layers").insert([layer]);
  return data
};

export const updateLayer = async (layer: any) => {
  const supabase = supabaseClient();
  const { data } = await supabase.from("visual_layers").update(layer).eq("id", layer.id);
  return data
};

export const deleteLayer = async (layerId: string) => {
  const supabase = supabaseClient();
  const { data } = await supabase.from("visual_layers").delete().eq("id", layerId);
  return data
};

export const createUpdateSpot = async (spot: any) => {
  const supabase = supabaseClient();
  const { data } = await supabase.from("visual_spots").upsert([spot], { onConflict: "id" });
  return data
};

export const deleteSpot = async (spotId: string) => {
  const supabase = supabaseClient();
  const { data } = await supabase.from("visual_spots").delete().eq("id", spotId);
  return data
};