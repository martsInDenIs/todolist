const mysql = require("mysql2/promise");
const User = require("../models/user.js");


module.exports.showCreateUser = function (req,res) {
    res.render("createCustomer.hbs");
};

module.exports.createUser = async function (request,response){
        const login = request.body.login;
        const email = request.body.email;
        const password = request.body.password;
        const repeatePassword = request.body.repeatePassword;
        let counter = 0;
        
        const insertCustomer = "INSERT INTO customers(login,password,email) VALUE (?,?,?)";
        const findTbName = "SELECT COUNT(*) AS counter FROM customers WHERE login LIKE ?"; 
        const addId = "UPDATE customers SET tb_id = ? WHERE login = ?";

        const connection = await mysql.createConnection({
            host: "localhost",
            database: "daylist",
            user: "root",
            password: ""
        });

        if(password != repeatePassword){
            response.render("createCustomer.hbs",{
                error: "Not coincident passwords!"
            });
            return;
        }


        const [row] = await connection.query(findTbName, login[0]);
        counter = row[0].counter + 1;
        const result = await connection.query(insertCustomer,[login,password,email]);
            User.save(login,login[0] + counter);
            console.log(User.show());
            console.log(result);

        
        const createTb = `CREATE TABLE IF NOT EXISTS ${User.show().tbName + '_tb'} (r_date DATETIME not null, record TEXT not null, id int not null AUTO_INCREMENT PRIMARY KEY)`;


        
        const ress = await connection.query(addId, [login[0] + counter, login]);
        const res = await connection.query(createTb);

        connection.end();
        response.redirect("/tasks");
};