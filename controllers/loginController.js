const { query } = require("express");
const mysql = require("mysql2/promise");
const User = require("../models/user.js");




module.exports.homeLoginPage = function (req, res){
    if(User.show().isLogin == true) res.redirect("/tasks");
    else res.render("login.hbs");
};

module.exports.checkLogin = async function (req,res){    
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "daylist",
        password: ""
    });
    

    const userName = req.body.login;
    const userPassword = req.body.password;

    const [rows1] = await connection.query("SELECT login, password FROM customers WHERE login = ?", userName);
    if(rows1.length <= 0) res.render("login.hbs",{
        error: "Error!"
    });
    else{
        console.log(rows1[0]);
        if(rows1.length == 0) res.render("login.hbs",{error: "Error"});
        else if(userName == rows1[0].login && userPassword == rows1[0].password) {
            const [rows2] = await connection.query("SELECT tb_id FROM customers WHERE login = ?",userName);
            User.save(rows1[0].login,rows2[0].tb_id);
            res.redirect("/tasks");
        }
        else res.render("login.hbs",{error: "Unvalid login or password!"});
        connection.end(function (err) {
            if(err) console.error(err);
            else console.log("Connection is end!");
        });
    }
};
