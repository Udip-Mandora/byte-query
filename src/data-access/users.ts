import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Get a user from database by id.
 * @param {string} id of the user
 * 
 * @returns User object or undefined 
*/
export async function usersGetOneById(id: string): Promise<{
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date | null;
    updatedAt: Date | null;
} | undefined> {
    const user = await db.query.UserTable.findFirst({ where: eq(UserTable.id, id) });
    return user
}


/**
 * Get a user from database by email.
 * @param {string} email of the user
 * 
 * @returns User object or undefined 
*/
export async function usersGetOneByEmail(email: string): Promise<{
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date | null;
    updatedAt: Date | null;
} | undefined> {
    const user = await db.query.UserTable.findFirst({ where: eq(UserTable.email, email) });
    return user
}
/**
 * Get a user from database by userName.
 * @param {string} userName of the user
 * 
 * @returns User object or undefined 
*/
export async function usersGetOneByUserName(userName: string): Promise<{
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date | null;
    updatedAt: Date | null;
} | undefined> {
    const user = await db.query.UserTable.findFirst({ where: eq(UserTable.userName, userName) });
    return user
}

/**
 * Create a new user in database
 * @returns {string} id of newly created user.
 *
 */
export async function usersCreateOne(data: { email: string, userName: string, firstName: string, lastName: string }): Promise<{ id: string; }> {
    const [user] = await db.insert(UserTable).values(data).returning({ id: UserTable.id })
    return user;
}
