const Feedback = require('../Models/feedbackModel');

// Create feedback
const createFeedback = async (req, res) => {
    try {
        const { userId, rating, comment } = req.body;
        const feedback = new Feedback({ userId, rating, comment });
        await feedback.save();
        res.status(201).json({ message: 'Feedback created successfully', feedback });
    } catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ error: 'Failed to create feedback' });
    }
};

const getAllFeedback = async (req,res) => {
    try {
        const feedback = await Feedback.find();
        res.status(200).json(feedback);
    } catch(error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Failed to fetch feedback '});
    }
};

const getFeedbackById = async (req,res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        console.error('Error fetching feedback by ID:', error);
        res.status(500).json({ error: 'Failed to fetch feedback' });
    }
};
// Update feedback by ID
const updateFeedbackById = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        // Update specific fields of the feedback document
        Object.assign(feedback, updateFields);
        await feedback.save();

        res.status(200).json({ message: 'Feedback updated successfully', feedback });
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).json({ error: 'Failed to update feedback' });
    }
};

const deleteFeedbackById = async (req, res) => {
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!deletedFeedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json({ message: 'Feedback deleted successfully', deletedFeedback });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ error: 'Failed to delete feedback' });
    }
};

module.exports = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateFeedbackById,
    deleteFeedbackById
};