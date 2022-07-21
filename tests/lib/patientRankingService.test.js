const {  roundDecimals, calDistance, scoreBandRunner,  fetchRespondTimeScore,
  fetchAgeScore,
  fetchAcceptedOfferScore,
  fetchCancelOfferScore,
  processPatientScores, 
  fetchDistanceScore,
  patientService,
 } = require('../../lib/patientRankingService');

describe('patient Service - Unit Test', () => {
  describe('roundDecimals', () => {
    it('should round a floating number to 2 decimal points', () => {
      const result = roundDecimals(2.333434345788, 2);
      expect(result).toEqual(2.33);
    });

    it('should accurately round 1.005 to 2 decimal points', () => {
      const result = roundDecimals(1.005, 2);
      expect(result).toEqual(1.01);
    });
    it('should leave integers untouched', () => {
      const result = roundDecimals(10, 2);
      expect(result).toEqual(10);
    });
  });

  describe('calDistance', () => {
    it('should return 0 if coordinates are the same', () => {
      const result = calDistance(12, 40.34, 12, 40.34);
      expect(result).toEqual(0);
    });
    it('should return distance in miles if coordinates are diffrent', () => {
      const result = calDistance(12, 40.34, 72, 123);
      expect(result).toEqual(5273.55);
    });
    it('should return distance in miles if coordinates are diffrent', () => {
      const result = calDistance(2.3, 178, 2, 179);
      expect(result).toEqual(72.09);
    });

  });

  describe('fetchAgeScore', () => {
    it('should return a score of 80 if age is between 15 and 25', () => {
      const result = fetchAgeScore(17);
      expect(result).toEqual(80);
    });

    it('should return a score of 1 if age is above 120', () => {
      const result = fetchAgeScore(125);
      expect(result).toEqual(1);
    });
  });

  describe('fetchRespondTimeScore', () => {
    it('should return a score greater than 79 if no response time was passed', () => {
      const result = fetchRespondTimeScore();
      expect(result > 79).toBeTruthy();
    });
    it('should return a score of 60 if respondTime is within 1000 and 1999secs', () => {
      const result = fetchRespondTimeScore(1020);
      expect(result).toEqual(60);
    });
  });

  describe('fetchAcceptedOfferScore', () => {
    it('should return a score greater than 39 if no acceptedOffer was passed', () => {
      const result = fetchAcceptedOfferScore();
      expect(result > 39).toBeTruthy();
    });

    it('should return a score of 90 if accepted offer count was within 90 and 99', () => {
      const result = fetchAcceptedOfferScore(92);
      expect(result).toEqual(90);
    });
  });

  describe('fetchCancelOfferScore', () => {
    it('should return a score greater than 79 if no cancel offer count was passed', () => {
      const result = fetchCancelOfferScore();
      expect(result > 79).toBeTruthy();
    });

    it('should return a score of 30 if cancel offer count was with 60 and 79', () => {
      const result = fetchCancelOfferScore(63);
      expect(result).toEqual(30);
    });
  });

  describe('fetchDistanceScore', () => {
    it('should return a score of 1 if distance is greater than 100miles', () => {
      const result = fetchDistanceScore({ hospitalLong: 1.3, hostpitalLat: 12 }, -63.1150, 46.7110);
      expect(result).toEqual(1);
    });

    it('should return a score of 20 if distance is within 50 and 99.99 miles', () => {
      const result = fetchDistanceScore({ hospitalLong: 178, hostpitalLat: 2.3 }, 179, 2);
      expect(result).toEqual(20);
    });
  });

  describe('scoreBandRunner', () => {
    const ageScoreBand = [
      { min: 0, max: 14, score: 100 },
      { min: 15, max: 25, score: 80 },
      { min: 26, max: 60, score: 50 },
      { min: 61, max: 80, score: 20 },
      { min: 81, max: 'infinity', score: 1 },
    ];
    it('should return a score of 100 if age is within the first band', () => {
      const result = scoreBandRunner(12, ageScoreBand);
      expect(result).toEqual(100);
    });
    it('should return a score of 80 if age is within the second band', () => {
      const result = scoreBandRunner(23, ageScoreBand);
      expect(result).toEqual(80);
    });
    it('should return a score of 50 if age is within the third band', () => {
      const result = scoreBandRunner(57, ageScoreBand);
      expect(result).toEqual(50);
    });
    it('should return a score of 20 if age is within the fourth band', () => {
      const result = scoreBandRunner(77, ageScoreBand);
      expect(result).toEqual(20);
    });
    it('should return a score of 1 if age is within the last band', () => {
      const result = scoreBandRunner(86, ageScoreBand);
      expect(result).toEqual(1);
    });

  });
});