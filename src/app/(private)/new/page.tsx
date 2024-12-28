import { subMonths } from "date-fns";
import { Card } from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { createClient } from "@/lib/supabase";

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
    .filter("created_at", "gte", threeMonthsAgo);

  return (
    <div className='flex justify-center items-center h-screen'>
      {users?.map((user) => (
        <Card
          key={user.id}
          className='w-full max-w-md p-6 flex items-center gap-4 justify-between flex-col'
        >
          <Avatar className='bg-indigo-500 size-24' />
          <div className='w-full'>
            <p>name: {user.name}</p>
            <p>department: {user.department}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
