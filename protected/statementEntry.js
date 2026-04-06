const expenseButton = document.getElementById("expenseButton");
const incomeButton = document.getElementById("incomeButton");
const backButton = document.getElementById("backButton");
const confirmButton = document.getElementById("confirmButton");
const statementForm = document.getElementById("statementForm");
const statementTypeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");

const EXPENSE = "expense";
const INCOME = "income";
var statementType;

toggleExpenseType(EXPENSE);

statementForm.addEventListener("submit",(e)=>{
    // To allow for proper handling, we do not want the page to refresh.
    let prevDef = true;

    switch(e.submitter.id){
        case "expenseButton":
            toggleExpenseType(EXPENSE);
        break;

        case "incomeButton":
            toggleExpenseType(INCOME);
        break;

        case "backButton":
            window.location.href = "homepage.html";
        break;

        case "confirmButton":
            prevDef = false;

            
        break;

        default:
            console.log("Unhandled Button input");
        break;
    }

    if(prevDef){
        e.preventDefault();
    }
})

amountInput.addEventListener("change",e=>{
    //assure correct input data
    console.log(typeof e.target.value);
})
function toggleExpenseType(newType) {
    statementType = newType;
    statementTypeInput.value = statementType;
    
    switch(newType){
        case EXPENSE:
            expenseButton.disabled = true;
            incomeButton.disabled = false;
        break;

        case INCOME:
            expenseButton.disabled = false;
            incomeButton.disabled = true;
        break;

        default:
            console.log("WARNING: BAD EXPENSE TYPE PASSED INTO toggleExpenseType()");
        break;
    }
}