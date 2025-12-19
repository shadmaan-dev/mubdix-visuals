"use client";

import Image from "next/image";
import { View } from "@/components/ui/view/View";
import { useApp } from "@/stores/appStore";

const AppLogo = () => {
  const { sideMenu } = useApp();
  return (
    <>
      {sideMenu === "toggled" ? (
        <View className="justify-center flex items-center h-12 w-full px-2  surface-inset">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={50}
          />
        </View>
      ) : (
        <View className="flex items-center justify-center h-14 w-full">
          <Image src="/images/icon.png" alt="Logo" width={40} height={40} />
        </View>
      )}
    </>
  );
};

export default AppLogo;