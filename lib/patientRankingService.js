const joi = require('joi');
const validateSpec = require('../helpers/specValidator');
const { 
  respondTimeScoreBand, acceptedOffersBand,
  ageScoreBand, cancelOffersBand, 
  distanceScoreBand 
} = require('./scoreBandData');

const spec =  joi.object({
  hospitalLocation: joi.object({
    latitude: joi.number().required(),
    longitude: joi.number().required(),  
  }).required(),
  patientData: joi.array().items(joi.object()).required(),
});


 function patientService (data) {
  const { patientData, hospitalLocation: { latitude, longitude } } = validateSpec(spec, data);

    return patientData.map(patientItem => {
      patientItem.hospitalLocation = {
            hospitalLong: longitude,
            hostpitalLat: latitude,
        };
        return processPatientScores(patientItem);
    }).sort((a,b) => b.patientScore - a.patientScore).slice(0, 10);
}

function processPatientScores(params) {
    const ageScore = fetchAgeScore(params.age);
    const acceptedOfferScore = fetchAcceptedOfferScore(params.acceptedOffers);
    const cancelScore = fetchCancelOfferScore(params.canceledOffers);
    const distanceScore = fetchDistanceScore(params.hospitalLocation, params.location.latitude, params.location.longitude);
    const responseTimeScore = fetchRespondTimeScore(params.averageReplyTime);

    const totalScore = responseTimeScore * 0.02 + distanceScore * 0.01 + cancelScore * 0.03 + acceptedOfferScore * 0.03 + ageScore * 0.01;
    return {
      name: params.name,
      patientScore: roundDecimals(totalScore, 2),
    }
}

function roundDecimals(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function scoreBandRunner(value, bands) {
    let result = null;
    for (let band of bands) {
      let max_amount = band.max;
      let min_amount = band.min;
      if (band.min === 0) {
        if (value <= max_amount) {
          result = band.score;
          break;
        }
      } else if (band.max === 'infinity') {
        if (value > min_amount) {
          result = band.score;
          break;
        }
      } else {
        min_amount = band.min;
        max_amount = band.max;
        if (min_amount < value && value <= max_amount) {
          result = band.score;
          break;
        }
      }
    }
  
    return result;
  }

function fetchDistanceScore(hostpitalLocation, long, lat) {
    const { hospitalLong, hostpitalLat } = hostpitalLocation;

    const distance = calDistance(hostpitalLat, hospitalLong, lat, long);

    return scoreBandRunner(distance, distanceScoreBand);
 }

function calDistance(lat1, long1, lat2, long2) {
  if ((lat1 == lat2) && (long1 == long2)) {
      return 0;
  }
  else {
      const radlat1 = Math.PI * lat1/180;
      const radlat2 = Math.PI * lat2/180;
      const theta = long1 - long2;
      const radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
          dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515; // converts to miles

      return roundDecimals(dist, 2);
  }
}

function fetchCancelOfferScore(cancelOffersNum) {
  // if number of canceled appointment is not available
  // assign a random low cancelnumber.
  if(cancelOffersNum !== 0 && !cancelOffersNum) {
    cancelOffersNum = getRandomNumber(2, 20);
  }
  return scoreBandRunner(cancelOffersNum, cancelOffersBand);
}

function fetchAcceptedOfferScore(acceptedOfferCount) {
  // if number of accepted appointment is not available
  // assign a random low acceptednumber.
  if(acceptedOfferCount !== 0 && !acceptedOfferCount) {
    acceptedOfferCount = getRandomNumber(50, 100);
  }

  return scoreBandRunner(acceptedOfferCount, acceptedOffersBand);
}

function fetchAgeScore(age) {
  return scoreBandRunner(age, ageScoreBand);
}

function fetchRespondTimeScore(responsetime) {
  // if number of responsetime appointment is not available
  // assign a random low responsetime.
  if(responsetime !== 0 && !responsetime) {
    responsetime = getRandomNumber(100, 1000);
  }

  return scoreBandRunner(responsetime, respondTimeScoreBand);
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
  fetchRespondTimeScore,
  fetchAgeScore,
  fetchAcceptedOfferScore,
  fetchCancelOfferScore,
  processPatientScores, 
  roundDecimals, 
  scoreBandRunner,
  fetchDistanceScore,
  calDistance,
  patientService,
}
