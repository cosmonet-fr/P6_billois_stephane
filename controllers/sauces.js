const saucesModel = require('../models/Sauce.js');
exports.createSauce = (req, res, next) => {
  const sauce = new Sauce({

  });
  console.log(req.body.sauce);
  sauce.save()
  .then(() => res.status(201).json({ message: 'Nouvelle sauce enregistrée dans la base de données !'}))
  .catch(error => res.status(400).json({ error }));
}
