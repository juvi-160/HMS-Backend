const mongoose = require("mongoose");

// Define the Question schema
const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
});

// Define the Aptitude schema
const aptitudeSchema = new mongoose.Schema({
    aptitudeName: {
        type: String,
        required: true
    },
    aptitudeId: {
        type: String,
        required: true,
        unique: true // Ensure aptitudeId is unique
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    description: {
        type: String,
        required: true
    },
    skillsRequired: {
        type: [String],
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    },
    participantsEligibilityCriteria: {
        type: String,
        required: true
    },
    additionalNotes: {
        type: String
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        required: true
    }
});

const Question = mongoose.model("Question", questionSchema);
const Aptitude = mongoose.model("Aptitude", aptitudeSchema);

module.exports = { Question, Aptitude };
