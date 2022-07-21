const express = require('express');
const patientHandler = require('./handlers/patientRankHandler');

const router = express.Router();

router.post('/patients/waitlist', patientHandler);

module.exports = router;