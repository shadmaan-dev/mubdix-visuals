"use client";
import { supabaseClient } from "./client";

export const getAllPublicMedias = async () => {
  try {
    const supabase = supabaseClient();
    const { data, error } = await supabase.storage
      .from("mubdix-public")
      .list("gallery", {
        limit: 50,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    debugger

    if (error) {
      debugger
      console.error("Error listing files:", error);
      return [];
    }

    return data;
  } catch (error) {
    debugger
    return []
  }

} 
