"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import UserDropDown from "./user-dropdown";
import { signIn } from "@/lib/auth-client";

export function SiteNavbar({
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    {
      name: "Got A Question?",
      link: "/new-question",
    },
  ];
  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          {user ? (
            <UserDropDown
              email={user?.email}
              name={user?.name || ""}
              userImage={user?.image}
            />
          ) : (
            <NavbarButton
              variant="primary"
              onClick={async () => {
                await signIn.social({
                  provider: "github",
                });
              }}
            >
              Login/Signup
            </NavbarButton>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          className=""
        >
          <div className="h-[calc(100vh-8em)] flex flex-col justify-between w-full">
            <div>
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block text-5xl font-bold">{item.name}</span>
                </a>
              ))}
            </div>
            <div className="flex w-full flex-row gap-4">
              <NavbarButton
                onClick={async () => {
                  setIsMobileMenuOpen(false);
                  await signIn.social({
                    provider: "github",
                  });
                }}
                variant="primary"
                className="w-full"
              >
                Login / SignUp
              </NavbarButton>
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
