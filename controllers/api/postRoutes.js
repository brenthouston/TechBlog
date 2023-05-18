const router = require('express').Router();
const { User, Post, Comments} = require('../../models');



router.post('/', async (req, res) => {
  if(!req.session.logged_in){
    return res.status(403).json({msg:"login first!"})
  }
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// /api/posts/3
router.get("/:id",(req,res)=>{
  Post.findByPk(req.params.id,{
      include:[User]
  }).then((postData) => {
      if (postData) {
        const hbsData = postData.get({ plain: true });
        console.log(hbsData);
        hbsData.logged_id = req.session.logged_id;
        res.render("singlePost", {hbsData:hbsData,
        logged_in: req.session.logged_in});
      } else {
        res.status(404).send("Post not found");
      }
    })
    .catch((error) => {
      res.status(500).send("An error occurred");
    });
});

router.post('/post/:id/comment', async (req,res) =>{

  try{
    console.log(req.body);
    console.log(req.session);
    if(!req.session.logged_in){
      res.render('login');
      return res.status(403).json({msg: "Login required"})
      
    } else {
      const newComment =await Comment.create({
        ...req.body,
        // post_id: req.params.id,
        user_id: req.session.user_id,


      });
      res.json({msg: "Successful Comment!"})
    }
  }
  catch(err){
    console.log(err);
    res.status(500). json({ msg: "Error Occurred"})
  }

})

  
router.delete('/:id', (req,res) => {
  Post.destroy({
    where:{
      id:req.params.id
    }
  }).then(delPost=>{
    if(!delPost){
      return res.status(404).json({msg:"No such Post with that Id in database!"})
    }
    res.json(delPost)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occured"})
  })
})
  module.exports= router