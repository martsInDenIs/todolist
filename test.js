const mysql = require("mysql2/promise");
const User = require('./models/user.js');
User.save("Denis","D1");

async function f(){
  let year = [];
  const findYears = "SELECT DISTINCT YEAR(r_date) AS year FROM " + User.show().tbName + "_tb" + " ORDER BY r_date";
  const sqlQuery = "SELECT DATE_FORMAT(r_date, '%d %M %Y') AS dt, record, id FROM " + User.show().tbName + "_tb" + " WHERE YEAR(r_date) =  ? ORDER BY r_date";

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

}

f();