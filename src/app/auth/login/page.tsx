"use client";

import { View } from "@/components/ui/view/View"
import Typography from "@/components/ui/typography/Typography"
import Button from "@/components/ui/button/Button"
import { Controller, useForm } from "react-hook-form";
import TextField from "@/components/ui/fields/text/TextField";
import { supabaseClient } from "@/services/supabase/client";

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    const supabase = supabaseClient();
    supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    }).then((res) => {
      if (res.error) {
        console.log(res.error);
      }
      if (res.data.session) {
        console.log(res.data.session);
      }
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <View className="w-80">
      <View>
        <Typography variant="h6" className="text-center">Login</Typography>
        <Typography variant="body2" className="text-center">Login to your account</Typography>
      </View>
      <View className="flex flex-col gap-2">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label="Email" {...field} invalid={!!errors.email} />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label="Password" {...field} invalid={!!errors.password} />
          )}
        />
      </View>
      <View className="mt-4">
        <Button label="Login" className="w-full" onClick={handleSubmit(onSubmit)} />
      </View>

    </View>
  )
}

export default LoginPage