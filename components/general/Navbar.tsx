import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "@/public/logo.png";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/auth";
import { UserDropdown } from "./UserDropdown";
const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between py-2">
      <Link href="/" className="flex items-center gap-2">
        <Image alt="" src={Logo} className="rounded-full size-20 " />
        <h1 className="text-2xl font-bold">
          Anefip<span className="text-primary"> Djib</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
        <Link className={buttonVariants({ size: "lg" })} href="/post-job">
          Post Job
        </Link>
        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            image={session.user.image as string}
            name={session.user.name as string}
          />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
