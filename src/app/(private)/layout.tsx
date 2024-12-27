import { AppSidebar } from "@/app/(private)/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <main className='flex h-screen'>
        <AppSidebar companyName='hoge fuga' userName='Gens' />
        <div className='flex items-center justify-center flex-1'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
