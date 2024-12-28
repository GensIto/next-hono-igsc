"use server";
import "server-only";

import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function createUserByAdmin(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const department = formData.get("department") as string;
  const is_admin = formData.get("is_admin") === "on";

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error("Auth signUp error:", authError.message);
    throw new Error(`Failed to sign up user: ${authError.message}`);
  }

  const { data: adminSession } = await supabase.auth.getSession();

  if (!adminSession) {
    throw new Error("Admin session not found");
  }

  const adminId = adminSession.session?.user?.id;
  if (!adminId) {
    throw new Error("Admin adminId not found");
  }

  const { data: getAdminUserData, error: getAdminUserError } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", adminId)
    .single();
  if (getAdminUserError) {
    throw new Error("Admin user not found");
  }

  const { error: userError } = await supabase.from("users").insert({
    name,
    user_id: authData.user?.id,
    company_id: getAdminUserData?.company_id,
    email: authData.user?.email,
    department,
    is_admin,
  });

  if (userError) {
    console.error("Database insert error:", userError.message);
    throw new Error(
      `Failed to insert user into database: ${userError.message}`
    );
  }

  redirect("/all");
}
