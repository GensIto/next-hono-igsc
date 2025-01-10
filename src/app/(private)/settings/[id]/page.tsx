import { ProfileEditForm } from "@/features/settings/components/profileEditForm";
import { createClient } from "@/lib/supabase";

export default async function UserSetting({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (!users) {
    return (
      <p className='flex justify-center items-center h-screen'>No user found</p>
    );
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <ProfileEditForm userData={users} />
    </div>
  );
}
