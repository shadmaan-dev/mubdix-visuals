"use client";

import { View } from "@/components/ui/view/View";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <View className="flex flex-col justify-center items-center w-full h-screen overflow-hidden">
      <View className="shadow-lg rounded-lg p-4">
        {children}
      </View>
    </View>
  );
}


