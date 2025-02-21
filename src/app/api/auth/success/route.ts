import { createNewUserIfDoesntExist } from "@/use-cases/user-service";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    // get currently logged in user
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    // check if user exists and contains valid email
    if (!user || !user.email || !user.username || !user.given_name || !user.family_name) {
        throw new Error("something went wrong with authentication" + user);
    }

    await createNewUserIfDoesntExist({ userName: user.username, email: user.email, firstName: user.given_name, lastName: user.family_name });

    return NextResponse.redirect("http://localhost:3000/");
}