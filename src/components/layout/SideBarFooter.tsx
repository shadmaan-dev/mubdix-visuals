import { useSession } from "@/context/SessionContext";
import Typography from "../ui/typography/Typography";
import { View } from "../ui/view/View";
import Image from "next/image";
import Button from "../ui/button/Button";
import { LogOut, Power } from "lucide-react";
import { supabaseClient } from "@/services/supabase/client";

const SideBarFooter = () => {

  const { session } = useSession();


  const handleLogout = () => {
    const supabase = supabaseClient();
    supabase.auth.signOut();
  };
  return (
    <View className="flex items-center gap-2 justify-between px-2 py-2">
      <View className="flex justify-center items-center w-10 h-10 bg-gray-200 rounded-full">
        <Image src={session?.user?.user_metadata?.avatar_url || '/globe.svg'} alt="" width={30} height={30} />
      </View>
      <View>
        <Typography variant="subtitle2">{session?.user?.user_metadata?.full_name || 'User Name'}</Typography>
        <Typography variant="body2" className="text-gray-500">{session?.user?.email}</Typography>
      </View>
      <Button
        size="sm" label=""
        leftIcon={<Power size={22} />}
        variant="ghost"
        onClick={handleLogout}
      />
    </View>
  );
};

export default SideBarFooter;