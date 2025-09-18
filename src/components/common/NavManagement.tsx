import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import { LucideIcon } from "lucide-react";

type NavItem = {
  title: string;
  icon: LucideIcon; 
  url: string;
};

type NavManagementProps = {
  items: NavItem[];
};
export default function NavManagement({ items }: NavManagementProps) {
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
