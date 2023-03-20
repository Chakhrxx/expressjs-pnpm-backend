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
