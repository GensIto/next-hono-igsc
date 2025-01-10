"use client";

import { Card } from "@/components/ui/card";

import { parseWithZod } from "@conform-to/zod";
import { getInputProps, useForm } from "@conform-to/react";
import { InputField } from "@/components/form/inputField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/form/label";
import { createUserByAdmin } from "@/features/create-user/actions/createUser";
import { createUserSchema } from "@/features/create-user/schema/createUserSchema";

export default function CreateUser() {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createUserSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className='w-full max-w-md p-6'>
        <form
          id={form.id}
          onSubmit={form.onSubmit}
          noValidate
          className='flex flex-col gap-2 max-w-md w-full'
        >
          <InputField
            label='Name'
            formID={fields.name.id}
            errorId={fields.name.errorId}
            errors={fields.name.errors}
            {...getInputProps(fields.name, { type: "text" })}
          />
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
          <InputField
            label='Department'
            formID={fields.department.id}
            errorId={fields.department.errorId}
            errors={fields.department.errors}
            {...getInputProps(fields.department, { type: "text" })}
          />
          <div className='flex items-center gap-2'>
            <Checkbox
              key={fields.is_admin.key}
              id={fields.is_admin.id}
              name={fields.is_admin.name}
              value={fields.is_admin.value}
              onCheckedChange={(checked) => {
                form.update({
                  name: fields.is_admin.name,
                  value: !checked,
                });
              }}
            />
            <Label htmlFor={fields.is_admin.id}>Is Admin?</Label>
            <div id={fields.is_admin.errorId} className='text-destructive'>
              {fields.is_admin.errors}
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <Button formAction={createUserByAdmin}>Log in</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
