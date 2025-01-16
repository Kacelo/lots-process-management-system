"use client";

import * as React from "react";
import { ChartBar, CogIcon, Users } from "lucide-react";

// import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { useRootStore } from "@/app/stores/RootStateContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { observer } from "mobx-react-lite";
import { SkeletonCard } from "../skeleton/skeleton";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { toJS } from "mobx";
import { ModeToggle } from "../mode-toggle";
// import { toJS } from 'mobx';

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    {
      // Updated to reflect "Users"
      title: "Users",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Users Table",
          url: "/dashboard/users-table",
        },
        {
          title: "Add New User",
          url: "/dashboard/new-user",
        },
      ],
    },
    {
      // Updated to reflect "Processes"
      title: "Processes",
      url: "#",
      icon: CogIcon,
      items: [
        {
          title: "All Processes",
          url: "/dashboard/all-processes",
        },
        {
          title: "Review Processes",
          url: "/dashboard/review-processes",
        },
      ],
    },
    {
      // Updated to reflect "Processes"
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartBar,
      items: [{ title: "Dashboard", url: "/dashboard" }],
    },
  ],
  admin: [
    {
      // Updated to reflect "Users"
      title: "Users",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Users Table",
          url: "/dashboard/users-table",
        },
        {
          title: "Add New User",
          url: "/dashboard/new-user",
        },
      ],
    },
    {
      // Updated to reflect "Processes"
      title: "Processes",
      url: "#",
      icon: CogIcon,
      items: [
        {
          title: "All Processes",
          url: "/dashboard/all-processes",
        },
        {
          title: "Review Processes",
          url: "/dashboard/review-processes",
        },
      ],
    },
    {
      // Updated to reflect "Processes"
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartBar,
      items: [{ title: "Dashboard", url: "/dashboard" }],
    },
  ],
  validator: [
    {
      // Updated to reflect "Processes"
      title: "Processes",
      url: "#",
      icon: CogIcon,
      items: [
        {
          title: "All Processes",
          url: "/dashboard/all-processes",
        },
        {
          title: "Review Processes",
          url: "/dashboard/review-processes",
        },
        {
          title: "Create New Processe",
          url: "/dashboard/new-process",
        },
      ],
    },
    {
      // Updated to reflect "Processes"
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartBar,
      items: [{ title: "Dashboard", url: "/dashboard" }],
    },
  ],
  contributor: [
    {
      title: "My Tasks",
      url: "/dashboard/my-tasks",
      items: [
        {
          title: "View Tasks",
          url: "/dashboard/my-tasks",
          icon: CogIcon,
        },
      ],
    },
  ],
};

export const AppSidebar = observer(
  ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const { sessionStore } = useRootStore();
    React.useEffect(() => {
      sessionStore.fetchCurrentUser();
    }, [sessionStore]);
    const { isLoading } = sessionStore;
    const userDetails = toJS(sessionStore.userData);
    if (!isLoading) {
      const userData = {
        username: userDetails?.email as string,
        email: userDetails?.email as string,
        avatar: "",
      };
      const userRole = userDetails?.role || "contributor"; // Default to "contributor" if role is undefined

      let navItems;
      if (userRole === "admin") {
        navItems = data.admin;
      } else if (userRole === "validator") {
        navItems = data.validator;
      } else {
        navItems = data.contributor;
      }
      return (
        <div>
          <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
              <h1>AutomatePro</h1>
            </SidebarHeader>
            <SidebarContent>
              <NavMain items={navItems} />
            </SidebarContent>
            <SidebarFooter>
              <NavUser user={userData} />
              <ModeToggle />
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
        </div>
      );
    } else {
      return (
        <div>
          <SkeletonCard />
        </div>
      );
    }
  }
);
