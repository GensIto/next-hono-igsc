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
import {
  BabyIcon,
  HeartHandshakeIcon,
  LogOut,
  UserCog,
  UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/(private)/actions/logout";

const items = [
  {
    title: "Todays",
    url: "/todays",
    icon: HeartHandshakeIcon,
  },
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
  userName,
}: {
  companyName: string;
  userName: string;
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/settings/1"}>
              <Link href='/settings/1'>
                <UserCog />
                <span>{userName}</span>
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
