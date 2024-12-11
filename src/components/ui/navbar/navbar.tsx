"use client";
import React, { useState } from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { authStore } from "@/app/stores/userStore";
import { Button } from "../button";

// export default function NavBar() {
//   return (
//     <div className="fixed top-12 left0 w-full flex items-center justify-center">
//       <div className="flex items-center py-1 px-2 ">
//         <Link href="/" className="font-semibold p-2">
//           Home
//         </Link>
//         <Link href="/dashboard" className="font-semibold p-2">
//           Dashboard
//         </Link>
//         <Link href="/dashboard" className="font-semibold p-2">
//           Login
//         </Link>
//         <Link href="/dashboard" className="font-semibold p-2">
//           Sign Up
//         </Link>
//         <Link href="/dashboard" className="font-semibold p-2">
//           Log Out
//         </Link>
//       </div>
//     </div>
//   );
// }

export const NavBarr = observer(() => {
  const { user, isLoading } = authStore;
  console.log("Here I am:", user);
  //   const [users, setUser] = useState(authStore.user);
  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }

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
