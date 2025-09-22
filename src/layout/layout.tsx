import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar/app-sidebar";

import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <Suspense fallback={<>Loading...</>}>
        <Outlet />
      </Suspense>
    </SidebarProvider>
  );
};

export default Layout;
