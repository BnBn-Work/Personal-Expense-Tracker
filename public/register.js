const loginButton = document.getElementById("backButton");
const registerButton = document.getElementById("registerButton");
const loginForm = document.getElementById("registerForm");

loginForm.addEventListener("submit",(e)=>{
    // To allow for proper handling, we do not want the page to refresh.
    e.preventDefault();
    switch(e.submitter.id){
        case "backButton":
            window.location.href = "login.html";
        break;

        case "registerButton":
            window.location.href = "homepage.html"; // Make API request
        break;

        default:
            console.log("Unhandled Button input");
        break;
    }
})