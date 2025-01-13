"use client";

import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../button";
import { useRootStore } from "@/app/stores/RootStateContext";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export function NavUser({
  user,
}: {
  user: {
    username: string;
    email: string;
    avatar?: string;
  };
}) {
  useEffect(() => {
    handleImageFallback(user?.username);
  }, [user?.username]);

  const { isMobile } = useSidebar();
  const { authStore, sessionStore } = useRootStore();
  const { toast } = useToast();
  const [avaterPlaceHolder, setAvatarPlaceHolder] = useState("");
  const handleLogout = async () => {
    try {
      await sessionStore.logOut(); // Call the logout function
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      redirect("/dashboard");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: `Logout Failed, ${error}`,
        description:
          "Something went wrong while logging out. Please try again.",
        variant: "destructive",
      });
    }
  };
  const handleImageFallback = (username: string) => {
  
    if(username){
      const initials = `${username.split(" ")[0][0]}`;
      setAvatarPlaceHolder(initials);
    }else {
      return
    }
   
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="rounded-lg">
                  {avaterPlaceHolder}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.username}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user.username}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup></DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <div>
                <Button variant="destructive" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
