//testing done
const express = require('express');
const router = express.Router();

//feedback routes
const feedbackController = require('../Controllers/feedbackController');
router.post('/feedbacks/create', feedbackController.createFeedback);
router.get('/feedbacks', feedbackController.getAllFeedback);
router.get('/feedbacks/show/:id', feedbackController.getFeedbackById);
router.put('/feedbacks/update/:id' , feedbackController.updateFeedbackById);
router.delete('/feedbacks/delete/:id', feedbackController.deleteFeedbackById);


module.exports = router;
