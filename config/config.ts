import dotenv from "dotenv";
dotenv.config();

// mongoDB config
export const mongoURI = process.env.MONGOURI;
export const mongoDBName = process.env.MONGO_DB_NAME;

// mySQL config
export const mysqlHost = process.env.MYSQL_HOST;
export const mysqlPort = process.env.MYSQL_PORT;
export const mysqlUserName = process.env.MYSQL_USERNAME;
export const mysqlPassword = process.env.MYSQL_PASSWORD;
export const mysqlDBName = process.env.MYSQL_DB_NAME;
