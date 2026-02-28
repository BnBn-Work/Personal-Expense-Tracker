const loginButton = document.getElementById("backButton");
const registerButton = document.getElementById("registerButton");
const loginForm = document.getElementById("registerForm");
const username = document.getElementById("username");
const password = document.getElementById("password");

loginForm.addEventListener("submit",(e)=>{
    // To allow for proper handling, we do not want the page to refresh.
    e.preventDefault();
    switch(e.submitter.id){
        case "backButton":
            window.location.href = "login.html";
        break;

        case "registerButton":
            //disable button to avoid multi-clicks
            registerButton.disabled = true;
            let usr = username.value;
            let psw = password.value;

            fetch(window.location.origin+"/register", {
                method: "POST",
                body: JSON.stringify({
                    username: usr,
                    password: psw,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((response) => response.json())
            .then((json) => {
                registerButton.disabled = false;
                if(json.success){
                    console.log(window.location)

                    window.location.href = "homepage.html"
                } else {
                    console.log(json.body)
                }
            });
        break;

        default:
            console.log("Unhandled Button input");
        break;
    }
})