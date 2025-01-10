"use client";

import { InputField } from "@/components/form/inputField";
import { TextareaField } from "@/components/form/textareaField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { updateProfile } from "@/features/settings/actions/updateProfile";
import { updateProfileSchema } from "@/features/settings/schema/updateProfileSchema";
import { Database } from "@/schema";
import { useForm, getInputProps, getTextareaProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

export const ProfileEditForm = ({
  userData,
}: {
  userData: Database["public"]["Tables"]["users"]["Row"];
}) => {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateProfileSchema });
    },
    shouldValidate: "onBlur",
    defaultValue: {
      name: userData.name,
      department: userData.department,
      comments: userData.comments,
    },
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
            label='Department'
            formID={fields.department.id}
            errorId={fields.department.errorId}
            errors={fields.department.errors}
            {...getInputProps(fields.department, { type: "text" })}
          />
          <TextareaField
            label='Comments'
            formID={fields.comments.id}
            errorId={fields.comments.errorId}
            errors={fields.comments.errors}
            {...getTextareaProps(fields.comments)}
          />
          <div className='flex flex-col gap-6'>
            <Button formAction={updateProfile}>Update</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
