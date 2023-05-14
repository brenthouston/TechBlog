const express = require('express');
const router = express.Router();
const {Post,User} = require('../models');

router.get("/",(req,res)=>{
    Post.findAll({
        include:[User]
    }).then(postData=>{
        const hbsData = postData.map(post=>post.get({plain:true}));
        console.log(hbsData);
        res.render("home",{
            allPosts:hbsData,
            logged_in: req.session.logged_in,
        })
    })
})

// router.get("/post/:id",(req,res)=>{
//     Post.findByPk(req.params.id,{
//         include:[User]
//     }).then(postData=>{
//         const hbsData = postData.get({plain:true});
//         hbsData.logged_id=req.session.logged_id
//         console.log(hbsData);
//         res.render("singlePost",hbsData)
//     })
// })

router.get ('/signup',(req,res)=>{
    if(req.session.logged_in){
        return res.redirect('/profile')
    }
    res.render('signup',{
        logged_in:req.session.logged_in,
    })
})

router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        return res.redirect("/profile")
    }
    res.render("login",{
        logged_in:req.session.logged_in,

    })
})

router.get("/profile",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    } else {
        User.findByPk(req.session.user_id,{
            include:[Post]
        }).then(userData=>{
            const hbsData = userData.get({plain:true})
            console.log(hbsData)
            hbsData.logged_in=req.session.logged_in;
            res.render("profile",hbsData)
        })
    }
})
router.post("/addPost", async (req, res) =>{
    try{
      if (!req.session.logged_in){
        return res. status(403).json({msg: "Login required"})
      } else {
        const newPost = await Post.create({
          ...req.body,
          user_id: req.session.user_id,
          name: req.body.name,
          description: req.body.description
        });
        res.json({msg: "Successful Post!"})
      };
    }
    catch(err){
      console.log(err);
      res.status(500).json({ msg: "Error Occurred"})
    }
  
  })
  

// router.get('/addPost', (req, res) => {
//    res.render('addPost');
//   });


module.exports = router;