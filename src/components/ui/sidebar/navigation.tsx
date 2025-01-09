"use client";

import * as React from "react";
import { ChartBar, CogIcon, Users } from "lucide-react";import { toJS } from "mobx";
import { NavMain } from "./nav-main";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/app/stores/RootStateContext";


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
        items: [{ title: "Dashboard", url: "/dashboard" }],
      },
    ],
    admin: [
      {
        title: "Users",
        url: "/dashboard/users-table",
        icon: Users,
      },
      {
        title: "Processes",
        url: "/dashboard/all-processes",
        icon: CogIcon,
      },
      {
        title: "Analytics",
        url: "/dashboard",
        icon: ChartBar,
      },
    ],
    validator: [
      {
        title: "Scrutinize Processes",
        url: "/dashboard/scrutinize-processes",
        icon: CogIcon,
      },
      {
        title: "Review Processes",
        url: "/dashboard/review-processes",
        icon: CogIcon,
      },
      {
        title: "Analytics",
        url: "/dashboard",
        icon: ChartBar,
      },
    ],
    contributor: [
      {
        title: "My Tasks",
        url: "/dashboard/my-tasks",
        icon: CogIcon,
      },
    ],
  };

// const Navigation = observer(() => {
//   // Get user details from sessionStore
//   const { authStore, sessionStore } = useRootStore();

//   const userDetails = toJS(sessionStore.userData); // Convert MobX observable to plain object
//   const userRole = userDetails?.role || "contributor"; // Default to "contributor" if role is undefined

//   // Select the menu based on role
//   let navItems;
//   if (userRole === "admin") {
//     navItems = data.admin;
//   } else if (userRole === "validator") {
//     navItems = data.validator;
//   } else {
//     navItems = data.contributor;
//   }

//   return <NavMain items={navItems} />;
// })

// export default Navigation;
