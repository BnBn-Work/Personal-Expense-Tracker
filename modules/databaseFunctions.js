const config = require("../config.json");
const mysql = require("mysql");

const DATABASE_NAME = "personalexpensetracker";
const USER_TABLE_CREATE = `CREATE TABLE IF NOT EXISTS Users (
  userID int NOT NULL AUTO_INCREMENT,
  username varchar(25) NOT NULL UNIQUE,
  password varchar(25) NOT NULL,
  PRIMARY KEY (userID)
);`

const STATMENT_TABLE_CREATE = `CREATE TABLE IF NOT EXISTS Statements (
	statementID int NOT NULL AUTO_INCREMENT,
	userID int NOT NULL,
	expenseType varchar(25) NOT NULL,
	date date NOT NULL,
  name varchar(25) NOT NULL,
	value int NOT NULL,
	PRIMARY KEY (statementID),
	FOREIGN KEY (userID) REFERENCES Users (userID)
);`
module.exports.dbConnected = false;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: config.databasePassword
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");


  //confirm databases existance
  con.query("CREATE DATABASE IF NOT EXISTS "+DATABASE_NAME, (err, result) =>  {
    if (err) throw err;
    console.log("Database Exists");

    con.query("USE "+DATABASE_NAME, (err, result) =>  {
      if (err) throw err;
      console.log("Database selected");

      con.query(USER_TABLE_CREATE, (err, result) => {
        if (err) throw err; 
        console.log("users exists");

        con.query(STATMENT_TABLE_CREATE,(err, result) =>  {
          if (err) throw err;
          console.log("statements exists");
          module.exports.dbConnected = true;
        });
      });
    });
  });
});


function addUser(username, password){
  let sql = "INSERT INTO Users (username, password) VALUES ('"+username+"', '"+password+"');";
  
  con.query(sql, (err, result) =>  {
      if (err) throw err;
      console.log("user record inserted");
  });
}

function addStatement(userID, expenseType, name, date, value) {
  let sql = `INSERT INTO Statements (userID, expenseType, name, date, value) VALUES ('${userID}', '${expenseType}', '${name}', '${date}', '${value}');`;
     
  con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("statement record inserted");
  });
}

async function checkUsernameExists(username) {
  let result = await sql_query("SELECT * FROM Users WHERE username = '"+username+"';");

  return result.length != 0;
}

async function checkLogin(username, password) {
  let result = await sql_query(`SELECT * FROM Users WHERE username = '${username}' AND password = '${password}';`);

  return result.length != 0;
}

async function getIDFromUsername(username){
  let result = await sql_query("SELECT userID FROM Users WHERE username = '"+username+"';");

  return result[0].userID;
}

async function getAllStatements(uID) {
  let result = await sql_query(`SELECT * FROM Statements WHERE userID = '${uID}';`);

  return result;
}

async function getStatement(sID) {
  let result = await sql_query(`SELECT * FROM Statements WHERE statementID = '${uID}';`);

  return result[0];
}
async function updateStatement(uID) {
  //let result = await sql_query(`UPDATE * FROM Statements WHERE userID = '${uID}';`);
}

async function sql_query(sql) {
  let promise = new Promise((resolve) => {
    con.query(sql, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });

  return promise;
}
module.exports.addUser = addUser;
module.exports.addStatement = addStatement;
module.exports.checkUsernameExists = checkUsernameExists;
module.exports.getAllStatements = getAllStatements;
module.exports.getIDFromUsername = getIDFromUsername;
module.exports.getStatement = getStatement;
module.exports.updateStatement = updateStatement;
module.exports.checkLogin = checkLogin;