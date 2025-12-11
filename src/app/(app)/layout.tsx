"use client";

import Container from "@/components/layout/Container";
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

  if (isLoading || !project) return <div>Loading...</div>;

  return (
    <View className="flex w-full h-screen overflow-hidden">
      <VisualizerSidebar project={project} />
      <VisualizerProvider>
        <View className="flex flex-col w-full">
          <VisualizerHeader project={project} />
          <Container>
            <main className="w-full h-full overflow-hidden" id="app-container">{children}</main>
          </Container>
        </View>
      </VisualizerProvider>
    </View>
  );
}


