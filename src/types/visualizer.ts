export type LayerType = {
  id: string;
  type: "image" | "video";
  src: string;
  width: number;
  height: number;
  title?: string;
};