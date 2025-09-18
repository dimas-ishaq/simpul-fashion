import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { LucideIcon } from "lucide-react";

type NavItem = {
  title: string;
  icon: LucideIcon;
  url: string;
};

type NavSellerManagementProps = {
  items: NavItem[];
};
export default function NavSellerManagement({
  items,
}: NavSellerManagementProps) {
  return (
    <div>
      <SidebarGroup>
        <SidebarGroupLabel>Manajemen</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
}
