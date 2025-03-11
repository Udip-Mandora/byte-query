"use server";
import { usersGetOneByEmail } from "@/data-access/users";
import { auth } from "@/lib/auth";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { headers } from "next/headers";

export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });
    const user = await session?.user;
    if (!user || !user.id) throw new Error("Un Authenticated !");
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
