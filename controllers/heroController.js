import Hero from "../models/Hero.js";

// GET all heroes
export const getAllHeroes = async (req, res) => {
	try {
		const heroes = await Hero.find();
		res.json(heroes);
	} catch (err) {
		res.status(500).json({ message: "Error retrieving heroes", error: err });
	}
};

// GET a single hero by ID
export const getHeroById = async (req, res) => {
	try {
		const hero = await Hero.findById(req.params.id);
		if (!hero) {
			return res.status(404).json({ message: "Hero not found" });
		}
		res.json(hero);
	} catch (err) {
		res.status(500).json({ message: "Error retrieving hero", error: err });
	}
};

// POST (add) a new hero
export const createHero = async (req, res) => {
	const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;
	const imagePath = req.file ? req.file.filename : null;

	try {
		const newHero = new Hero({
			nickname,
			real_name,
			origin_description,
			superpowers,
			catch_phrase,
			images: imagePath ? [imagePath] : [],
		});

		const savedHero = await newHero.save();
		res.status(201).json(savedHero);
	} catch (err) {
		res.status(400).json({ message: "Error creating new hero", error: err });
	}
};

// PUT (replace) an existing hero by ID
export const updateHero = async (req, res) => {
	const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;
	const imagePaths = req.files ? req.files.map(file => file.filename) : [];

	try {
		const updatedHero = await Hero.findByIdAndUpdate(
			req.params.id,
			{ nickname, real_name, origin_description, superpowers, catch_phrase, images: imagePaths },
			{ new: true }
		);

		if (!updatedHero) {
			return res.status(404).json({ message: "Hero not found" });
		}

		res.status(200).json(updatedHero);
	} catch (err) {
		res.status(400).json({ message: "Error updating hero", error: err });
	}
};

// PATCH (update specific fields) an existing hero by ID
export const patchHero = async (req, res) => {
	try {
		const updatedHero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!updatedHero) {
			return res.status(404).json({ message: "Hero not found" });
		}
		res.status(200).json(updatedHero);
	} catch (err) {
		res.status(400).json({ message: "Error updating hero", error: err });
	}
};

// DELETE a hero by ID
export const deleteHero = async (req, res) => {
	try {
		const deletedHero = await Hero.findByIdAndDelete(req.params.id);
		if (!deletedHero) {
			return res.status(404).json({ message: "Hero not found" });
		}
		res.status(200).json({ message: "Hero deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: "Error deleting hero", error: err });
	}
};
