"use client";

import { usePublicMedias } from "@/hooks/media";
import { View } from "../ui/view/View";

interface PublicMediaProps {
  handleSelect: (media: any) => void;
}
const PublicMedia = ({ handleSelect }: PublicMediaProps) => {

  const supabaseUrl = "https://aayqfpolstcmnghwnywa.supabase.co/storage/v1/object/public/mubdix-public/gallery/";

  const { data } = usePublicMedias();

  const onSelect = (media: any) => {
    handleSelect(`${supabaseUrl}${media.name}`);
  }

  return (
    <View>
      <h1>Public Media</h1>
      <View className="flex flex-wrap gap-2">
        {data?.map((media) => (
          <img key={media.id} src={`${supabaseUrl}${media.name}`} alt={media.name} className="w-24 h-24" onClick={() => onSelect(media)} />
        ))}
      </View>

    </View>
  );
};

export default PublicMedia;