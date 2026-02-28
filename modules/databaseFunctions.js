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
	value float NOT NULL,
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
  let sql = "INSERT INTO Users (username, password) VALUES ('"+username+"', '"+password+"')";
  
  con.query(sql, (err, result) =>  {
      if (err) throw err;
      console.log("user record inserted");
  });
}

function addStatement(userID, expenseType, date, value) {
  let sql = "INSERT INTO Statment (userID, expenseType, date, value) VALUES ('"+userID+"', '"+expenseType+"', '"+date+"', '"+value+"')";
     
  con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("statement record inserted");
  });
}

function getAllUsers() {
  con.query("SELECT * FROM Users")
}

function getAllStatements() {

}

module.exports.addUser = addUser;
module.exports.addStatement = addStatement;
