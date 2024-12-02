const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
	text: { type: String, required: true },
	isCorrect: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema({
	text: { type: String, required: true },
	answers: [answerSchema],
});

const testSchema = new mongoose.Schema({
	questions: [questionSchema],
});

module.exports = mongoose.model('Test', testSchema);
