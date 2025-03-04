import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth.ts";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const { signIn, signUp, useSession, signOut } = createAuthClient({
  baseURL: "http://localhost:3000", // the base url of your auth server
  plugins: [inferAdditionalFields<typeof auth>()],
});
