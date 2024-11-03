import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import path from "path";
import heroRoutes from "./routes/heroRoutes.js";

const app = express();

const PORT = process.env.PORT || 3334;

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log("MongoDB connection error:", err));

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/hero", heroRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});