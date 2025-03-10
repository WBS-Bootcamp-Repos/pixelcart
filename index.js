import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS

// Use the user routes
app.use("/users", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
