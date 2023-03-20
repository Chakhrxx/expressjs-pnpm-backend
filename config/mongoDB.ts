import mongoose from "mongoose";
export const { mongoURI: connectionString, mongoDBName } = require("./config");

export const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: mongoDBName || "docker",
  autoIndex: false, // Don't build indexes
  // If not connected, return errors immediately rather than waiting for reconnect
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

export const connectMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(connectionString, options);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
