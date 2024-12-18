"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
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
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { useRootStore } from "@/app/stores/RootStateContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { observer } from "mobx-react-lite";
import { SkeletonCard } from "../skeleton/skeleton";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: ChartBar,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
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
  validtaor: [
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
  contributor: [
    {
      name: "Processes",
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

        const processCollection = collection(firestore, "users");
        // Fetch matching documents
        const querySnapshot = await getDocs(
          query(processCollection, where("uid", "==", user?.uid))
        );

        // Map Firestore documents to an array of process data
        const processList = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID as a unique key
          ...doc.data(), // Spread other fields
        }));

        console.log("Filtered processes", processList);
        setRole(processList);
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
              <NavProjects projects={data.admin} />
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
