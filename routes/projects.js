const express = require('express');
const router = express.Router({mergeParams: true});
const Project = require('../models/project');
const isLoggedIn = require('../utils/isLoggedIn');

router.get("/", async (req,res) => {
    console.log(req.user);
    try{
        const projects = await Project.find().exec();
        res.render("projects",{projects});
    }catch(err){
        console.log(err);
        res.send("hata hata");
    }
})

router.post("/",isLoggedIn, async (req,res) => {
    const newProject = {
        title: req.body.title,
        intro: req.body.intro,
        description: req.body.description,
        author:req.body.author,
        date:req.body.date,
        genre: req.body.genre,
        image_link: req.body.image_link,
    } 
     try {
      const project = await Project.create(newProject);
      res.redirect("/projects/"+ project._id);
    } catch (err) {
        res.redirect("/projects");
        console.log(err);
    }
})


router.get('/new', isLoggedIn,(req,res) => {
    res.render('new_project');
})


router.get("/:id", async (req,res) => {
    try {
       const project = await Project.findById(req.params.id).exec();
       res.render("project_content",{project})
    } catch (err) {
        console.log(err);
        res.send("hata!");
    }
    })


router.get("/:id/edit",isLoggedIn, async (req,res) => {
    try {
        const project = await Project.findById(req.params.id).exec();
        res.render("project_edit.ejs",{project})
    } catch (err) {
        console.log(err);
        res.send("hata!");
    }
})
//EDIT
router.post("/:id/edit", async (req,res) => {
    try {
        const project = await Project.findById(req.params.id).exec();
        res.render("project_edit",{project});
    } catch (err) {
        console.log(err);
        res.send("hata");
    }
       // try {
       //     const comic = await Comic.findById(req.params.id).exec();
       //     res.render("comics_edit",{comic});
       // } catch (err) {
       //     console.log(err);
       //     res.send("hata");
       // }
    })

    router.put('/:id', isLoggedIn,async (req, res) => {
        const genre = req.body.genre.toLowerCase();
        const projectBody = {
            title: req.body.title,
            intro: req.body.intro,
            description: req.body.description,
            author:req.body.author,
            date:req.body.date,
            genre,
            image_link: req.body.image_link
        }
        try {
          const project = await Project.findByIdAndUpdate(req.params.id, projectBody, {new: true}).exec();
          //req.flash("success", "blog updated");
          res.redirect(`/projects/${req.params.id}`);
        } catch (err) {
            console.log(err);
          //  req.flash("error", "Error not update!");
            res.redirect("/projects");
        }
  })

//delete blog
router.delete("/:id",isLoggedIn,async (req, res) => {
    try {
        const deletedComic = await Project.findByIdAndDelete(req.params.id).exec();
         res.redirect("/projects");   
    } catch (err) {
        console.log(err);
        res.send("hata hata");
    }
})
/*
router.get("/search", async (req,res) => {
    try{
        const blogs = await Blog.find({
            $text: {
                $search: req.query.term
            }
        });
        res.render("blog", {blogs});
    }catch(err){
        console.log(err);
      res.send("hata");
    }
})
*/

//genre kategori
/*
router.get("/genre/:genre", async (req,res) => {
// check if the given genre is valid
const validGenres = ["Software","Computer Science","JavaScript","Java","Just Chatting"];
if ( validGenres.includes(req.params.genre.toLocaleLowerCase())){
     const blogs = await Blog.find({genre: req.params.genre}).exec();
     res.render("blog",{blogs});
}else{
    res.send("Please enter valid genre");
}

});
*/
// if yes go
// if no send an error

module.exports = router;