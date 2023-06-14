import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";

export async function SiteHeader() {
  const session = await getServerSession(OPTIONS);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Avatar>
              <AvatarImage
                src={session?.user.image || ""}
                alt={session?.user.name || ""}
              />
              <AvatarFallback>
                {session?.user.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
