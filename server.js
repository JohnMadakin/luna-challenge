const app = require('./app');

const { port } = require('./config/app');

function startApp() {
  app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
  });
}

startApp();
