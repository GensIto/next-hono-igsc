import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
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
