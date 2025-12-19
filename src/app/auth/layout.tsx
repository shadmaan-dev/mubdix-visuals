"use client";

import { View } from "@/components/ui/view/View";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <View className="flex flex-col justify-center items-center w-full h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full mix-blend-overlay filter blur-[128px] opacity-10 animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gray-500 rounded-full mix-blend-overlay filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>

      {children}
    </View>
  );
}
