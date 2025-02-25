ALTER TABLE "questions" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "title" varchar(255) NOT NULL;