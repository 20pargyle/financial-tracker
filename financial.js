const trForm = document.getElementById("new-transaction-form");
const trSubmit = document.getElementById("new-transaction-submit");
const trListDisplay = document.getElementById("transaction-list");
const errorDiv = document.getElementById("error-div");
const trArray = [];

trSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (trForm.name.value == "" || trForm.amount.value <= 0) {
        errorDiv.textContent = "Error; invalid input";
        setTimeout(() => { errorDiv.textContent = "" }, 1200);
    }
    else {
        newTr = {
            "name" : trForm.name.value,
            "amount" : trForm.amount.value,
            "date" : trForm.date.value,
            "time" : trForm.time.value
        };
        trArray.push(newTr);
        displayAllTr(trArray, trListDisplay);
    }
});

function displayAllTr(trArray){
    trListDisplay.innerHTML = "";
    trArray.forEach(tr => {
        const parentItem = document.createElement("li");
        const trName = document.createElement("h5");
        const trAmount = document.createElement("div");
        trName.textContent = tr.name;
        trAmount.textContent = "$" + tr.amount;

        trName.classList.add("tr-name");
        trAmount.classList.add("tr-amount");
        
        parentItem.appendChild(trName);
        parentItem.appendChild(trAmount);
        addActions(parentItem, tr);
        trListDisplay.appendChild(parentItem);
    });
}

function addActions(parentItem, trObj) {
    const editButton = document.createElement("button");
    
    editButton.classList.add("material-icons");
    editButton.textContent = "edit";
    editButton.addEventListener("click", () => {
        const trIndex = trArray.indexOf(trObj);
        // display edit menu, with current transaction values
    });
    
    const deleteButton = document.createElement("button");
    
    deleteButton.classList.add("material-icons");
    deleteButton.textContent = "delete";

    deleteButton.addEventListener("click", () => {
        const trIndex = trArray.indexOf(trObj);
        if (trIndex > -1) {
            trArray.splice(trIndex, 1);
            displayAllTr(trArray);
        }
    });

    parentItem.appendChild(editButton);
    parentItem.appendChild(deleteButton);
}

// after a user edits a transaction and clicks "save", this saves the new values to the object. 
function saveTrEdit(trObj){
    const trIndex = trArray.indexOf(trObj);
    trArray[trIndex] = {
        "name" : trEditForm.name.value,
            "amount" : trEditForm.amount.value,
            "date" : trEditForm.date.value,
            "time" : trEditForm.time.value
    }
    displayAllTr(trArray);
}

function exportTrList(){
    
}

/* const hasFileRadio = document.getElementById("has-file");
const fileInput = document.getElementById("file-input");

// if hasFileRadio is checked, set the file-input display to not none
// when a file is successfully uploaded (and data-validated for expected input), show the tool menu
*/