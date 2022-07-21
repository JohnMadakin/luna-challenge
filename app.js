const express = require('express');

const patientRankingSystem = require('./routes/v1');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Handle cases where invalid JSON data is passed
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    res.json({
      code: '1',
      message: `invalid JSON '${err.body}' passed`,
    });
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.json({ version: '1.0' });
});

const version = '/v1';

app.use(version, patientRankingSystem);

// Handle cases where no route is matched
app.use('*', (req, res) => {
  res.status(404).json({ code: 2, msg: `Unimplemented ${req.method} ${req.path} route access` });
});

module.exports = app;