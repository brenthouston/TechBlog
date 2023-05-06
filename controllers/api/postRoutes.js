const router = require('express').Router();
const { Post } = require('../../models');

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

  module.exports= router