import { db } from "@/drizzle/db";
import { QuestionTable, QuestionTagTable, TagTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

/**
 * Get a tag form database by id.
 * @param {string} id of the tag
 *
 * @returns A tag object or undefined
 */
export async function tagGetByOneId(id: string): Promise<
  | {
      id: string;
      name: string | null;
      description: string | null;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
  | undefined
> {
  const tag = await db.query.TagTable.findFirst({ where: eq(TagTable.id, id) });
  return tag;
}

/**
 * Get a tag from database by name.
 * @param {string} name of the tag
 *
 * @returns A tag object or undefined
 */
export async function tagGetByOneName(name: string): Promise<
  | {
      id: string;
      name: string | null;
      description: string | null;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
  | undefined
> {
  const tag = await db.query.TagTable.findFirst({
    where: eq(TagTable.name, name),
  });
  return tag;
}

/**
 * Create a new tag in database
 * @returns {string} id of newly created tag.
 *
 */
export async function tagsCreateOne(data: {
  name: string;
  description: string;
}): Promise<{ id: string }> {
  const [tag] = await db
    .insert(TagTable)
    .values(data)
    .returning({ id: TagTable.id });
  return tag;
}

/**
 * Retrive all tag from the database
 *
 * @returns All tags from database.
 */
export async function tagGetAll(): Promise<
  {
    id: string;
    name: string | null;
    description: string | null;
  }[]
> {
  const tags = await db.query.TagTable.findMany();
  return tags;
}
/**
 * Retrive all tag from the database
 *
 * @returns All tags from database.
 */
export async function tagGetAllByQuestionId(questionId: string): Promise<
  {
    id: string;
    name: string | null;
    description: string | null;
  }[]
> {
  const tags = await db.query.TagTable.findMany({
    where: and(
      eq(TagTable.id, QuestionTagTable.tagId),
      eq(QuestionTagTable.questionId, questionId)
    ),
  });
  return tags;
}
