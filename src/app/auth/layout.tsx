"use client";

import { View } from "@/components/ui/view/View";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <View className="flex flex-col justify-center items-center w-full h-screen overflow-hidden bg-gradient-to-br from-white via-gray-400 to-gray-600 relative">
      {children}
    </View>
  );
}
