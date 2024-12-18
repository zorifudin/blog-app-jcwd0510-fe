"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToogleDarkMode } from "./ToogleDarkMode";

const Navbar = () => {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  const logout = () => signOut();

  return (
    <nav className="sticky top-0 z-50 bg-background shadow-sm md:shadow-none">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold">
            Blog<span className="text-orange-500">Hub</span>
          </Link>

          <div className="hidden cursor-pointer items-center gap-8 font-medium md:flex">
            <Link href="/">Home</Link>
            <Link href="/">Profile</Link>
            {!user?.id && <Link href="/login">Sign in</Link>}
            {!!user?.id && (
              <>
                <p onClick={() => router.push("/write")}>Write</p>
                <p onClick={logout}>Logout</p>
              </>
            )}
            <ToogleDarkMode />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ToogleDarkMode />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/">Profile</Link>
                </DropdownMenuItem>

                {!user?.id && (
                  <DropdownMenuItem>
                    <Link href="/login">Sign in</Link>
                  </DropdownMenuItem>
                )}
                {!!user?.id && (
                  <>
                    <DropdownMenuItem>
                      <>
                        <p onClick={() => router.push("/write")}>Write</p>
                      </>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <>
                        <p onClick={logout}>Logout</p>
                      </>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
