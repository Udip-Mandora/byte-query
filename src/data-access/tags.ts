import { db } from "@/drizzle/db";
import { TagTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Get a tag form database by id.
 * @param {string} id of the tag
 * 
 * @returns A tag object or undefined
 */
export async function tagGetByOneId(id: string): Promise<{
    id: string;
    name: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
} | undefined> {
    const tag = await db.query.TagTable.findFirst({ where: eq(TagTable.id, id) });
    return tag;
}

/**
 * Get a tag from database by name.
 * @param {string} name of the tag
 * 
 * @returns A tag object or undefined
 */
export async function tagGetByOneName(name: string): Promise<{
    id: string;
    name: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
} | undefined> {
    const tag = await db.query.TagTable.findFirst({ where: eq(TagTable.name, name) });
    return tag;
}

/**
 * Create a new tag in database
 * @returns {string} id of newly created tag.
 *
 */
export async function tagsCreateOne(data: { name: string, description: string }): Promise<{ id: string; }> {
    const [tag] = await db.insert(TagTable).values(data).returning({ id: TagTable.id })
    return tag;
}

/**
 * Retrive a tag from the database
 * @param {string} id of the tag
 * 
 * @returns A tag object or undefined
 */
