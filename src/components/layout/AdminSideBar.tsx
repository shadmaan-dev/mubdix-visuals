import { BookDashed, ChevronRightIcon, Home, Layers, LayoutDashboard } from "lucide-react";
import MenuItem from "../ui/menu/MenuItem";
import { View } from "../ui/view/View";
import AppLogo from "./AppLogo";
import Drawer from "./Drawer";
import { useRouter } from "next/navigation";
import SideBarFooter from "./SideBarFooter";

const AdminSideBar = () => {
  const router = useRouter();
  return (
    <Drawer>
      <View className="flex flex-col h-full">
        <View className="flex items-center border-b border-default">
          <AppLogo />
        </View>
        <View className="flex-1 overflow-y-auto">
          <MenuItem
            size="md"
            leftIcon={<LayoutDashboard size={14} />}
            rightIcon={<ChevronRightIcon size={14} />}
            label="Dashboard"
            onClick={() => router.push("/admin")}
          />
        </View>
        <View>
          <MenuItem
            leftIcon={<Home size={14} />}
            rightIcon={<ChevronRightIcon size={14} />}
            label="Home"
            onClick={() => router.push("/")}
          />
        </View>
        <View className="flex h-14 items-center border-t border-default">
          <SideBarFooter />
        </View>
      </View>
    </Drawer>
  );
};

export default AdminSideBar;  