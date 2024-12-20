import "dotenv/config";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from ".";
import env from "~/.server/env";
import config from "$/drizzle.config";

if (!env.DB_MIGRATING) {
  throw new Error(
    'You must set DB_MIGRATING to "true" when running migrations'
  );
}

migrate(db, {
  migrationsFolder: config.out || "./drizzle",
});
