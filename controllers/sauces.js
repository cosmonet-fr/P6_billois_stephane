const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {

  //console.log(req);
  const sauce = new Sauce({
    name: req.body.name
  });
  console.log(req);
  sauce.save()
  .then(() => res.status(201).json({ message: 'Nouvelle sauce enregistrée dans la base de données !'}))
  .catch(error => res.status(400).json({ error }));

}
