// SiteHeader.tsx
"use client";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

export default function SiteHeader({
  user,
}: {
  user:
    | {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        image?: string | null | undefined | undefined;
      }
    | undefined;
}) {
  return (
    <header className="w-full border-b">
      <div className="flex h-14 items-center px-4">
        <MainNav user={user} />
        <MobileNav user={user} />
      </div>
    </header>
  );
}
