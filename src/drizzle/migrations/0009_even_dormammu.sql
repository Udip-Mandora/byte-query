ALTER TABLE "votes" ADD CONSTRAINT "votes_user_id_answer_id_unique" UNIQUE("user_id","answer_id");