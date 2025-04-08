ALTER TABLE "votes" DROP CONSTRAINT "votes_question_id_questions_id_fk";
--> statement-breakpoint
ALTER TABLE "votes" DROP COLUMN "question_id";