"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  activeIndicatorVariants,
  chevronVariants,
  contentVariants,
  subItemVariants,
} from "./constants";

interface Props {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}

export function NavMain({ items }: Props) {
  const location = useLocation();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Helper function to check if item or its children are active
  const getItemActiveState = (item: (typeof items)[0]) => {
    const isParentActive = location.pathname === item.url;
    const isSubItemActive = item.items?.some(
      (subItem) => location.pathname === subItem.url
    );
    return {
      isParentActive,
      isSubItemActive,
      isAnyActive: isParentActive || isSubItemActive,
    };
  };

  // Update open items based on active routes
  useEffect(() => {
    const newOpenItems = new Set<string>();

    items.forEach((item) => {
      const { isAnyActive } = getItemActiveState(item);
      if (isAnyActive && item.items?.length) {
        newOpenItems.add(item.title);
      }
    });

    setOpenItems(newOpenItems);
  }, [location.pathname, items]);

  const toggleItem = (itemTitle: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle);
      } else {
        newSet.add(itemTitle);
      }
      return newSet;
    });
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const { isAnyActive } = getItemActiveState(item);
          const isOpen = openItems.has(item.title);
          const hasSubItems = item.items && item.items.length > 0;

          return (
            <Collapsible
              open={isOpen}
              onOpenChange={() => toggleItem(item.title)}
            >
              <SidebarMenuItem>
                <div className="relative">
                  {/* Active indicator */}
                  <AnimatePresence>
                    {isAnyActive && (
                      <motion.div
                        className="absolute left-0 top-1/2 w-1 h-6 bg-primary rounded-r-full -translate-y-1/2 -ml-4"
                        variants={activeIndicatorVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      />
                    )}
                  </AnimatePresence>

                  {hasSubItems ? (
                    <CollapsibleTrigger asChild>
                      <motion.button
                        className="w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`w-full transition-all duration-200 ${
                            isAnyActive
                              ? "bg-accent/80 text-primary font-semibold shadow-sm"
                              : "hover:bg-accent/50 hover:shadow-sm"
                          }`}
                        >
                          {item.icon && (
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <item.icon
                                className={isAnyActive ? "text-primary" : ""}
                              />
                            </motion.div>
                          )}
                          <span className="flex-1 text-left">{item.title}</span>
                          <motion.div
                            variants={chevronVariants}
                            animate={isOpen ? "open" : "closed"}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </motion.div>
                        </SidebarMenuButton>
                      </motion.button>
                    </CollapsibleTrigger>
                  ) : (
                    <NavLink to={item.url} className="block w-full">
                      {({ isActive }) => (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <SidebarMenuButton
                            tooltip={item.title}
                            className={`w-full transition-all duration-200 ${
                              isActive
                                ? "bg-accent/80 text-primary font-semibold shadow-sm"
                                : "hover:bg-accent/50 hover:shadow-sm"
                            }`}
                          >
                            {item.icon && (
                              <motion.div whileHover={{ scale: 1.1 }}>
                                <item.icon
                                  className={isActive ? "text-primary" : ""}
                                />
                              </motion.div>
                            )}
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </motion.div>
                      )}
                    </NavLink>
                  )}
                </div>

                {hasSubItems && (
                  <CollapsibleContent>
                    <AnimatePresence mode="wait">
                      {isOpen && (
                        <motion.div
                          variants={contentVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="overflow-hidden"
                        >
                          <SidebarMenuSub className="ml-4 border-l border-border/40">
                            {item.items?.map((subItem, index) => (
                              <motion.div
                                key={subItem.title}
                                variants={subItemVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                custom={index}
                              >
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton asChild>
                                    <NavLink to={subItem.url}>
                                      {({ isActive }) => (
                                        <motion.div
                                          className={`w-full px-3 py-2 rounded-md text-sm transition-all duration-200 relative ${
                                            isActive
                                              ? "bg-accent text-primary font-semibold"
                                              : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                                          }`}
                                          whileHover={{ x: 4, scale: 1.01 }}
                                          whileTap={{ scale: 0.98 }}
                                        >
                                          {isActive && (
                                            <motion.div
                                              className="absolute left-0 top-1/2 w-0.5 h-4 bg-primary rounded-full -translate-y-1/2 -ml-3"
                                              layoutId={`sub-active-${item.title}`}
                                              transition={{ duration: 0.2 }}
                                            />
                                          )}
                                          <span className="block">
                                            {subItem.title}
                                          </span>
                                        </motion.div>
                                      )}
                                    </NavLink>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              </motion.div>
                            ))}
                          </SidebarMenuSub>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
