const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    testId: {
        type: String,
        required: true,
      },
      defaultInput: {
        type: String,
        required: true,
      },
      expectedOutput: {
        type: String,
        required: true,
      },
});

const contestSchema = new mongoose.Schema({
    contestId:{
        type:String,
        required: true,
        unique: true,
    },
    contestName:{
        type:String,
        required: true,
        unique: true,
    }, 
    tests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Test'
    }],
    description: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    }, 
    skillsRequired: {
        type:[String],
        required: true,
    },
    duration:{
        type: String,
        required:true,
    },
    // participants:[ {  
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Participant"
    // }],
    startDateTime:{
        type: Date,
        required:true,
    },
    endDateTime:{
        type:Date,
        required: true,
    },
    points:{
        type: String,
    },
    prizesAndRewards: {
        type: [String], // Assuming multiple prizes and rewards can be provided
        required: true,
    },
    rulesAndGuidelines: {
        type: String,
        required: true,
    },
    participantsEligibilityCriteria: {
        type: String,
        required: true,
    },
    // totalParticipants: {
    //     type: Number,
    //     required: true,
    // },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'], // Contest status
        required: true,
    }

});


const Contest = mongoose.model('Contest', contestSchema);
const Test = mongoose.model('Test', testSchema);

module.exports = {
    Contest,
    Test
};