const User = require('../models/user');


module.exports.profile = async function(req,res){
    try{
        const user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    }catch(err){
        console.log('Error while loading user in profile: ', err);
    }
};
    // authentcate
    // if(req.cookies.user_id){
    //     try{
    //         // find the user
    //         const user = await User.findById(req.cookies.user_id);
    //         if(user){
    //             return res.render('user_profile',{
    //                 title: 'User Profile',
    //                 user: user 
    //             });
    //         }else{
    //             return res.redirect('/user/signIn');
    //         }
    
    //     }catch(error){
    //         console.log('error in loading profile', error);
    //     }
    // }else{
    //     return res.redirect('/user/signIn');
    // }

// render sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
    return res.render('user_sign_in',{
        title: 'User Login' 
    });
}
// render sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
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
}


module.exports.createSession = async function(req, res){
    return res.redirect('/');
}
module.exports.destroySession = async function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect("/");
      });
}

module.exports.update = async function(req, res){
    try{
        if(req.user.id == req.params.id){
            await User.findByIdAndUpdate(req.params.id, req.body);
            return res.redirect('back');
        }
        else{
            return res.status(401).send('unauthorized');
        }


    }catch(err){
        console.log('Error while update profile : ', err);
    }
}

// module.exports.signOut = async function(req, res){
//     try{
//         //clear cookie by key
//         res.clearCookie('user_id');
//         return res.redirect('/user/signIn');

//     }catch(error){
//         console.log('error in signing out', error);
//     }
// }