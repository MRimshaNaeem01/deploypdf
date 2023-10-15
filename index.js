// server.js
const express = require('express');
const mongoose = require('mongoose');

const dotenv = require("dotenv");
const cors = require('cors');
const { MONGOURL } = require('./config/keys')


dotenv.config();
const app = express();

const corsOptions = {
  origin: 'https://deploypdf-d18m.vercel.app',
};

app.use(cors(corsOptions));
app.use(express.json());


mongoose.connect(MONGOURL)
  .then(() => console.log("DB connection successfully!"))

  .catch((err) => {
    console.log(err);
  });

const apiRoute = require('./routes/api');
app.use('/api', apiRoute);

// if(process.env.API_PORT){
//   app.listen(process.env.API_PORT)
// }

if (process.env.NODE_ENV == 'production') {
  const path = require('path')

  app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'frontend', 'build')))
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))

  })
}

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
