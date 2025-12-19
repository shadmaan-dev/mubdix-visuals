"use client";

import React, { useEffect, useMemo } from "react";
import { useCreateUpdateSpot, useDeleteSpot } from "@/hooks/layers";
import { Controller, useForm } from "react-hook-form";
import { View } from "@/components/ui/view/View";
import Typography from "@/components/ui/typography/Typography";
import Button from "@/components/ui/button/Button";
import { useApp } from "@/stores/appStore";
import { X } from "lucide-react";
import TextField from "@/components/ui/fields/text/TextField";
import { useVisualizerStore } from "@/stores/visualizerStore";
import SelectField from "@/components/ui/fields/select/SelectField";
import SliderField from "@/components/ui/fields/slider/SliderField";
import MediaSelector from "@/components/gallery/MediaSelector";
import IconSelector from "@/components/gallery/IconSelector";

const AddShapeForm = () => {
  const setAppDrawer = useApp((state) => state.setAppDrawer);
  const layers = useVisualizerStore((state) => state.layers);
  const spots = useVisualizerStore((state) => state.spots);
  const activeSpotIndex = useVisualizerStore((state) => state.activeSpotIndex);
  const updateActiveSpot = useVisualizerStore((state) => state.updateActiveSpot);

  const createUpdateSpot = useCreateUpdateSpot();
  const deleteSpot = useDeleteSpot();

  const activeSpot = (activeSpotIndex || activeSpotIndex === 0) ? spots[activeSpotIndex] : {};

  const layerOptions = useMemo(() => {
    return layers.map((layer) => ({
      label: layer.title,
      value: layer.id,
    }));
  }, [layers]);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: activeSpot,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      updateActiveSpot({ ...activeSpot, ...value });
    });
    return () => subscription.unsubscribe();
  }, [watch, activeSpot, updateActiveSpot]);

  const onSubmit = (data: any) => {
    createUpdateSpot.mutate(data);
    setAppDrawer({ open: false, component: null });
  };

  return (
    <View>
      <View className="flex items-center justify-between border-b border-default pl-4 pr-2 py-2 bg-gray-600">
        <Typography variant="h6" className="text-white">Add Spot</Typography>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setAppDrawer({ open: false, component: null })}
          className="hover:bg-gray-500 hover:text-white"><X size={18} color="white" /></Button>
      </View>
      <View className="p-4">
        <View className="flex flex-col gap-4">
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField label="Title" {...field} invalid={!!errors.title} />
            )}
          />

          {activeSpot.type === 'icon' && (
            <Controller
              name="meta_data.src"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <IconSelector {...field} name="src" >
                  <Typography variant="body2" className="text-gray-500">Select Icon</Typography>
                </IconSelector>
              )}
            />
          )}

          <Controller
            name="target_layer_id"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <SelectField label="Select Target Layer" options={layerOptions} {...field} invalid={!!errors.target_layer_id} />
            )}
          />

          <Controller
            name="meta_data.width"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SliderField label="Width" {...field} invalid={!!(errors.meta_data as any)?.width} />
            )}
          />
          <Controller
            name="meta_data.height"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SliderField label="Height" {...field} invalid={!!(errors.meta_data as any)?.height} />
            )}
          />

          <Controller
            name="meta_data.x"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SliderField label="X-Axis" max={1920} {...field} invalid={!!(errors.meta_data as any)?.x} />
            )}
          />
          <Controller
            name="meta_data.y"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SliderField label="Y-Axis" max={1024} {...field} invalid={!!(errors.meta_data as any)?.y} />
            )}
          />

        </View>
        <View className="flex gap-2 mt-6">
          <Button
            variant="solid"
            security="danger"
            size="md"
            label="Remove"
            onClick={() => deleteSpot.mutate(activeSpot.id)}
            className="w-full hover:bg-gray-500 hover:text-white" />
          <Button
            variant="solid"
            size="md"
            label="Save"
            onClick={handleSubmit(onSubmit)}
            className="w-full hover:bg-gray-500 hover:text-white"
          />
        </View>

      </View>

    </View>
  );
};

export default AddShapeForm;