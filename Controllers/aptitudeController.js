const { Aptitude, Question } = require('../Models/aptitudeModel');
const { v4: uuidv4 } = require('uuid');


// Create a new Aptitude
const createAptitude = async (req, res) => {
    try {
        const {
            aptitudeId,
            aptitudeName,
            description,
            skillsRequired,
            duration,
            startDateTime,
            endDateTime,
            participantsEligibilityCriteria,
            additionalNotes,
            status,
            questions 
        } = req.body;

        // Create new questions and save their IDs
        const questionIds = [];
        for (const questionData of questions) {
            const { questionText, options, correctAnswer } = questionData;
            const question = new Question({ questionText, options, correctAnswer });
            await question.save();
            questionIds.push(question._id);
        }

        const uniqueAptitudeId = aptitudeId || uuidv4();

        // Create new Aptitude 
        const aptitude = new Aptitude({
            aptitudeId: uniqueAptitudeId,
            aptitudeName,
            description,
            skillsRequired,
            duration,
            startDateTime,
            endDateTime,
            participantsEligibilityCriteria,
            additionalNotes,
            status,
            questions: questionIds 
        });

        await aptitude.save();
        res.status(201).json({ message: "Aptitude Test Created!!", aptitude });
    } catch (error) {
        console.error("Error creating aptitude:", error);
        res.status(500).json({ error: "Failed to create aptitude" });
    }
};

// Get all Aptitudes
const getAllAptitudes = async (req, res) => {
    try {
        const aptitudes = await Aptitude.find();
        res.status(200).json(aptitudes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Aptitude by ID
const getAptitudeById = async (req, res) => {
    try {
        const aptitude = await Aptitude.findById(req.params.id).populate('questions');
        if (!aptitude) {
            return res.status(404).json({ error: 'Aptitude not found' });
        }
        res.status(200).json(aptitude);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Aptitude by ID
const updateAptitudeById = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const aptitude = await Aptitude.findById(id);
        if (!aptitude) {
            return res.status(404).json({ error: "Aptitude not found" });
        }
        if (updateFields.questions && Array.isArray(updateFields.questions)) {
            aptitude.questions = updateFields.questions;
        }

        await aptitude.save();
        res.status(200).json({ message: "Aptitude updated successfully", aptitude });
    } catch (error) {
        console.error("Error updating aptitude:", error);
        res.status(500).json({ error: "Failed to update aptitude" });
    }
};

// Delete Aptitude by ID
const deleteAptitudeById = async (req, res) => {
    try {
        const deletedAptitude = await Aptitude.findByIdAndDelete(req.params.id);
        if (!deletedAptitude) {
            return res.status(404).json({ error: 'Aptitude not found' });
        }
        res.status(200).json({ message: "Aptitude deleted successfully", deletedAptitude });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAptitude,
    getAllAptitudes,
    getAptitudeById,
    updateAptitudeById,
    deleteAptitudeById
};
