console.log("run app.js");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const saucesRoutes = require('./routes/sauces.js');
const saucesModel = require('./models/sauceModel.js');
const userRoutes = require('./routes/user.js');
//const userModel = require('./models/userModel.js');
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

app.post('/api/test', (req, res, next) => {
  delete req.body._id;
  const sauce = new saucesModel({
    ...req.body
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});


app.use(bodyParser.json());

//app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;
