const { Contest, Test } = require('../Models/contestModel');
const { v4: uuidv4 } = require('uuid');

// Create a new contest
const createContest = async (req, res) => {
    try{
        const{
           contestId,
           contestName,
           description,
           domain,
           skillsRequired,
           duration,
           startDateTime,
           endDateTime,
           points,
           prizesAndRewards,
           rulesAndGuidelines,
           participantsEligibilityCriteria,
           status,
           tests
        } = req.body;

        //test
        const testIds = [];
        for (const testData of tests) {
            const { testId, defaultInput, expectedOutput} = testData;
            const test = new Test({ testId, defaultInput, expectedOutput });
            await test.save();
            testIds.push(test._id);
        }

        const uniqueContestId = contestId || uuidv4();

        //create new contest
        const contest = new Contest ({
            contestId : uniqueContestId ,
            contestName,
            description,
            domain,
            skillsRequired,
            duration,
            startDateTime,
            endDateTime,
            points,
            prizesAndRewards,
            rulesAndGuidelines,
            participantsEligibilityCriteria,
            tests:testIds,
            status: status || 'upcoming',
        });
        await contest.save();
        res.status(201).json({ Message: "Contest Created!!", contest});
    }catch(error) {
        console.error("Error creating contest:", error);
        res.status(500).json({ error: "Failed to create contest" });
    }
};

// Get all contests
const getAllContests = async (req, res) => {
    try {
        const contests = await Contest.find();
        res.status(200).json(contests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get contest by ID
const getContestById = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id).populate('tests');
        if (!contest) {
            return res.status(404).json({ error: 'Contest not found' });
        }
        res.status(200).json(contest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update contest by ID
const updateContestById = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const contest = await Contest.findById(id);
        if (!contest) {
            return res.status(404).json({ error: "Contest not found" });
        }

        // Update contest fields
        Object.assign(contest, updateFields);
        // await contest.save();

        // Update tests referenced by the contest
        if (updateFields.tests && Array.isArray(updateFields.tests)) {
            const validTestIds = [];
            for (const testData of updateFields.tests) {
                const { testId } = testData;
                const test = await Test.findOne({ testId }); // Find the Test document by testId
                if (test) {
                    validTestIds.push(test._id);
                }
            }
            contest.tests = validTestIds; // Assign valid test ObjectId references to the contest
        }
        await contest.save();
        res.status(200).json({ message: "Contest updated successfully", contest });
    } catch (error) {
        console.error("Error updating Contest:", error);
        res.status(500).json({ error: "Failed to update Contest" });
    }
};

// Delete contest by ID
const deleteContestById = async (req, res) => {
    try {
        const deletedContest = await Contest.findByIdAndDelete(req.params.id);
        if (!deletedContest) {
            return res.status(404).json({ error: 'Contest not found' });
        }
        res.status(200).json({ message: "Contest deleted successfully", deletedContest });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createContest,
    getAllContests,
    getContestById,
    updateContestById,
    deleteContestById
};