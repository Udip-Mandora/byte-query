// MobileNav.tsx
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import Link from "next/link";
import UserDropDown from "@/components/ui/user-dropdown";
import { signIn } from "@/lib/auth-client";
const mobileItems = [
  { text: "Link1", url: "#" },
  { text: "Link2", url: "#" },
  { text: "Link3", url: "#" },
];

export default function MobileNav({
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
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* This button will trigger open the mobile sheet menu */}
      <SheetTrigger asChild>
        <div className="container mx-auto flex items-center justify-between md:hidden">
          <div className="l-0 pr-6 md:hidden">
            <Link href={"/"}>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                ByteQuery
              </h4>
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden r-0">
            <MenuIcon />
          </Button>
        </div>
      </SheetTrigger>

      <SheetContent side="right">
        {user && (
          <div className="flex items-center ml-4 mt-0 top-0">
            <UserDropDown
              email={user?.email}
              name={user?.name}
              userImage={user?.image}
            />
          </div>
        )}
        <div className="flex flex-col items-start mt-2">
          {mobileItems.map((item, index) => (
            <Link href={item.url} key={index}>
              <Button
                variant="link"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <span className="text-lg font-semibold">{item.text}</span>
              </Button>
            </Link>
          ))}
          {!user && (
            <div className="flex items-center gap-x-1 mr-0 pr-0 r-0">
              <Button
                variant="link"
                onClick={async () => {
                  await signIn.social({
                    provider: "github",
                  });
                }}
              >
                Signup/Login
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
