// MobileNav.tsx
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Divide, Menu as MenuIcon } from "lucide-react";
import Link from "next/link";
import UserDropDown from "@/components/ui/user-dropdown";
import {
    LoginLink,
    RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
const mobileItems = [
    { text: "Link1", url: "#" },
    { text: "Link2", url: "#" },
    { text: "Link3", url: "#" },
];

export default function MobileNav({
    isAuthenticated,
    user,
}: {
    isAuthenticated: boolean;
    user: any | null;
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
                {isAuthenticated && (
                    <div className="flex items-center ml-4 mt-0 top-0">
                        <UserDropDown
                            email={user?.email}
                            name={user?.given_name + " " + user?.family_name}
                            userImage={""}
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
                    {!isAuthenticated && (
                        <div className="flex items-center gap-x-1 mr-0 pr-0 r-0">
                            <LoginLink>
                                <Button variant="link">
                                    {" "}
                                    <Button variant="link">
                                        {" "}
                                        <span className="text-lg font-semibold">Login </span>
                                    </Button>
                                </Button>
                            </LoginLink>
                            <RegisterLink>
                                <Button variant="link">
                                    {" "}
                                    <span className="text-lg font-semibold">Signup </span>
                                </Button>
                            </RegisterLink>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}