const expenseButton = document.getElementById("expenseButton");
const incomeButton = document.getElementById("incomeButton");
const backButton = document.getElementById("backButton");
const confirmButton = document.getElementById("confirmButton");
const statementForm = document.getElementById("statementForm");

const EXPENSE = "expense";
const INCOME = "income";

toggleExpenseType(EXPENSE);

statementForm.addEventListener("submit",(e)=>{
    // To allow for proper handling, we do not want the page to refresh.
    e.preventDefault();

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
            window.location.href = "homepage.html";
        break;

        default:
            console.log("Unhandled Button input");
        break;
    }
})

function toggleExpenseType(newType) {
    statementType = newType;

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