"use server";
import { usersGetOneByEmail } from "@/data-access/users";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getCurrentUser() {
  try {
    const { isAuthenticated, getUser } = await getKindeServerSession();
    if (!isAuthenticated) {
      throw new Error("User not authenticated !");
    }
    const user = await getUser();
    if (!user || !user.email) {
      throw new Error("Error getting current user.");
    }

    const currentuser = await usersGetOneByEmail(user.email);
    if (!currentuser) {
      throw new Error("Error getting current user.");
    }
    return currentuser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
