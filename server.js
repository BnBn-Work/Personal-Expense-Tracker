const express = require("express")
const cors = require("cors");
const mysql = require("mysql")

const { sendErrorResponse, validateUsername, validatePassword } = require("./modules/validationFunctions");

const PORT = 2000;
const app = express();
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "myDbP@ss"
});

let dbConnected = false;

con.connect(function(err) {
  if (err) throw err;
  dbConnected = true;
  console.log("Connected!");
});


app.use(cors());                    // Implements basic cross site security features
app.use(express.json());            // Generates a JSON parsed body in the request object
app.use(express.static("public"));  // Configures GET requests for all files in the folder ./public

// - - - - - GET REQUESTS - - - - -

// A route GET request should be redirected to our websites entry point
app.get("/",(req, res)=>{ 
    res.redirect("login.html")
})

app.get("/homepage",(req, res)=>{ 
    res.redirect("login.html")
})

app.get("/summary",(req, res)=>{ 
    res.redirect("login.html")
})

// - - - - - POST REQUESTS - - - - -

app.post("/login", (req, res)=>{
    // If field is missing, of wrong type, or invalid an error response is sent & false is returned
    if(req.body != undefined) {
        if(validateUsername(req.body.username) && validatePassword(req.body.password)){
            let username = req.body.username;
            let password = req.body.password;
            console.log("Login post with username: ");
        }
    } else {
        sendErrorResponse(res,"Missing Body or Content Headers");
    }
})

app.post("/register", (req, res)=>{
    
})

app.post("/newstatement", (req, res)=>{
    console.log(req);
    
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));