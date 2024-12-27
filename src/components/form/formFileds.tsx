import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import React from "react";

export const InputField = ({
  formID,
  errorId,
  errors,
  label,
  ...props
}: {
  formID: string;
  errorId: string;
  errors?: string[];
  label: string;
}) => {
  return (
    <div>
      <Label htmlFor={formID}>{label}</Label>
      <Input {...props} />
      <div id={errorId} className='text-destructive'>
        {errors}
      </div>
    </div>
  );
};
