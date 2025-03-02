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
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

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
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              {userImage && <AvatarImage src={userImage} alt="User Image" />}
              {name && name[0] && <AvatarFallback>{name[0]}</AvatarFallback>}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>test</DropdownMenuItem>
            <DropdownMenuItem>test</DropdownMenuItem>
            <DropdownMenuItem>test</DropdownMenuItem>
            <DropdownMenuItem>test</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button
              variant="link"
              onClick={async () => {
                await signOut();
              }}
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
