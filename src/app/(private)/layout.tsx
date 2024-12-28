import { AppSidebar } from "@/app/(private)/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("User ID is undefined");
  }
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (!userData) {
    throw new Error("User data is undefined");
  }
  if (!userData.company_id) {
    throw new Error("Company ID is undefined");
  }
  const { data: companyData } = await supabase
    .from("companies")
    .select("*")
    .eq("id", userData.company_id)
    .single();
  if (!companyData) {
    throw new Error("companyData is undefined");
  }

  return (
    <SidebarProvider>
      <main className='flex h-screen w-full'>
        <AppSidebar companyName={companyData.name ?? ""} user={userData} />
        <div className='w-full'>{children}</div>
      </main>
    </SidebarProvider>
  );
}
