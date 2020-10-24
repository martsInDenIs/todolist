class User{
    name = '';
    isLogin = false;
    tbName = '';
    static exit = function(){
        user.name = "";
        user.isLogin = false;
        user.tbName = '';
    }
    static save = function(name,tb){
        user.name = name;
        user.isLogin = true;
        user.tbName = tb;
    }
    static show = function(){
        return user;
    }
}

const user = new User();

module.exports = User;