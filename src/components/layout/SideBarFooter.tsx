import Image from "next/image";

import { View } from "@/components/ui/view/View";
import { Power } from "lucide-react";
import Button from "@/components/ui/button/Button";
import Typography from "@/components/ui/typography/Typography";

import { useSession } from "@/context/SessionContext";
import { supabaseClient } from "@/services/supabase/client";

const SideBarFooter = () => {

  const { session } = useSession();

  const handleLogout = () => {
    const supabase = supabaseClient();
    supabase.auth.signOut();
  };

  return (
    <View className="flex items-center gap-2 justify-between p-2">
      <View className="flex justify-center items-center w-10 h-10 bg-gray-200 rounded-full">
        <Image
          src={session?.user?.user_metadata?.avatar_url || '/thumbnail.png'}
          alt=""
          width={35}
          height={35}
          className="rounded-full"
        />
      </View>
      <View>
        <Typography variant="subtitle2">{session?.user?.user_metadata?.full_name || 'User Name'}</Typography>
        <Typography variant="body2" className="text-gray-500">{session?.user?.email}</Typography>
      </View>
      <Button
        size="sm"
        variant="ghost"
        onClick={handleLogout}
      >
        <Power size={20} />
      </Button>
    </View>
  );
};

export default SideBarFooter;