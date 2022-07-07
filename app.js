//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Hello!! and welcome everybody, this is Srijan a Film-lover, with some experience in the art of film making and a wannabe Film-critic . Want some crisp-concise film reviews?.. Well well you have come to the right place . I'll be presenting before you my honest revies and feelings of the films that I watch below here in the blog , if you want me to do a review of a film of your interest you can mail me on the email given in the contact page. I hope you have a nice time as a reader , because I can assure you that I am having a nice time as a movie reviewer (watching movies is my job guys🤪🤪)";
const aboutContent = "Film criticism is the analysis and evaluation of films and the film medium. In general, film criticism can be divided into two categories: journalistic criticism which appears regularly in newspapers, magazines and other popular mass-media outlets; and academic criticism by film scholars who are informed by film theory and are published in academic journals. Academic film criticism rarely takes the form of a review; instead it is more likely to analyse the film and its place within the history of its genre, or the whole of film history.  My revies somewhere lie between these two types , a bit professional a bit unprofessional , so that in a way I write logical things that can oscillate with my general viewers .";
const contactContent = "To contact me!! you can write me a mail on srijanpandey0104@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
