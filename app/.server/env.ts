/* eslint-disable no-console */
import Table from "cli-table3";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

import { z } from "zod";

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === "true";
  })
  .default("false");

const EnvSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    DB_MIGRATING: stringBoolean,
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
  })
  .transform((env) => {
    return {
      ...env,
      PROD: env.NODE_ENV === "production",
      DEV: env.NODE_ENV === "development",
      TEST: env.NODE_ENV === "test",
    };
  });

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  const table = new Table({ head: ["Variable", "Errors"] });

  const flatErrors = error.flatten().fieldErrors;

  for (const [key, value] of Object.entries(flatErrors)) {
    if (value) {
      table.push([key, value.map((v) => `\u00B7 ${v}`).join("\n")]);
    }
  }
  console.error("❌ Invalid env:");
  console.log(table.toString());
  process.exit(1);
}

console.log("✅ Environment variables loaded!");

export default env!;
