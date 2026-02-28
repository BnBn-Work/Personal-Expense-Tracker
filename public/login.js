const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit",(e)=>{
    // To allow for proper handling, we do not want the page to refresh.
    e.preventDefault();
    switch(e.submitter.id){
        case "signinButton":
            window.location.href = "homepage.html" //make API request
        break;

        case "registerButton":
            window.location.href = "register.html"
        break;

        default:
            console.log("Unhandled Button input");

        break;
    }
})