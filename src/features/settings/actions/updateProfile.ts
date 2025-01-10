"use server";
import "server-only";

import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const comments = formData.get("comments") as string;
  const department = formData.get("department") as string;

  const { data: userSession, error: userSessionError } =
    await supabase.auth.getSession();

  if (!userSession) {
    throw new Error("User session not found");
  }
  if (userSessionError) {
    throw new Error(`Failed to get user session: ${userSessionError.message}`);
  }

  const userId = userSession.session?.user?.id;
  if (!userId) {
    throw new Error("userId not found");
  }

  const { data: updateUserData, error: updateUserError } = await supabase
    .from("users")
    .update({
      name: name,
      comments: comments,
      department: department,
    })
    .eq("user_id", userId)
    .select("*")
    .single();

  if (updateUserError) {
    console.error("Database update error:", updateUserError.message);
    throw new Error(
      `Failed to update user profile: ${updateUserError.message}`
    );
  }

  redirect(`/settings/${updateUserData.id}`);
}
