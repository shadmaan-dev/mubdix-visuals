import { View } from "../ui/view/View";
import PublicMedia from "./PublicMedia";

interface MediasProps {
  handleSelect: (media: any) => void;
}
const Medias = ({ handleSelect }: MediasProps) => {
  return (
    <View>
      <PublicMedia handleSelect={handleSelect} />
    </View>
  );
};

export default Medias;