//testing done
const express = require('express');
const router = express.Router();

//participant routes
const participantConroller= require('../Controllers/participantConroller');
router.post('/participant/enroll', participantConroller.enrollInAptitude);
router.post('/participant/answer', participantConroller.answerQuestion);
router.get('/participant/score/:id', participantConroller.calculateParticipantScore);
router.get('/participants', participantConroller.getAllParticipants);
router.get('/participants/:id', participantConroller.getParticipantById);

//user routes
const userController = require('../Controllers/userController');
router.post('/users/create', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController. getUserById);

module.exports = router;