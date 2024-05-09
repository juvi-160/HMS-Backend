const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
    {
        username: { 
                type: String, 
                ref: "User", 
                required: true 
        },
        aptitudeId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Aptitude",
            required:true,
        },
        enrolledAt: {
            type:Date,
            default: Date.now
        },
        answers: [{
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question', // Reference to the Question model
                required: true
            },
            chosenAnswer: {
                type: String,
                required: true
            }
        }],
        score: {
            type: Number,
            default: 0
        }

  },
);

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant