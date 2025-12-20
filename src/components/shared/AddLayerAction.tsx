"use client";

import { View } from "@/components/ui/view/View";
import { useApp } from "@/stores/appStore";

import { Plus } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import AddLayerForm from "../views/visualizer/AddLayerForm";
import Button from "../ui/button/Button";


const AddLayerAction = () => {
  const setAppDrawer = useApp((state) => state.setAppDrawer);

  const handleAddLayer = () => {
    setAppDrawer({
      open: true,
      component: <AddLayerForm />,
      absolute: false
    });
  };

  return (
    <Fragment>
      <View>
        <Button variant="outlined" label="Add Layer" leftIcon={<Plus size={18} />} size="sm" onClick={handleAddLayer} />
      </View>
    </Fragment>

  );
};

export default AddLayerAction;
