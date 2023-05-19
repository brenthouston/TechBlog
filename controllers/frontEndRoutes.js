const express = require('express');
const router = express.Router();
const {Post,User,Comments} = require('../models');

router.get("/",(req,res)=>{
    Post.findAll({
        include:[User, Comments]
    }).then(postData=>{
        const hbsData = postData.map(post=>post.get({plain:true}));
        console.log(hbsData);
        res.render("home",{
            allPosts:hbsData,
            logged_in: req.session.logged_in,
        })
    })
})



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



// router.post("/addPost", async (req, res) =>{
//     try{
//       if (!req.session.logged_in){
//         return res. status(403).json({msg: "Login required"})
//       } else {
//         const newPost = await Post.create({
//           ...req.body,
//           user_id: req.session.user_id,
//           name: req.body.name,
//           description: req.body.description
//         });
//         res.json({msg: "Successful Post!"})
//       };
//     }
//     catch(err){
//       console.log(err);
//       res.status(500).json({ msg: "Error Occurred"})
//     }
  
//   })
  
// router.delete('/post/:id', (req,res) => {
//   Post.destroy({
//     where:{
//       id:req.params.id
//     }
//   }).then(delPost=>{
//     if(!delPost){
//       return res.status(404).json({msg:"No such Post with that Id in database!"})
//     }
//     res.json(delPost)
//   }).catch(err=>{
//     console.log(err);
//     res.status(500).json({msg:"error occured"})
//   })
// })

module.exports = router;