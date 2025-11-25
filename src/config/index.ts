import { config, config as dotenvConfig } from "dotenv";
import path from "path";

// dotenvConfig({path:path.join(__dirname, `../../.env/${process.env.NODE_ENV}`}));

dotenvConfig({
  // Dynamic hoga
  // like test hoga tuo process.env.test
  // production hoga tuo process.env.production
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

const { PORT, NODE_ENV, DB_HOST,DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
  process.env;

export const Config = {
  PORT,
  NODE_ENV,
  DB_HOST: DB_HOST || "localhost",
  DB_USERNAME: DB_USERNAME || "postgres",
  DB_PASSWORD: DB_PASSWORD || "121547",
  DB_NAME: DB_NAME || "postgres",
  DB_PORT: DB_PORT || "5432",
};
