import { View } from "../ui/view/View";
import PublicMedia from "./PublicMedia";

interface MediasProps {
  handleSelect: (media: any) => void;
  mediaType?: string;
}
const Medias = ({ handleSelect, mediaType }: MediasProps) => {
  return (
    <View>
      <PublicMedia handleSelect={handleSelect} mediaType={mediaType} />
    </View>
  );
};

export default Medias;