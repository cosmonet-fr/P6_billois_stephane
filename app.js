console.log("run app.js");
const express = require('express');

const app = express();
const saucesRoutes = require('./routes/sauces.js');
const userRoutes = require('./routes/user.js');
const userModel = require('./models/userModel.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:RrPPSWkY8XZ8f3M@cluster0-kwmpf.mongodb.net/SoPekockoDb?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB Atlas réussie ! ʕ•ᴥ•ʔ'))
  .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));




app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;
