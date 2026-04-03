// - - - - - PACKAGES - - - - -

const express = require("express")
const cors = require("cors");
const mysql = require("mysql");
const fs = require("fs")

// - - - - - CUSTOM MODULES - - - - -

var config; // defined later during runtime to allow for the case where this file doesn't exist.
const { sendErrorResponse, validateUsername, validatePassword, validateHTMLDate, validateStatementAmount, validateStatementType, validateStatementName } = require("./modules/validationFunctions");
const databaseFunctions = require("./modules/databaseFunctions");

// - - - - - CONSTANTS - - - - -

const PORT = 2000;
const app = express();
// note there is an additional constant; conn, that must be defined during the init section as config must be loaded.

// - - - - - VARIABLES - - - - -

//let dbConnected = false;

// - - - - - INIT - - - - - -

if(fs.existsSync("./config.json")){
    config = require("./config.json");
} else {
    console.log("./config.json does not exist. One has been generated for you, please fill it out before continuing");
    fs.writeFileSync("./config.json",JSON.stringify({databasePassword:""}))
    return;
}

// - - - - - MIDDLEWARE - - - - -

app.use(cors());                    // Implements basic cross site security features
app.use(express.json());            // Generates a JSON parsed body in the request object
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));  // Configures GET requests for all files in the folder ./public

app.use("/", (req, res, next) => {  // Prevents API usage while the server is still waiting for its database connection
    if(databaseFunctions.dbConnected) {        
        next();
    } else {
        res.status(503).send({success: false, body: "Server is starting!"})
    }
});

// - - - - - GET REQUESTS - - - - -

// A route GET request should be redirected to our websites entry point
app.get("/",(req, res)=>{ 
    res.redirect("login.html");
});

app.get("/homepage",(req, res)=>{ 
    res.redirect("login.html");
});

app.get("/summary",(req, res)=>{ 
    res.redirect("login.html");
});

app.get("/statements", async (req, res)=>{
    let usr = "a";

    // Note, as the user ID cannot change, this is not a race condition
    let uID = await databaseFunctions.getIDFromUsername(usr);
    console.log(uID);
    let statements = await databaseFunctions.getAllStatements(uID);

    res.send(statements);
});

// - - - - - POST REQUESTS - - - - -

app.post("/login", (req, res)=>{
    // If field is missing, of wrong type, or invalid an error response is sent & false is returned
    if(req.body != undefined) {
        if(validateUsername(req.body.username) && validatePassword(req.body.password)){ // fail responses are sent in the validation functions.
            let username = req.body.username;
            let password = req.body.password;
            console.log("Login post with username: ");
        }
    } else {
        sendErrorResponse(res,"Missing Body or Content Headers");
    }
})

app.post("/register", async (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    if(validateUsername(username,res) && validatePassword(password,res)){ // fail responses are sent in the validation functions.
        if(!await databaseFunctions.checkUsernameExists(username)) {
            databaseFunctions.addUser(username,password)
            res.send({success: true});
        } else {
            sendErrorResponse(res,"Username already exists")
        }
    }
})

app.post("/newstatement", (req, res)=>{
    console.log(req.body);
    let uID = 3;
    let type = req.body.type;
    let name = req.body.name;
    let date = req.body.date;
    let amount = parseInt(req.body.amount); // if undefined this becomes NaN which fails at the validation stage

    if(validateStatementName(name,res) && validateStatementType(type,res) && validateStatementAmount(amount,res) && validateHTMLDate(date,res)){
        databaseFunctions.addStatement(uID,type,name,date,amount);
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));