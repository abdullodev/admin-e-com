"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NavItem } from "./nav-item";

interface Props {
  items: {
    title: string;
    url: string;
    icon?: React.ComponentType<any>;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}

export function NavMain({ items }: Props) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
