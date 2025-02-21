import "dotenv/config";
import { drizzle } from "drizzle-orm/bun-sql";
import { neon, neonConfig } from '@neondatabase/serverless';

import ws from 'ws';
neonConfig.webSocketConstructor = ws;

const sql = neon(process.env.DATABASE_URL!);
