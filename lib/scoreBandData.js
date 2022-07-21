  
module.exports = {
  respondTimeScoreBand: [
    { min: 0, max: 499, score: 100 },
    { min: 500, max: 999, score: 80 },
    { min: 1000, max: 1999, score: 60 },
    { min: 2000, max: 2999, score: 40 },
    { min: 3000, max: 3999, score: 20 },
    { min: 4000, max: 'infinity', score: 1 },
  ],
  cancelOffersBand: [
    { min: 0, max: 9, score: 100 },
    { min: 10, max: 19, score: 80 },
    { min: 20, max: 39, score: 70 },
    { min: 40, max: 59, score: 50 },
    { min: 60, max: 79, score: 30 },
    { min: 70, max: 89, score: 20 },
    { min: 90, max: 99, score: 10 },
    { min: 100, max: 'infinity', score: 5 },
  ],
  acceptedOffersBand: [
    { min: 0, max: 9, score: 10 },
    { min: 10, max: 19, score: 20 },
    { min: 20, max: 39, score: 30 },
    { min: 40, max: 59, score: 40 },
    { min: 60, max: 69, score: 60 },
    { min: 70, max: 89, score: 80 },
    { min: 90, max: 99, score: 90 },
    { min: 101, max: 'infinity', score: 100 },
  ],
  ageScoreBand: [
    { min: 0, max: 14, score: 100 },
    { min: 15, max: 25, score: 80 },
    { min: 26, max: 60, score: 40 },
    { min: 61, max: 80, score: 20 },
    { min: 81, max: 'infinity', score: 1 },
  ],
  distanceScoreBand: [
    { min: 0, max: 0.99, score: 100 },
    { min: 1, max: 4.99, score: 80 },
    { min: 5, max: 19.99, score: 60 },
    { min: 20, max: 49.99, score: 40 },
    { min: 50, max: 99.99, score: 20 },
    { min: 100, max: 'infinity', score: 1 },
  ]
}

