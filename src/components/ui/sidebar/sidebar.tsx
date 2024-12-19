"use client";

import * as React from "react";
import {
  ChartBar,
  CogIcon,
  Users,
} from "lucide-react";

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
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { useRootStore } from "@/app/stores/RootStateContext";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { observer } from "mobx-react-lite";
import { SkeletonCard } from "../skeleton/skeleton";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";

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
      title: "Analytics",
      url: "/dashboard",
      icon: ChartBar,
      items: [
{        title: "Dashboard",
  url: "/dashboard",}
      ],
    },
  ],
  admin: [
    {
      name: "Users",
      url: "/dashboard/users-table",
      icon: Users,
    },
    {
      name: "Processes",
      url: "/dashboard/all-processes",
      icon: CogIcon,
    },
    {
      name: "Analytics",
      url: "/dashboard",
      icon: ChartBar,
    },
  ],
  validator: [
    {
      name: "Scrutinize Processes",
      url: "/dashboard/scrutinize-processes",
      icon: CogIcon,
    },
    {
      name: "Review Processes",
      url: "/dashboard/review-processes",
      icon: CogIcon,
    },
    {
      name: "Analytics",
      url: "/dashboard",
      icon: ChartBar,
    },
  ],
  contributor: [
    {
      name: "My Tasks",
      url: "/dashboard/my-tasks",
      icon: CogIcon,
    },
  ],
};


export const AppSidebar = observer(
  ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const [role, setRole] = React.useState<{ id: string }[]>();
    const { authStore } = useRootStore();
    const { user, isLoading } = authStore;
    if (user) {
    }

    React.useEffect(() => {
      if (user?.email) {
        fetchUserData();
      }
    }, [user?.email]);
    const fetchUserData = async () => {
      try {
        if (!user?.email) {
          console.error("No user email found.");
          return;
        }

        const usersCollection = collection(firestore, "users");
        // Fetch matching documents
        const querySnapshot = await getDocs(
          query(usersCollection, where("uid", "==", user?.uid))
        );

        // Map Firestore documents to an array of process data
        const userResult = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID as a unique key
          ...doc.data(), // Spread other fields
        }));
        setRole(userResult);
      } catch (error) {
        console.error("Error fetching processes:", error);
      }
    };
    if (user && !isLoading) {
      const userData = {
        name: user.email as string,
        email: user.email as string,
        avatar: "",
      };
      return (
        <div>
          <Sidebar collapsible="icon" {...props}>
            {/* <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader> */}
            <SidebarContent>
              {/* <NavMain items={data.navMain} /> */}
              {/* <NavProjects projects={role[0]?.role === 'admin' ? data.admin : data.validtaor || role[0]?.role === 'validator'  data.validtaor : data.contributor } /> */}
              <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}

            </SidebarContent>
            <SidebarFooter>
              <NavUser user={userData} />
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
