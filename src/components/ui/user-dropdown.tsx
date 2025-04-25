import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { IconQuestionMark } from "@tabler/icons-react";
import { LogOut } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  email: string | null | undefined;
  name: string | null | undefined;
  userImage: string | undefined | null;
}

export default function UserDropDown({ email, name, userImage }: iAppProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-7">
            {userImage && <AvatarImage src={userImage} alt="User Image" />}
            {name && name[0] && <AvatarFallback>{name[0]}</AvatarFallback>}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium leading-none">{name}</span>
              <span className="text-xs leading-none text-muted-foreground">
                {email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={"/#my-questions"}>
              <DropdownMenuItem>
                <IconQuestionMark /> My Questions
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={async () => {
              await signOut();
            }}
          >
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
