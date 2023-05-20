const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    const posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of Posts",
        posts: posts
    });
}

module.exports.destroy = async function(req, res){
    try{
        //initially find whether that exist or not
        let post = await Post.findById(req.params.id);
        console.log(post);
        //authorise only to sign in person / avoiding deletion of someone else's post
        if(post.user == req.user.id){// here post.user is id itself & .id means converting the object id in string
            await post.deleteOne();
            await Comment.deleteMany({post: req.params.id});
            // req.flash('success', 'you deleted a post and comment associated');
            // return res.redirect('back');
            return res.json(200, {
                message: "post and associated comments are deleted successfully!"
            })
        }
        else{
            return res.status(401).json({ message: "you can not delete this post" });
        }

    }catch(error){
        return res.json(500, {
            message: 'Internal server error'
        })
    }
}