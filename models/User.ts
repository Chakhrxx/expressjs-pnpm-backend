import { postgresDBName } from "./../config/config";
import { Schema, Document, model } from "mongoose";

export interface InterfaceUser extends Document {
  name: string;
  password: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
    required: true,
  },
  role: { type: String, enum: ["admin", "user", "guest"], default: "guest" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<InterfaceUser>("User", UserSchema);

export const postgresUserTable = `
    CREATE TABLE IF NOT EXISTS users (
      _id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      role VARCHAR(5) NOT NULL CHECK (role IN ('admin', 'guest')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

export const mysqlUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    _id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(5) NOT NULL CHECK (role IN ('admin', 'user', 'guest')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );  
  `;
