"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { registerSchema, registerSchemaForm } from "./../../../../schema/register.schema";

export default function Register() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<registerSchemaForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function onSubmit(data: registerSchemaForm) {
    setIsLoading(true);
    setApiError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API || "https://ecommerce.routemisr.com/api/v1"}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const payload = await res.json();

      if (payload.message === "success") {
        router.push("/auth/login");
      } else {
        setApiError(payload.message || "Registration failed");
      }
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 w-2/3 mx-auto"
    >
      <h2 className="my-5 text-xl font-bold">
        Register Now
      </h2>

      {apiError && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {apiError}
        </div>
      )}

      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="name">
              Name
            </FieldLabel>

            <Input
              {...field}
              id="name"
              placeholder="Enter your name"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

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
        name="phone"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="phone">
              Phone Number
            </FieldLabel>

            <Input
              {...field}
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              aria-invalid={fieldState.invalid}
              autoComplete="tel"
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
              autoComplete="new-password"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="rePassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="repassword">
              Confirm Password
            </FieldLabel>

            <Input
              {...field}
              id="repassword"
              type="password"
              placeholder="Confirm your password"
              aria-invalid={fieldState.invalid}
              autoComplete="new-password"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Button disabled={isLoading} type="submit" className="bg-main text-white my-5 ml-auto block cursor-pointer hover:bg-main">
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
