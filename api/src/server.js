require('dotenv').config();

const app = require('./app');

const port = Number(process.env.API_PORT || 3000);

app.listen(port, '0.0.0.0', () => {
  console.log(`TrainShop API démarrée sur le port ${port}`);
});
