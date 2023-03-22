import { Pool, QueryResult } from "pg";
import {
  postgresHost,
  postgresPort,
  postgresUserName,
  postgresPassword,
  postgresDBName,
} from "./config";

const postgresClient = new Pool({
  host: postgresHost,
  port: parseInt(postgresPort),
  user: postgresUserName,
  password: postgresPassword,
  database: postgresDBName,
});

export const connectPostgres = async (): Promise<void> => {
  try {
    await postgresClient
      .connect()
      .then(() => console.log("Connected to PostgresDB successfully!"))
      .catch((error: Error) => {
        console.error(error?.message);
        process.exit(1);
      });
  } catch (err) {}
};

export interface interfacePostgresQuery {
  text: string;
  values: any[];
}

export const postgresQuery = async (queryObject: interfacePostgresQuery) => {
  try {
    await postgresClient.connect();

    let query = queryObject?.text;

    queryObject.values.map((val) => {
      query = query.replace("?", val);
    });

    const result = await postgresClient.query(query);
    return result?.rows;
  } catch (error) {
    throw error;
  }
};
