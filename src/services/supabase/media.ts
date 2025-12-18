"use client";
import { supabaseClient } from "./client";

export const getAllPublicMedias = async () => {
  try {
    const supabase = supabaseClient();
    const { data } = await supabase.storage
      .from("mubdix-public")
      .list("gallery", {
        limit: 50,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
    return data;
  } catch (_) {
    return []
  }
}


export const getPublicIcons = async () => {
  try {
    const supabase = supabaseClient();
    const { data } = await supabase.storage
      .from("mubdix-public")
      .list("icons", {
        limit: 50,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
    return data;
  } catch (_) {
    return []
  }
}