"use client";

import AdminHeader from "@/components/layout/AdminHeader";
import AdminSideBar from "@/components/layout/AdminSideBar";
import Container from "@/components/layout/Container";
import RightDrawer from "@/components/layout/RightDrawer";
import { View } from "@/components/ui/view/View";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <View className="flex">
      <AdminSideBar />
      <View className="flex w-full h-full flex-col">
        <AdminHeader />
        <Container>
          <main className="flex w-full h-full">
            <View className="flex w-full h-full overflow-hidden">
              {children}
            </View>
            <View className="relative">
              <RightDrawer />
            </View>
          </main>
        </Container>
      </View>
    </View>
  );
}


