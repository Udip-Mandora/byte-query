import { createUpdateSchema } from 'drizzle-zod';
import { AnswerTable } from './schema';
export const AnswerTableUpdateSchema = createUpdateSchema(AnswerTable);