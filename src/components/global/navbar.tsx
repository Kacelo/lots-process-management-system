import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
      <aside className="flex items-center gap-[2px]">
        <p>Automate Pro</p>
        <Image
          src={"/1.png"}
          width={15}
          height={15}
          alt="automate logo"
          className="shadow-sm"
        ></Image>
      </aside>
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none">
          
          <li>
            <Link href={"/login"}>Clients</Link>
          </li>
          <li>
            <Link href={"#pricing"}>Pricing</Link>
          </li>
          <li>
            <Link href={"/login"}>Login</Link>
          </li>
          <li>
            <Link href={"/sign-up"}>Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
