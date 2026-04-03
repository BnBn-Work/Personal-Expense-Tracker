const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit",(e)=>{
    // To allow for proper handling, we do not want the page to refresh.
    
    switch(e.submitter.id){
        case "signinButton":
            //window.location.href = "homepage.html"; //make API request
        break;

        case "registerButton":
            e.preventDefault();
            window.location.href = "register.html";
        break;

        default:
            e.preventDefault();
            console.log("Unhandled Button input");
        break;
    }
});