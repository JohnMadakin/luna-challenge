const patientData = require('./data/patients.json');
const PatientRanking = require('./lib/patientRankingService');


module.exports = new PatientRanking(patientData);
