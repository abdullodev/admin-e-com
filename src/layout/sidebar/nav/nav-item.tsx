import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavSubMenu } from "./nav-submenu";

interface NavItemProps {
  item: {
    title: string;
    url: string;
    icon?: React.ComponentType<any>;
    items?: { title: string; url: string }[];
  };
}

export function NavItem({ item }: NavItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isActive =
    location.pathname === item.url ||
    item.items?.some((subItem) => location.pathname === subItem.url);

  const hasSubItems = !!item.items?.length;

  useEffect(() => {
    if (isActive && hasSubItems) {
      setIsOpen(true);
    }
  }, [isActive, hasSubItems]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <SidebarMenuItem>
        <div className="relative">
          {isActive && (
            <div className="absolute left-0 top-1/2 w-1 h-6 bg-primary rounded-r-full -translate-y-1/2 -ml-4" />
          )}

          {hasSubItems ? (
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.title}
                className={`w-full ${
                  isActive
                    ? "bg-accent text-primary font-medium"
                    : "hover:bg-accent/60"
                }`}
              >
                {item.icon && (
                  <item.icon className={isActive ? "text-primary" : ""} />
                )}
                <span className="flex-1 text-left">{item.title}</span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
          ) : (
            <SidebarMenuButton
              tooltip={item.title}
              onClick={() => navigate(item.url)}
              className={`w-full ${
                isActive
                  ? "bg-accent text-primary font-medium"
                  : "hover:bg-accent/60"
              }`}
            >
              {item.icon && (
                <item.icon className={isActive ? "text-primary" : ""} />
              )}
              <span>{item.title}</span>
            </SidebarMenuButton>
          )}
        </div>

        {hasSubItems && (
          <CollapsibleContent>
            <NavSubMenu items={item.items!} />
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
}
