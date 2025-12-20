"use client";

import { useEffect } from "react";
import { useLayers } from "@/hooks/layers";
import { useVisualizerStore } from "@/stores/visualizerStore";
import LayerMenu from "./LayerMenu";
import Drawer from "./Drawer";
import { View } from "../ui/view/View";
import AppLogo from "./AppLogo";
import { ChevronRightIcon, UserIcon } from "lucide-react";
import SearchField from "../ui/fields/search/SearchField";
import SideBarFooter from "./SideBarFooter";
import MenuItem from "../ui/menu/MenuItem";
import { useRouter } from "next/navigation";

interface VisualizerSidebarProps {
  project: any;
}

const VisualizerSidebar = ({ project }: VisualizerSidebarProps) => {

  const router = useRouter();

  return (
    <Drawer>
      <View className="flex flex-col h-full">
        <View className="flex items-center border-b border-slate-200">
          <AppLogo />
        </View>
        <View className="flex-1 overflow-y-auto">
          <LayerMenu project={project} />
        </View>
        <View>
          <MenuItem
            size="md"
            leftIcon={<UserIcon size={20} />}
            rightIcon={<ChevronRightIcon size={20} />}
            label="Administrator"
            onClick={() => router.push("/admin")}
            className="bg-gray-200"
          />
        </View>
        <View className="flex h-14 items-center border-t border-slate-200">
          <SideBarFooter />
        </View>
      </View>
    </Drawer>
  );
};

export default VisualizerSidebar;