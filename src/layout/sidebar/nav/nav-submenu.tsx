import { useLocation, useNavigate } from "react-router-dom";
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface NavSubMenuProps {
  items: { title: string; url: string }[];
}

export function NavSubMenu({ items }: NavSubMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isSubItemActive = (url: string) => location.pathname === url;

  return (
    <SidebarMenuSub className="ml-4 border-l border-border/40 mt-1">
      {items.map((subItem) => {
        const active = isSubItemActive(subItem.url);
        return (
          <SidebarMenuSubItem key={subItem.title}>
            <SidebarMenuSubButton asChild>
              <button
                onClick={() => navigate(subItem.url)}
                className={`w-full px-3 py-2 rounded-md text-sm relative text-left ${
                  active
                    ? "bg-accent !text-primary font-medium"
                    : "text-muted-foreground hover:!text-foreground hover:bg-accent/40"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 w-0.5 h-4 bg-primary rounded-full -translate-y-1/2 -ml-3" />
                )}
                <span>{subItem.title}</span>
              </button>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        );
      })}
    </SidebarMenuSub>
  );
}
