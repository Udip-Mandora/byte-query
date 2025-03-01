import { usersCreateOne, usersGetOneByEmail } from "@/data-access/users";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

/**
 * Creates a new user is doesnt exist
 *
 * @param  data contains user's data
 *
 * @return {void}
 *
 */
export async function createNewUserIfDoesntExist(data: {
  email: string;
  firstName: string;
  lastName: string;
}) {
  const user = await usersGetOneByEmail(data.email);
  if (!user) {
    const id = await usersCreateOne(data);
    if (!id) {
      throw new Error("error creating user");
    }
  }
}

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
