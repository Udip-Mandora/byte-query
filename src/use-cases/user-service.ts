import { usersGetOneByUserName, usersCreateOne } from "@/data-access/users";

/**
 * Creates a new user is doesnt exist
 * 
 * @param  data contains user's data
 * 
 * @return {void} 
 * 
 */ 
export async function createNewUserIfDoesntExist(data: { userName: string, email: string, firstName: string, lastName: string }) {
    const user = await usersGetOneByUserName(data.userName);
    if (!user) {
        const id = await usersCreateOne(data);
        if(!id)
        {
            throw new Error("error creating user");
        }
    }

}