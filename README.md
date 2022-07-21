
#Luma-Challenge
## Description
Solution to People Joy backend task.
API url: https://getir-challenge-api.herokuapp.com


## Table of Contents

- [Documentation](#documentation)
- [Setup](#setup)
  - [Dependecies](#dependecies)
  - [Getting Started](#getting-started)
  - [Environmental Variables](#env-variable)
- [Testing](#testing)

## Documentation

https://documenter.getpostman.com/view/4919621/TVt17jGK

## Setup

### Dependencies

- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment
- [Express](https://github.com/expressjs/express) - A web application framework for NodeJS

### Getting Started

Follow these steps to set up the project in development mode

- Install [Nodejs](https://nodejs.org/en/download/)
- Clone the repository (See command below)

  ```[bash]
  git clone https://github.com/JohnMadakin/luna-challenge.git
  ```

- Run `cd luna-challenge` to enter the application's directory
- Install the application's dependencies by running the command
  ```
  npm install
  ```
- Create a `.env` file in the root of your directory using the `env.example` file in the repository
- Start the application by running
  ```
  npm run dev
  ```
  The application should now be running at `http://127.0.0.1:${port_number}`


### How to test
URL
`http://localhost:3000/v1/patients/waitlist`
Sample Request data
```
{
    "hospitalLocation": {
        "latitude": 12,
        "longitude": 1.3
    },
    "patientData": [
        {
        "id": "541d25c9-9500-4265-8967-240f44ecf723",
        "name": "Samir Pacocha",
        "location": {
            "latitude": "46.7110",
            "longitude": "-63.1150"
        },
        "age": 46,
        "acceptedOffers": 49,
        "canceledOffers": 92,
        "averageReplyTime": 2598
    }
    ]
}

```
## Testing

[Jest](https://jestjs.io) is used as the testing framework for both the unit tests.


```
  npm run test
```
