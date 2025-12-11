import React from "react";
import { View } from "../ui/view/View";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <View className="h-[calc(100vh-56px)] overflow-y-auto bg-background surface-inset">{children}</View>
  );
};

export default Container;
