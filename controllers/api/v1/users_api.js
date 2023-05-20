const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try{
        const user = await User.findOne({ email: req.body.email });
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: "Invalid username or password"
            })
        }
        return res.status(200).json({
            message: "Sign in Successfully here is token keep it safe!",
            data: {
                token: jwt.sign(user.toJSON(), 'secret', { expiresIn: '100000'})
            }
        })

    }catch(err){
        return res.json(500, {
            message: 'Internal server error'
        })
    }
}