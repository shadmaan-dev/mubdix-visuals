"use client";

import Container from "@/components/layout/Container";
import RightDrawer from "@/components/layout/RightDrawer";
import VisualizerHeader from "@/components/layout/VisualizerHeader";
import VisualizerSidebar from "@/components/layout/VisualizerSidebar";
import { View } from "@/components/ui/view/View";
import { VisualizerProvider } from "@/context/VisualizerContext";
import { useProjects } from "@/hooks/projects";
import { useEffect, useState } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { data: projects, isLoading } = useProjects();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (projects) {
      setProject(projects[0]);
    }
  }, [projects]);

  if (!project) return <div>Loading...</div>;

  return (
    <View className="flex w-full h-screen overflow-hidden">
      <VisualizerSidebar project={project} />
      <VisualizerProvider>
        <View className="flex flex-col w-full">
          <VisualizerHeader project={project} />
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
      </VisualizerProvider>
    </View>
  );
}


