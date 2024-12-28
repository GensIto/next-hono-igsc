"use client";

import {
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  Sidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { BabyIcon, CircleUser, LogOut, UserCog, UsersIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Database } from "@/schema";
import { logout } from "@/actions/logout";

const items = [
  {
    title: "All",
    url: "/all",
    icon: UsersIcon,
  },
  {
    title: "New",
    url: "/new",
    icon: BabyIcon,
  },
];

export const AppSidebar = ({
  companyName,
  user,
}: {
  companyName: string;
  user: Database["public"]["Tables"]["users"]["Row"];
}) => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>{companyName}</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {user.is_admin && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                    <Link href='/admin'>
                      <UserCog />
                      <span>Admin</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === `/settings/${user.id}`}
            >
              <Link href={`/settings/${user.id}`}>
                <CircleUser />
                <span>{user.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild onClick={logout}>
              <div>
                <LogOut />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
