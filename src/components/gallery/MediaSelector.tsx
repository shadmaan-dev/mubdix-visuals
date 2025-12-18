import { forwardRef, useState } from "react";
import AppDialog from "../ui/dialog/AppDialog";
import Medias from "./Medias";

interface MediaSelectorProps {
  children: React.ReactNode;
  name: string;
  multiple?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const MediaSelector = forwardRef<HTMLButtonElement, MediaSelectorProps>((props, ref) => {
  const { children, name, multiple, value, onChange, ...rest } = props;

  const [open, setOpen] = useState(false);

  const handleSelect = (src: string) => {
    if (onChange) {
      onChange(src);
    }
    setOpen(false);
  }

  return (
    <>
      <button ref={ref} onClick={() => setOpen(true)} type="button">
        {children}
      </button>

      <AppDialog open={open} onClose={() => setOpen(false)} size="xl">
        <Medias handleSelect={handleSelect} />
      </AppDialog>
    </>
  );
});

MediaSelector.displayName = "MediaSelector";

export default MediaSelector;