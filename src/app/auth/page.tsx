"use client";
import { login, signup } from "@/features/auth/actions/login";
import { loginSchema } from "@/features/auth/schema/loginSchema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

export default function Auth() {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} noValidate>
      <div>
        <label htmlFor={fields.email.id}>Email</label>
        <input type='email' name={fields.email.name} />
        <div>{fields.email.errors}</div>
      </div>
      <div>
        <label htmlFor={fields.password.id}>Password</label>
        <input type='password' name={fields.password.name} />
        <div>{fields.password.errors}</div>
      </div>
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
