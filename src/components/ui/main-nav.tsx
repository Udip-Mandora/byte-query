// MainNav.tsx

import { Button } from "./button";
import Link from "next/link";
import UserDropDown from "@/components/ui/user-dropdown";
import { signIn } from "@/lib/auth-client";

const mainNavLinks = [
  { text: "Got a question?", url: "/new-question" },
  { text: "Link2", url: "#" },
  { text: "Link3", url: "#" },
];

export default function MainNav({
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
    <div className="hidden gap-2 md:flex container mx-auto flex items-center justify-between">
      <div className="l-0 pr-4">
        <Link href={"/"}>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            ByteQuery
          </h4>
        </Link>
      </div>
      <div className="mx-auto lg:block">
        {mainNavLinks.map((item, index) => (
          <Link key={index} href={item.url}>
            <Button variant="link">{item.text}</Button>
          </Link>
        ))}
      </div>

      {user ? (
        <div className="flex items-center gap-x-1 mr-0 pr-0 r-0">
          <UserDropDown
            email={user?.email}
            name={user?.name || ""}
            userImage={user?.image}
          />
        </div>
      ) : (
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
  );
}
