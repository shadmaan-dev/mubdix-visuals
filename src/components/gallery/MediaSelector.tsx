import { forwardRef, useState } from "react";
import AppDialog from "@/components/ui/dialog/AppDialog";
import Medias from "./Medias";
import { Image, X } from "lucide-react";
import Typography from "@/components/ui/typography/Typography";
import { View } from "@/components/ui/view/View";

interface MediaSelectorProps {
  name: string;
  multiple?: boolean;
  value?: string;
  mediaType?: string;
  onChange?: (value: string) => void;
}

const MediaSelector = forwardRef<HTMLButtonElement, MediaSelectorProps>((props, ref) => {
  const { name, multiple, value, mediaType, onChange, ...rest } = props;

  const [open, setOpen] = useState(false);

  const handleSelect = (src: string) => {
    if (onChange) {
      onChange(src);
    }
    setOpen(false);
  }

  return (
    <>
      <View
        ref={ref}
        className="flex items-center justify-between border border-slate-200 p-2 rounded"
      >
        <Typography variant="body2">{value?.split("/").pop() || "Select Media"}</Typography>
        <View>
          {
            value ? (
              <X size={18} className="ml-2" onClick={() => onChange?.("")} />
            ) : (
              <Image size={18} onClick={() => setOpen(true)} />
            )
          }
        </View>
      </View>

      <AppDialog open={open} onClose={() => setOpen(false)} size="xl">
        <Medias handleSelect={handleSelect} mediaType={mediaType} />
      </AppDialog>
    </>
  );
});

MediaSelector.displayName = "MediaSelector";

export default MediaSelector;