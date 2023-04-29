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
        req.flash('success', 'you created a new post');
        return res.redirect('back');
    }catch(error){
        req.flash('error', err);
        console.log('error while posting from home page', error);
        return;
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
            req.flash('success', 'you deleted a post and comment associated');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'you are not authorized to delete!');
            return res.redirect('back');
        }

    }catch(error){
        req.flash('error', error);
        console.log("Error while deleting post : ", error);
        return;
    }
}