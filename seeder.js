import mongoose from "mongoose";
import dotenv from "dotenv";
import Hero from "./models/Hero.js";
import { heroesData } from "./data/heroesData.js";

dotenv.config();

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB connected!");
	})
	.catch((error) => {
		console.error("Connection error:", error);
	});

const seedDatabase = async () => {
	try {
		await Hero.deleteMany();
		console.log("Collections cleared!");

		// Додаємо всі дані з heroesData одразу
		const heroes = await Hero.insertMany(heroesData);
		console.log("Heroes added:", heroes);

	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		await mongoose.connection.close();
		console.log("Database connection closed");
	}
};

// const seedDatabase = async () => {
// 	try {
// 		await Hero.deleteMany();
//
// 		console.log("Collections cleared!");
//
// 		const hero = new Hero(heroesData);
// 		await hero.save();
// 		console.log("Hero added:", hero);
//
// 	} catch (error) {
// 		console.error("Error seeding database:", error);
// 	} finally {
// 		await mongoose.connection.close();
// 	}
// };

// Викликаємо функцію для додавання даних
seedDatabase();