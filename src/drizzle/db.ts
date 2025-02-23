// import "dotenv/config";
// import { drizzle } from "drizzle-orm/bun-sql";
// import { neon, neonConfig } from '@neondatabase/serverless';

// import ws from 'ws';
// neonConfig.webSocketConstructor = ws;

// const client = neon(process.env.DATABASE_URL!);
// export const db = drizzle(client, { schema: UserMessages });


import { drizzle } from "drizzle-orm/bun-sql";
import { SQL } from "bun";

const client = new SQL(process.env.DATABASE_URL!);
export const db = drizzle({ client });

