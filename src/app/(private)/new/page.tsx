import { formatISO, subMonths } from "date-fns";
import { createClient } from "@/lib/supabase";
import { MemberCard } from "@/components/global/memberCard";

export default async function New() {
  const threeMonthsAgo = subMonths(new Date(), 3);

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: users } = await supabase
    .from("users")
    .select("*")
    .filter("user_id", "not.eq", session?.user?.id)
    .filter("created_at", "gte", formatISO(threeMonthsAgo));

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
