"use client";

import MediaSelector from "@/components/gallery/MediaSelector";
import Button from "@/components/ui/button/Button";
import TextField from "@/components/ui/fields/text/TextField";
import Typography from "@/components/ui/typography/Typography";
import { View } from "@/components/ui/view/View";
import { useApp } from "@/stores/appStore";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useCreateLayer, useUpdateLayer } from "@/hooks/layers";
import SelectField from "@/components/ui/fields/select/SelectField";

const AddLayerForm = ({ layer }: { layer?: any }) => {

  const setAppDrawer = useApp((state) => state.setAppDrawer);
  const create = useCreateLayer();
  const update = useUpdateLayer();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: layer?.title || "",
      src: layer?.src || "",
      type: layer?.type || "image",
      width: layer?.width || 1920,
      height: layer?.height || 1024,
      project_id: "346d0205-8154-4062-a079-1682d1637c66",
    },
  });

  const type = watch("type");

  const typeOptions = [
    { value: "video", label: "Video" },
    { value: "image", label: "Image" },
  ];

  const onSubmit = (data: any) => {
    if (layer) {
      update.mutate({ ...data, id: layer.id });
    } else {
      create.mutate(data);
    }
    setAppDrawer({ open: false, component: null });
  };


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
      <View className="flex flex-col gap-2 p-2">
        <View className="flex flex-col gap-2">
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField label="Title" {...field} invalid={!!errors.title} />
            )}
          />
          <Controller
            name="type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectField
                options={typeOptions}
                {...field}
                invalid={!!errors.type}
              />
            )}
          />
          <Controller
            name="src"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <MediaSelector {...field} mediaType={type} />
            )}
          />
        </View>

        <View>
          <Button
            variant="solid"
            size="md" label="Save"
            onClick={handleSubmit(onSubmit)}
            className="w-full hover:bg-gray-500 hover:text-white"
          />
        </View>
      </View>

    </View>
  );
};

export default AddLayerForm;