import { View } from "@/components/ui/view/View";
import { Loader2 } from "lucide-react";
import Typography from "@/components/ui/typography/Typography";

const AppLoader = () => {
  return (
    <View className="flex flex-col gap-4 items-center justify-center h-screen w-full bg-gray-50/50 backdrop-blur-sm">
      <div className="p-4 rounded-full bg-white shadow-xl border border-slate-100">
        <Loader2 className="h-8 w-8 animate-spin text-slate-900" />
      </div>
      <Typography variant="body2" className="text-slate-500 font-medium animate-pulse tracking-wide text-xs uppercase">
        Loading...
      </Typography>
    </View>
  );
};

export default AppLoader;