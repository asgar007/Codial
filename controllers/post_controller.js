const Post = require('../models/post');
const Comment = require('../models/comment')

module.exports.create = function(req, res){
    try{
       Post.create({
            content: req.body.content,
            // user: req.cookies.user_id
            //if passport is used
            user: req.user._id
        });
        return res.redirect('back');
    }catch(error){
        console.log('error while posting from home page', error);
    }
}

module.exports.destroy = async function(req, res){
    try{
        //initially find whether that exist or not
        const post = await Post.findById(req.params.id);
        //authorise only to sign in person / avoiding deletion of someone else's post
        if(post.user == req.user.id){// here post.user is id itself & .id means converting the object id in string
            await post.deleteOne();
            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }

    }catch(error){
        console.log("Error while deleting post : ", error);
    }
}