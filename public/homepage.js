const logoutButton = document.getElementById("logoutButton");
const statementButton = document.getElementById("statementButton");
const summarizeButton = document.getElementById("summarizeButton");

logoutButton.addEventListener("click",(e)=>{
    window.location.href="login.html";
})

statementButton.addEventListener("click",(e)=>{
    window.location.href="statementEntry.html";
})

summarizeButton.addEventListener("click",(e)=>{
    window.location.href="summary.html";
})

//prof wants us to use plotly.js