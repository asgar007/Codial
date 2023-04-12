const User = require('../models/user');


module.exports.profile = async function(req,res){
    // authentcate
    if(req.cookies.user_id){
        try{
            // find the user
            const user = await User.findById(req.cookies.user_id);
            if(user){
                return res.render('user_profile',{
                    title: 'User Profile',
                    user: user 
                });
            }else{
                return res.redirect('/user/signIn');
            }
    
        }catch(error){
            console.log('error in loading profile', error);
        }
    }else{
        return res.redirect('/user/signIn');
    }
    
};

// render sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: 'User Login' 
    });
}
// render sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: 'User SignUp' 
    });
}

// get sign up data
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            User.create(req.body);
            return res.redirect('/user/signIn');
        }
        else{
            return res.redirect('back');
        }
    }catch(error){
        console.log('error while finding user or creating user in signing up', error);
    }


    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){ console.log('error while finding user in signing up'); return }
    //     //if user does not exist then create
    //     if(!user){
    //         User.create(req.body, function(err, user){
    //             if(err){ console.log('error while creating user in signing up'); return }
    //             return res.redirect('/user/signIn')
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // })
}

// get sign In data
module.exports.createSession = async function(req, res){

    //steps
    
    try{
        // find the user
        const user = await User.findOne({email: req.body.email});
        //handle user found
        if(user){
            //handle password which dont match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //handle session created
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile')
        }else{
            //handle user not found
            return res.redirect('back');
        }

    }catch(error){
        console.log('error in signing In', error);
    }
}

module.exports.signOut = async function(req, res){
    try{
        //clear cookie by key
        res.clearCookie('user_id');
        return res.redirect('/user/signIn');

    }catch(error){
        console.log('error in signing out', error);
    }
}