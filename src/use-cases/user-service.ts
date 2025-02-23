import { usersCreateOne, usersGetOneByEmail } from "@/data-access/users";

/**
 * Creates a new user is doesnt exist
 * 
 * @param  data contains user's data
 * 
 * @return {void} 
 * 
 */ 
export async function createNewUserIfDoesntExist(data: { email: string, firstName: string, lastName: string }) {
    const user = await usersGetOneByEmail(data.email);
    if (!user) {
        const id = await usersCreateOne(data);
        if(!id)
        {
            throw new Error("error creating user");
        }
    }

}