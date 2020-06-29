console.log("run app.js");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const saucesRoutes = require('./routes/sauces.js');
const userRoutes = require('./routes/user.js');
const saucesModel = require('./models/Sauce.js');
//const userModel = require('./models/User.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:tKJqYv45KCrZYqq@cluster0-uga9w.mongodb.net/data?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB Atlas réussie ! ʕ•ᴥ•ʔ'))
  .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/api/sauces', (req, res, next) => {
  saucesModel.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/sauces/:id', (req, res, next) => {
  saucesModel.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});




app.use(bodyParser.json());

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;
