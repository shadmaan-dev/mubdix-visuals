"use client";

import AdminSideBar from "@/components/layout/AdminSideBar";
import { View } from "@/components/ui/view/View";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <View className="flex">
      <AdminSideBar />
      <View className="flex-1">
        {children}
      </View>
    </View>
  );
}


