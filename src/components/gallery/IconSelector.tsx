import { usePublicIcons } from "@/hooks/media";
import { View } from "../ui/view/View";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface IconSelectorProps {
  children: React.ReactNode;
  name: string;
  multiple?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const IconSelector = (props: IconSelectorProps) => {
  const { children, name, multiple, value, onChange } = props;
  const [open, setOpen] = useState(false);
  const { data } = usePublicIcons();

  const supabaseUrl = "https://aayqfpolstcmnghwnywa.supabase.co/storage/v1/object/public/mubdix-public/icons/";
  const handleSelect = (src: string) => {
    if (onChange) {
      onChange(src);
    }
    setOpen(false);
  }

  return (
    <View className="relative w-full">
      <button onClick={() => setOpen(!open)}>
        {children}
      </button>
      <View className={clsx("absolute top-10 left-0 bg-white p-4 rounded-md shadow-lg", open ? "block" : "hidden")}>
        {data?.map((icon) => (
          <Image
            key={icon.id}
            src={`${supabaseUrl}${icon.name}`}
            width={30}
            height={30}
            alt={icon.name}
            onClick={() => handleSelect(`${supabaseUrl}${icon.name}`)}
          />
        ))}
      </View>
    </View>
  );
};

export default IconSelector;
