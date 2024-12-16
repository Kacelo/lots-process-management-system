"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";
// import AuthStore from "@/app/stores/userStore";
import { Button } from "../button";
import { useRootStore } from "@/app/stores/RootStateContext";
// import { useRootStore } from "@/app/stores/RootStateProvider";

export const NavBar = observer(() => {
  const { authStore, processStore } = useRootStore();
  const { user } = authStore;
  // const {fetchAllProcesses} = processStore;
  // console.log("processes:",    processStore.fetchAllProcesses());
  useEffect(() => {
    // Fetch all processes when the component mounts
    fetchData();
  }, [processStore]);
  async function fetchData() {
    // You can await here
    // console.log("processes:", await fetchAllProcesses())
    // ...
  }
  return (
    <div className="fixed top-12 left-0 w-full flex items-center justify-center">
      <div className="flex items-center py-1 px-2">
        <Link href="/" className="font-semibold p-2">
          Home
        </Link>
        {user && (
          <Link href="/dashboard" className="font-semibold p-2">
            Dashboard
          </Link>
        )}
        {!user && (
          <>
            <Link href="/login" className="font-semibold p-2">
              Login
            </Link>
            <Link href="/register" className="font-semibold p-2">
              Sign Up
            </Link>
          </>
        )}
        {user && (
          <Button variant="destructive" onClick={() => authStore.logOut()}>
            Log Out
          </Button>
        )}
      </div>
    </div>
  );
});
