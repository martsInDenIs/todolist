const User = require("../models/user.js");

module.exports.isCustomerIn = function (req, res,next){
    if(User.show().isLogin != true) res.redirect('/');
    else{
        next();
    }
};