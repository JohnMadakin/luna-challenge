
#Luma-Challenge
## Description
Solution to People Joy backend task.

### Dependencies

- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment
- Joi Library for validation
### Getting Started

Follow these steps to set up the project in development mode

- Install [Nodejs](https://nodejs.org/en/download/), v14 or greater
- Clone the repository (See command below)

  ```[bash]
  git clone https://github.com/JohnMadakin/luna-challenge.git
  ```

- Run `cd luna-challenge` to enter the application's directory
- Install the application's dependencies by running the command
  ```
  npm install
  ```

### How to use
- import PatientRanking library
```
const patientRanking = require('./index');

```
- call the getPatient method to fetch ranked patients

```

console.log('🔥', patientRanking.getPatients({
  "latitude": 12,
  "longitude": 1.3
}));

```
## Testing

[Jest](https://jestjs.io) is used as the testing framework for both the unit tests.

```
  npm run test
```
