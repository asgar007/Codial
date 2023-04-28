const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{
        const post = await Post.findById(req.body.post);
        if(post){
            const comment =  await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comment.push(comment);
            post.save();
            res.redirect('/');
        }
    }catch(err){
        console.log('Error in creating comment', err);
    }
}

module.exports.destroy = async function(req, res){
    try{
        const comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.deleteOne();
            await Post.findByIdAndUpdate(postId, { $pull: {comment: req.params.id} });
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    }catch(error){
        console.log('error in deleting comments', error);
    }
}