// SiteHeader.tsx
"use client";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";


export default function SiteHeader({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: any | null;
}) {
  return (
    <header className="w-full border-b">
      <div className="flex h-14 items-center px-4">
        <MainNav isAuthenticated={isAuthenticated} user={user} />
        <MobileNav isAuthenticated={isAuthenticated} user={user} />
      </div>
    </header>
  );
}