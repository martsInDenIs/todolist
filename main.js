const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysql = require('mysql2');

const loginRouter = require("./routes/loginRouter.js");
const createUserRouter = require("./routes/createUserRouter.js");
const addTasksRouter = require("./routes/addTasksRouter.js");

const mysqlImport = require('mysql-import');
const Import = require("./mysql-import/mysql-import.js");

const connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
});
connection.connect(function(err){
  if (err) throw err;
  console.log("Connected!");
  connection.query("CREATE DATABASE IF NOT EXISTS daylist", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

const importer = new Import({host: "localhost",user: "root", database: "daylist"});
importer.import('./daylist.sql').then(()=>{
  const file_imported = importer.getImported();
  console.log(`${file_imported.length} SQL file(s) imported`);
}).catch(err=>{
  console.log(err);
});


const app = express();


app.set("view engine","hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'you secret key',
  saveUninitialized: true
}));



app.use('/',loginRouter);
app.use('/create',createUserRouter);
app.use('/tasks',addTasksRouter);


app.listen(3000,function (err) {
    if(err) console.log(err);
    else console.log("The server is ready for connection...");
  });