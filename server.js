const express = require("express")
const cors = require("cors")

const PORT = 2000;
const app = express();
// POST /login - 
// POST /register
// GET /homepage
// POST /newstatement
// GET /summary


app.use(cors());                    // Implements basic cross site security features
app.use(express.json());            // Generates a JSON parsed body in the request object
app.use(express.static("public"));  // Configures GET requests for all files in the folder ./public


/*app.get("/",(req, res)=>{ // A route GET request should be redirected to our websites entry point
    res.redirect("login.html")
})*/
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));