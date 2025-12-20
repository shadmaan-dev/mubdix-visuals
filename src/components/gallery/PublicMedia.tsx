"use client";

import { usePublicMedias } from "@/hooks/media";
import { View } from "../ui/view/View";
import { useEffect, useState } from "react";

interface PublicMediaProps {
  handleSelect: (media: any) => void;
  mediaType?: string;
}
const PublicMedia = ({ handleSelect, mediaType }: PublicMediaProps) => {

  const supabaseUrl = "https://aayqfpolstcmnghwnywa.supabase.co/storage/v1/object/public/mubdix-public/gallery/";
  const [medias, setMedias] = useState<any[]>([]);

  const { data } = usePublicMedias();

  const onSelect = (media: any) => {
    handleSelect(`${supabaseUrl}${media.name}`);
  }

  useEffect(() => {
    if (data && mediaType) {
      debugger
      setMedias(data.filter((media: any) => media.metadata.mimetype.startsWith(mediaType)));
    }
  }, [data, mediaType]);

  return (
    <View>
      <h1>Public Media</h1>
      <View className="flex flex-wrap gap-2">
        {medias?.map((media) => (
          <img key={media.id} src={`${supabaseUrl}${media.name}`} alt={media.name} className="w-24 h-24" onClick={() => onSelect(media)} />
        ))}
      </View>

    </View>
  );
};

export default PublicMedia;