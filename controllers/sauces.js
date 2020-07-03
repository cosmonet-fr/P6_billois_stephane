const Sauce = require('../models/Sauce');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
  console.log(req.body.sauce);
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  sauce.save()
  .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
  .catch(error => res.status(400).json({error}));
};


exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

exports.likeOrDislikeSauce = (req, res, next) => {

  const likeStatus = req.body.like;
  const userId = req.body.userId;
  const thisSauceId = req.params.id;
  Sauce.findOne({ _id: req.params.id }).then(sauce => {

    console.log(sauce.usersLiked);


    if (likeStatus === 1) {
      console.log(userId+' aime cette sauce.');
      Sauce.updateOne(
        { _id: thisSauceId },
        {$push: { usersLiked: userId }, $inc: { likes: +1 },}
      )
      .then(() => res.status(200).json({ message: 'Vous aimez cette sauce. (^-^) ' }))
      .catch((error) => res.status(400).json({ error }))


    }

    if (likeStatus === -1) {
      console.log('Vous n\'aimez pas cette sauce.');
      Sauce.updateOne(
        { _id: thisSauceId },
        {$push: { usersDisliked: userId }, $inc: { dislikes: +1 },}
      )
      .then(() => res.status(200).json({ message: 'Vous n\'aimez pas cette sauce. :-( ' }))
      .catch((error) => res.status(400).json({ error }))
    }

    if (likeStatus === 0) {
      console.log('Vous annulez votre j\'aime ou j\'aime pas.');
      const ind = sauce.usersLiked.indexOf(userId);
      if (ind > -1) {
        sauce.usersLiked.slice(ind, 1);
        Sauce.updateOne(
          { _id: thisSauceId },
          {$push: { usersLiked: {$each: [ ], $slice: ind} }, $inc: { likes: -1 },}

        )
        .then(() => res.status(200).json({ message: ' ' }))
        .catch((error) => res.status(400).json({ error }))
      } else if (ind === -1) {
        const indDisliked = sauce.usersDisliked.indexOf(userId);
        sauce.usersDisliked.slice(indDisliked, 1);
        Sauce.updateOne(
          { _id: thisSauceId },
          {$push: { usersDisliked: {$each: [ ], $slice: indDisliked} }, $inc: { dislikes: -1 },}

        )
        .then(() => res.status(200).json({ message: ' ' }))
        .catch((error) => res.status(400).json({ error }))
      }
    }

  });

}
// Si indexOf === -1 ou null Alors passer sur array Dislike sinon supr "ind"
