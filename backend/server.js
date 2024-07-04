import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
const app = express();
const PORT = 3000;
const mongo_string = `mongodb://127.0.0.1:27017/Spyne`;

app.use(cors());
app.use(bodyParser.json());
app.use("/", userRoutes);
app.use("/", postRoutes);
// Connect to MongoDB
mongoose
  .connect(mongo_string)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server only after a successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
