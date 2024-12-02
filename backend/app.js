const express = require('express');
const mongoose = require('mongoose');
const Test = require('./models/Test');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/api/quiz', async (req, res) => {
	try {
		const test = await Test.findOne();
		if (!test) {
			return res.status(404).json({ message: 'Quiz not found' });
		}
		res.json(test);
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

app.put('/api/quiz', async (req, res) => {
	try {
		const test = await Test.findOne();
		if (!test) {
			return res.status(404).json({ message: 'Quiz not found' });
		}

		test.questions = req.body.questions;
		await test.save();

		res.json(test);
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

mongoose
	.connect('mongodb+srv://stakrotsky:RsWAqS5ueibdLrKa@cluster0.7tzap.mongodb.net/quiz')
	.then(() => {
		app.listen(port, () => {
			console.log(`Server started on port ${port}`);
		});
	});
