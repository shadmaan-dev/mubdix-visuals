"use client";

import React from "react";
import { useCreateUpdateSpot } from "@/hooks/layers";
import { Controller, useForm } from "react-hook-form";
import { View } from "@/components/ui/view/View";
import Typography from "@/components/ui/typography/Typography";
import Button from "@/components/ui/button/Button";
import { useApp } from "@/stores/appStore";
import { X } from "lucide-react";
import TextField from "@/components/ui/fields/text/TextField";
import { useVisualizerStore } from "@/stores/visualizerStore";

const AddShapeForm = () => {
  const setAppDrawer = useApp((state) => state.setAppDrawer);
  const spots = useVisualizerStore((state) => state.spots);
  const activeSpotIndex = useVisualizerStore((state) => state.activeSpotIndex);

  const createUpdateSpot = useCreateUpdateSpot();

  const activeSpot = (activeSpotIndex || activeSpotIndex === 0) ? spots[activeSpotIndex] : {};

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: activeSpot,
  });

  const onSubmit = (data: any) => {
    createUpdateSpot.mutate(data);
    setAppDrawer({ open: false, component: null });
  };

  return (
    <View>
      <View className="flex items-center justify-between border-b border-default px-2 py-2 bg-gray-600">
        <Typography variant="h6" className="text-white">Add Spot</Typography>
        <Button
          variant="outlined"
          size="xs" label=""
          leftIcon={<X size={18} color="white" />}
          onClick={() => setAppDrawer({ open: false, component: null })}
          className="border-0 hover:bg-gray-500 hover:text-white"
        />
      </View>
      <View>
        <View>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField label="Title" {...field} invalid={!!errors.title} />
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

export default AddShapeForm;