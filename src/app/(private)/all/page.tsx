import { MemberCard } from "@/components/global/memberCard";
import { createClient } from "@/lib/supabase";

export default async function All() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: users } = await supabase
    .from("users")
    .select("*")
    .filter("user_id", "not.eq", session?.user?.id);

  if (!users) {
    return (
      <p className='flex justify-center items-center h-screen'>
        No users found
      </p>
    );
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <MemberCard usersData={users} />
    </div>
  );
}
