const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    // res.end(`<h1> Asgar is making ans express app </h1>`);
    
    try{
        const posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        });

        const user = await User.find({});
        
        return res.render('home',{
            title: 'My Home & my Posts',
            posts: posts,
            all_users: user
        });

    }catch(err){
        console.log('error getting post to home page', err);
    }

    
} 