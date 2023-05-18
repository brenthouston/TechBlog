const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User);

Post.hasMany(Comments,{
  foreignKey: 'post_id'
})

Comments.belongsTo(Post);

User.hasMany(Comments,{
  foreignKey: 'user_id'
})

Comments.belongsTo(User);



module.exports = { User, Post, Comments };
