import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db"; // your drizzle instance
import * as Schema from "@/drizzle/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...Schema,
      user: Schema.UserTable,
      account: Schema.AccountTable,
      session: Schema.SessionTable,
      verification: Schema.VerificationTable,
    },
  }),
  socialProviders: {
    github: {
        clientId: process.env.GITHUB_CLIENT_ID as string, 
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  
});
