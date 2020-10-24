const User = require("../models/user.js");
const mysql = require("mysql2/promise");

const showTable = "SELECT  DATE_FORMAT(r_date,'%d %M %Y %H:%i') AS date, record, id FROM ";

module.exports.showMainPage = async function(request,response){
    request.session.previous_id = request.originalUrl;
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "daylist",
        password: ''
    });
    console.dir(User.show());

    const tb_name = User.show().tbName + "_tb";
    const [rows] = await connection.query(showTable + tb_name + " ORDER BY r_date;");
    console.log(showTable);

    connection.end();    
    response.render("mainPage.hbs",{
        user: User.show(),
        tasks: rows
    });

}

module.exports.userExit = function(req,res){
    User.exit();
    res.redirect('/');
};


module.exports.addTask = function (req, res){
    res.render("createTask.hbs");
};

module.exports.checkTask = async function (req, res){
    const addTaskSql = "INSERT INTO " + User.show().tbName + "_tb" + " (r_date, record) VALUES (?, ?);";

    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const time = req.body.time;
    const text = req.body.text;
    console.log([year,month,day,time]);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: "root",
        database: "daylist",
        password: ""
    })

    const result1 = await connection.query(addTaskSql,[year + "-" + month + "-" + day + ' ' + time, text]);

    connection.end();
    res.redirect(req.session.previous_id);
};

module.exports.deleteTask = async function(req,res){
    const deleteRecordSql = "DELETE FROM " + User.show().tbName + "_tb" + " WHERE id = ?";

    const connection = await mysql.createConnection({host:"localhost",user:"root",database:'daylist'});
    const recordId = req.params["id"];
    console.log(recordId);

    await connection.query(deleteRecordSql, recordId);
    res.redirect(req.session.previous_id);
 };

module.exports.showChangeTaskForm = async function (req, res){
    const showTask = "SELECT DAYOFMONTH(r_date) AS day, MONTH(r_date) AS month, YEAR(r_date) AS year, CONVERT(HOUR(r_date),varchar(2)) as hour, CONVERT(MINUTE(r_date),varchar(2)) AS minute, record, id FROM ";
    const task = req.params["id"];

    const connection = await mysql.createConnection({host:"localhost",user: "root",database:"daylist"});
    const [result] = await connection.query(showTask + User.show().tbName + "_tb" + " WHERE id = ?;",task);

    const hour = (result[0].hour.length < 2) ? "0" + result[0].hour : result[0].hour;
    const minute = (result[0].minute.length < 2) ? "0" + result[0].minute : result[0].minute;

    res.render("changeTask.hbs",{
        task: {
            day: result[0].day,
            month: result[0].month,
            year: result[0].year,
            time: hour + ":" + minute, 
            text: result[0].record,
            id: task
        }
    });
    
    connection.end();
} 

module.exports.saveChangedTask = async function (req, res){
    const addTaskSql = "UPDATE " + User.show().tbName + "_tb" + " SET r_date = ?, record = ? WHERE id = ?;";
    const id = req.params["id"];

    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const time = req.body.time;
    const text = req.body.text;

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: "root",
        database: "daylist",
        password: ""
    })

    const result1 = await connection.query(addTaskSql,[year + "-" + month + "-" + day + ' ' + time, text, id]);

    connection.end();
    res.redirect(req.session.previous_id);
}; 



module.exports.getTasksByDay  = async function (req, res){
    const days = ["Sunday","Monday","Tuesday", "Wednesday","Thursday", "Friday","Saturday"];
    req.session.previous_id = req.originalUrl;

    let start, end;
    const date = new Date();
    console.log(date.getDay());
    if(date.getDay() == 0){
        start = date;
        end = new Date();
        end.setDate(start.getDate() + 7);
    }else{
        start = new Date(date);
        start.setDate(date.getDate()-date.getDay());
        end = new Date();
        end.setDate(end.getDate() + 7 - date.getDay());
    }

    const sqlQuery = "SELECT id, record FROM " + User.show().tbName + "_tb WHERE DATE_FORMAT(r_date,'%Y-%m-%d') = ? " + " ORDER BY r_date";



    const connection = await mysql.createConnection({host:"localhost",user: "root",database:"daylist"});

    let answer = {};
    for(let i = start, d = 0; new Date(i.toISOString().split('T')[0]) < new Date(end.toISOString().split('T')[0]); d++ ){
        let arr =  [];
        let [rows] = await connection.query(sqlQuery,i.toISOString().split('T')[0]);

        for(let a = 0; a < rows.length; a++){
            let obj = {};
            obj.record = rows[a].record;
            obj.id = rows[a].id;
            arr.push(obj);
        }

        answer[days[d]] = arr;
        i.setDate(i.getDate() + 1);
    }
    console.log(answer);
    connection.end();


    res.render("mainPage.hbs",{
        tasks: answer,
        byDay: true,
        user: User.show()
    });
};

module.exports.getTasksByMonth = async function (req, res){
    const months = ["January", "February","March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
    req.session.previous_id = req.originalUrl;
    const currentYear = new Date().getFullYear();

    const sqlQuery = "SELECT DATE_FORMAT(r_date, '%d %M %Y') AS dt, record, id FROM " + User.show().tbName + "_tb" + " WHERE MONTHNAME(r_date) = ? AND YEAR(r_date) = ? ORDER BY r_date";

    const connection = await mysql.createConnection({host: "localhost",user: "root",database: "daylist"});
    let answer = {};
    for(let i = 0; i < months.length;i++){
        let arr = [];
        
        let [rows] = await connection.query(sqlQuery,[months[i],currentYear]);
        for(let a = 0; a < rows.length; a++){
            let obj = {};
            obj.date = rows[a].dt;
            obj.record = rows[a].record;
            obj.id = rows[a].id;
            arr.push(obj);
        }
        
        answer[months[i]] = arr;
    }
    connection.end();

    console.log(answer);
    res.render("mainPage.hbs",{
        tasks: answer,
        byMonth: true,
        user: User.show()
    })
};

module.exports.getTasksByYear = async function (req, res){
    let year = [];
    const findYears = "SELECT DISTINCT YEAR(r_date) AS year FROM " + User.show().tbName + "_tb" + " ORDER BY r_date";
    const sqlQuery = "SELECT DATE_FORMAT(r_date, '%d %M %Y') AS dt, record, id FROM " + User.show().tbName + "_tb" + " WHERE YEAR(r_date) =  ? ORDER BY r_date";
    req.session.previous_id = req.originalUrl;

    const connection = await mysql.createConnection({host: "localhost", user: "root", database: "daylist"});
    const [result] = await connection.query(findYears);
    for(let i = 0; i <result.length; i++){
        year.push(result[i].year);
    }
  
    let answer = {};
    for(let i = 0; i < year.length;i++){
      let arr = [];
      let [rows] = await connection.query(sqlQuery,year[i]);
      
      for(let a = 0; a < rows.length;a++){
          let obj = {};
          obj.date = rows[a].dt;
          obj.record = rows[a].record;
          obj.id = rows[a].id;
          arr.push(obj);
      }
      answer[year[i]] = arr;
    }
  
    connection.end();
    console.log(answer);
    res.render("mainPage.hbs",{
        tasks: answer,
        byYear: true,
        user: User.show()
    });
};