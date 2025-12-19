"use client";

import { View } from "@/components/ui/view/View"
import Typography from "@/components/ui/typography/Typography"
import Button from "@/components/ui/button/Button"
import { Controller, useForm } from "react-hook-form";
import { supabaseClient } from "@/services/supabase/client";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
        router.push("/");
      }
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <View className="relative w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden z-10">

      <View className="mb-8 text-center">
        <Typography variant="h4" className="text-white font-bold mb-2">Welcome Back</Typography>
        <Typography variant="body2" className="text-gray-300">Sign in to continue to Mubdix Visualizer</Typography>
      </View>

      <View className="flex flex-col gap-5">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <View>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  {...field}
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all duration-200"
                  placeholder="name@example.com"
                />
              </div>
            </View>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <View>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </View>
          )}
        />
      </View>

      <View className="mt-8">
        <Button
          label="Sign In"
          variant="solid"
          className="w-full !bg-white !text-black font-bold py-3 rounded-lg shadow-lg border-none hover:bg-gray-200"
          onClick={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  )
}

export default LoginPage;