const express = require('express');
const router = express.Router();

//contest
const contestController = require('../Controllers/contestController');
//create
router.post('/contests/create', contestController.createContest);
//get all contest
router.get('/contests', contestController.getAllContests);
//get by id
router.get('/contests/show/:id', contestController.getContestById);
//update
router.put('/contests/update/:id', contestController.updateContestById);
//delete
router.delete('/contests/delete/:id', contestController.deleteContestById);


//aptitudes
const aptitudeController = require('../Controllers/aptitudeController');
//create
router.post('/aptitudes/create', aptitudeController.createAptitude);
//get all Aptitude
router.get('/aptitudes', aptitudeController.getAllAptitudes);
//get by id
router.get('/aptitudes/show/:id', aptitudeController.getAptitudeById);
//update
router.put('/aptitudes/update/:id', aptitudeController.updateAptitudeById);
//delete
router.delete('/aptitudes/delete/:id', aptitudeController.deleteAptitudeById);

module.exports = router;