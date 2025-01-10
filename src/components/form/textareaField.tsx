import { Label } from "@/components/form/label";
import { Textarea } from "@/components/form/textarea";
import React from "react";

export const TextareaField = ({
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
      <Textarea {...props} />
      <div id={errorId} className='text-destructive'>
        {errors}
      </div>
    </div>
  );
};
