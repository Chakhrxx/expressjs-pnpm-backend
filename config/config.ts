import dotenv from "dotenv";
dotenv.config();

// mongoDB config
export const mongoURI = process.env.MONGOURI;
export const mongoDBName = process.env.MONGO_DB_NAME;

// postgres config
export const postgresHost = process.env.POSTGRES_HOST;
export const postgresPort = process.env.POSTGRES_PORT;
export const postgresUserName = process.env.POSTGRES_USERNAME;
export const postgresPassword = process.env.POSTGRES_PASSWORD;
export const postgresDBName = process.env.POSTGRES_DB_NAME;
