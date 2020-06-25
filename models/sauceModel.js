console.log("run sauceModel.js");
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true},
  name: { type: String, required: true,  unique:true },
  manufacturer: { type: String, required: true },
  description: { type: String },
  mainPepper: { type: String },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: String, },
  usersLiked: [{ type: String, required: false }],
  usersDisliked: [{ type: String, required: false }]
});


sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauces', sauceSchema);
