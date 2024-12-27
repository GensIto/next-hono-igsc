"use client";

import { InputField } from "@/components/form/formFileds";
import { Button } from "@/components/ui/button";
import { login } from "@/features/auth/actions/login";
import { loginSchema } from "@/features/auth/schema/loginSchema";
import { getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

export default function Auth() {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        noValidate
        className='flex flex-col gap-2 max-w-md w-full p-6 border border-gray-200 rounded-md'
      >
        <InputField
          label='Email'
          formID={fields.email.id}
          errorId={fields.email.errorId}
          errors={fields.email.errors}
          {...getInputProps(fields.email, { type: "email" })}
        />
        <InputField
          label='Password'
          formID={fields.password.id}
          errorId={fields.password.errorId}
          errors={fields.password.errors}
          {...getInputProps(fields.password, { type: "password" })}
        />
        <div className='flex flex-col gap-6'>
          <Button formAction={login}>Log in</Button>
        </div>
      </form>
    </div>
  );
}
