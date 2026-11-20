
"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { loginSchema, loginSchemaForm } from "@/schema/login.schema";
import { signIn } from 'next-auth/react'
import { useState } from "react";

export default function Login() {
  const [apiError, setApiError] = useState<string | null>(null);
  const form = useForm<loginSchemaForm>({
    resolver:zodResolver(loginSchema),
    defaultValues: {

      email: "",
      password: "",

    },
  });

async function onSubmit(data:loginSchemaForm){
    setApiError(null)
    const res = await signIn('credentials',{
        email:data.email,
        password:data.password,
        redirect:false,
        callbackUrl:'/'
      })
    if (res?.ok && res.url) {
      window.location.assign(res.url);
    } else {
      setApiError(res?.error || "Login failed")
    }
}

  return (
    <>
    <form
     onSubmit={form.handleSubmit(onSubmit)}
     className="space-y-5 w-2/3 mx-auto"
     >
      <h2 className="my-5 text-xl font-bold">
        Login Now
      </h2>

      {apiError && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {apiError}
        </div>
      )}

      <Controller
        name="email"
        control={form.control}

        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">
              Email
            </FieldLabel>

            <Input
              {...field}
              id="email"
              type="email"
              placeholder="Enter your email"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}

        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">
              Password
            </FieldLabel>

            <Input
              {...field}
              id="password"
              type="password"
              placeholder="Enter your password"
              aria-invalid={fieldState.invalid}
              autoComplete="current-password"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Button type="submit" className="bg-main text-white my-5 ml-auto block cursor-pointer hover:bg-main">
        Login
      </Button>
    </form>
        </>

  );
}