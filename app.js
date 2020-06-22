const express = require('express');

const app = express();

app.use((req, res) => {
  console.log("Message reçus !");
  res.json({ id: 1,
    userId: 1,
    name: "Pesto Rouge",
    manufacturer: "Pesto corp",
    description: "Le pesto est une préparation culinaire de Ligurie à base de basilic, de pignons de pin, d'huile d'olive, d'ail. Le basilic employé doit être du basilico genovese.",
    mainPepper: "Du gras",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/BasilPesto.JPG/1280px-BasilPesto.JPG",
    heat: 9,
    likes: 78,
    dislikes: 1,
    usersLiked: ["1", "200"],
    usersDisliked: ["9", "302"],
   })
});

module.exports = app;
