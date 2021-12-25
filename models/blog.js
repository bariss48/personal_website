const { text } = require("body-parser");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
     title:String,
     intro:String,
     description: String,
     description_2: String,
     code: String,
     code_2: String,
     read_min: String,
     author: String,
     github_link: String,
     pdf_link: String,
     date: Date,
     genre: String,
     image_link: String,
     owner:{
          id:{
             type: mongoose.Schema.Types.ObjectId,
             ref: "User" 
          },
          username: String
     },
     upvotes: [String],
     downvotes: [String]
});

blogSchema.index({
     '$**': 'text'
});

module.exports = mongoose.model("blog",blogSchema);