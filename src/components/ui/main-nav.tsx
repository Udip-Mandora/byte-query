// MainNav.tsx

import { Button } from "./button";
import Link from "next/link";
import UserDropDown from "@/components/ui/user-dropdown";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const mainNavLinks = [
  { text: "Link1", url: "#" },
  { text: "Link2", url: "#" },
  { text: "Link3", url: "#" },
];

export default function MainNav({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: any| null;
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

      {isAuthenticated ? (
        <div className="flex items-center gap-x-1 mr-0 pr-0 r-0">
          <UserDropDown
            email={user?.email}
            name={user?.given_name + " " + user?.family_name}
            userImage={""}
          />
        </div>
      ) : (
        <div className="flex items-center gap-x-1 mr-0 pr-0 r-0">
          <LoginLink>
            <Button variant="link">Login</Button>
          </LoginLink>
          <RegisterLink>
            <Button variant="link">Signup</Button>
          </RegisterLink>
        </div>
      )}
    </div>
  );
}