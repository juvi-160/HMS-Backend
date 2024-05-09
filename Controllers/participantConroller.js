const Participant = require('../Models/participantModel');
const { Aptitude, Question} = require('../Models/aptitudeModel')

// Enroll in an Aptitude
const enrollInAptitude = async (req, res) => {
    try {
        const { username, aptitudeId } = req.body;

        // Check if the aptitude exists
        const aptitude = await Aptitude.findById(aptitudeId);
        if (!aptitude) {
            return res.status(404).json({ error: 'Aptitude not found' });
        }

        // Create a new participant
        const participant = new Participant({ username, aptitudeId });
        await participant.save();

        res.status(201).json({ message: 'Enrolled in aptitude successfully', participant });
    } catch (error) {
        console.error('Error enrolling in aptitude:', error);
        res.status(500).json({ error: 'Failed to enroll in aptitude' });
    }
};

// Answer a Question in an Aptitude
const answerQuestion = async (req, res) => {
    try {
        const { participantId, questionId, chosenAnswer } = req.body;

        // Find the participant
        const participant = await Participant.findById(participantId);
        if (!participant) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        // Add the answer to the participant's answers array
        participant.answers.push({ questionId, chosenAnswer });
        await participant.save();

        res.status(200).json({ message: 'Answer submitted successfully' });
    } catch (error) {
        console.error('Error answering question:', error);
        res.status(500).json({ error: 'Failed to submit answer' });
    }
};

// Calculate Participant Score
const calculateParticipantScore = async (req, res) => {
    try {
        const { id } = req.params; // Extract participant ID from request parameters
        const participant = await Participant.findById(id);

        if (!participant) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        let score = 0;
        for (const answer of participant.answers) {
            const question = await Question.findById(answer.questionId);
            if (question && question.correctAnswer === answer.chosenAnswer) { // Use correctAnswer to compare
                score++;
            }
        }

        // Update participant's score
        participant.score = score;
        await participant.save();

        res.status(200).json({ message: 'Score calculated successfully', score });
    } catch (error) {
        console.error('Error calculating participant score:', error);
        res.status(500).json({ error: 'Failed to calculate score' });
    }
};


const getAllParticipants = async (req, res) => {
    try {
        const participants = await Participant.find();
        res.status(200).json(participants);
    } catch (error) {
        console.error('Error fetching participants:', error);
        res.status(500).json({ error: 'Failed to fetch participants' });
    }
};

const getParticipantById = async (req, res) => {
    try {
        const { id } = req.params; // Extract participant ID from request parameters
        const participant = await Participant.findById(id);

        if (!participant) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        res.status(200).json(participant);
    } catch (error) {
        console.error('Error fetching participant by ID:', error);
        res.status(500).json({ error: 'Failed to fetch participant' });
    }
};


module.exports = {
    enrollInAptitude,
    answerQuestion,
    calculateParticipantScore,
    getAllParticipants,
    getParticipantById,
};