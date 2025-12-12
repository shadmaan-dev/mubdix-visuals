"use client";

import Button from "@/components/ui/button/Button";
import TextField from "@/components/ui/fields/text/TextField";
import Typography from "@/components/ui/typography/Typography";
import { View } from "@/components/ui/view/View";
import { useApp } from "@/stores/appStore";
import { X } from "lucide-react";


const AddLayerForm = () => {

  const setAppDrawer = useApp((state) => state.setAppDrawer);
  return (
    <View>
      <View className="flex items-center justify-between border-b border-default px-2 py-2 bg-gray-600">
        <Typography variant="h6" className="text-white">Add Layer</Typography>
        <Button
          variant="outlined"
          size="xs" label=""
          leftIcon={<X size={18} color="white" />}
          onClick={() => setAppDrawer({ open: false, component: null })}
          className="border-0 hover:bg-gray-500 hover:text-white"
        />
      </View>
      <View>
        <TextField />
      </View>
    </View>
  );
};

export default AddLayerForm;