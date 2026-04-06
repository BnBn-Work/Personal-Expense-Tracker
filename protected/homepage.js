const logoutButton = document.getElementById("logoutButton");
const statementButton = document.getElementById("statementButton");
const summarizeButton = document.getElementById("summarizeButton");
const statementsDiv = document.getElementById("statements");
const totalSavings = document.getElementById("totalSavings");


logoutButton.addEventListener("click",(e)=>{
    
    fetch(window.location.origin+"/protected/logout", {
                method: "POST",
            })
            .then((response) => response.json())
            .then((json) => {window.location.href="login.html";});
})

statementButton.addEventListener("click",(e)=>{
    window.location.href="statementEntry.html";
})

summarizeButton.addEventListener("click",(e)=>{
    window.location.href="summary.html";
})


fetch(window.location.origin+"/protected/statements", {
                method: "GET",
            })
            .then((response) => response.json())
            .then((json) => {
                let total = 0;

                json.forEach(statement=>{
                    let nE = document.createElement("div");
                    let curTarget = statementsDiv.firstChild;

                    total += statement.expenseType === "expense" ? statement.value * -1 : statement.value; 
                    statement.value *= 0.01;

                    nE.innerHTML = `<h3>${statement.name}</h3><label>${statement.expenseType}</label><p>${statement.date}</p><p>${statement.value}</p><hr/>`;
                    nE.dataset.date = statement.date;

                    
                    while(curTarget != null){
                        if(curTarget.dataset.date < statement.date){
                            statementsDiv.insertBefore(nE,curTarget);
                            break;
                        }
            
                        curTarget = curTarget.nextSibling;
                    }

                    if(curTarget == null){
                        // failed to insert before, append instead

                        statementsDiv.appendChild(nE);
                    }
                });
                total = total * 0.01;

                totalSavings.innerText = total < 0 ? `-$${total*-1}` : `$${total}`;
                totalSavings.innerHTML = `<b>${totalSavings.innerHTML}</b>`;
            });

//prof wants us to use plotly.js