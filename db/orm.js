import dotenv from "dotenv";
import { Sequelize } from "sequelize";

// Load environment variables
dotenv.config();

const connectionString = process.env.PG_URI;

// Ensure that the connection string is not undefined
if (!connectionString) {
  throw new Error("PG_URI is not defined in your environment variables");
}

// Initialize Sequelize with the connection string
const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
