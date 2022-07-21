const SuccessResponse = require('../../../helpers/successResponse');
const BadRequestResponse = require('../../../helpers/badRequestResponse');
const { patientService } = require('../../../lib/patientRankingService');

async function patientRank(req, res) {
  try {
    const result = await patientService(req.body);
    new SuccessResponse('Success', result, 200).send(res);
  } catch (error) {
    new BadRequestResponse(error.message).send(res);
  }
}

module.exports = patientRank;