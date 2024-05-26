const newForm = document.getElementById("new-form");
const newTrSubmit = document.getElementById("new-submit");
const editForm = document.getElementById("edit-form");
const editSave = document.getElementById("edit-save");
const editCancel = document.getElementById("edit-cancel");
const trListDisplay = document.getElementById("transaction-list");
const balanceDiv = document.getElementById("balance-div")
const errorDiv = document.getElementById("error-div");
const trArray = [];

newTrSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    submitNewForm();
});

newTrSubmit.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key = "Enter") { submitnewForm(); }
})

function submitNewForm(){
    if (newForm.name.value == "" || newForm.amount.value <= 0) {
        errorDiv.textContent = "Error; invalid input";
        setTimeout(() => { errorDiv.textContent = "" }, 1200);
    }
    else {
        newTr = {
            "name" : newForm.name.value,
            "amount" : newForm.amount.value,
            "date" : newForm.date.value,
            "time" : newForm.time.value
        };
        trArray.push(newTr);
        updateTrList(trArray, trListDisplay);
    }
}

function updateTrList(trArray){
    trListDisplay.innerHTML = "";
    var remainingBalance = 0;
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

        remainingBalance = remainingBalance - tr.amount;

    });
    const truncatedBalance = Math.trunc(remainingBalance * 100) / 100;
    balanceDiv.textContent = `$${truncatedBalance}`;
}

function addActions(parentItem, trObj) {
    const editButton = document.createElement("button");
    
    editButton.classList.add("material-icons");
    editButton.textContent = "edit";
    editButton.addEventListener("click", (e) => { 
        e.preventDefault
        beginEdit(trObj);
    });
    
    const deleteButton = document.createElement("button");
    
    deleteButton.classList.add("material-icons");
    deleteButton.textContent = "delete";

    deleteButton.addEventListener("click", () => { deleteTrItem(trObj); });
    deleteButton.addEventListener("keydown", (e) => { if (e.key="enter") { deleteTrItem(trObj); }});

    parentItem.appendChild(editButton);
    parentItem.appendChild(deleteButton);
}

function deleteTrItem(trObj) {
    const trIndex = trArray.indexOf(trObj);
    // remove transaction item and update the displayed list
    if (trIndex > -1) {
        trArray.splice(trIndex, 1);
        updateTrList(trArray);
    }
}

function beginEdit(trObj){
    const trIndex = trArray.indexOf(trObj);
    newForm.style.display = "none";
    editForm.style.display = "inherit";

    // populate edit menu with existing object elements
    editForm.name.value = trObj["name"];
    editForm.amount.value = trObj["amount"];
    editForm.date.value = trObj["date"];
    editForm.time.value = trObj["time"];

    editForm.name.placeholder = trObj["name"];
    editForm.amount.placeholder = trObj["amount"];
    editForm.date.placeholder = trObj["date"];
    editForm.time.placeholder = trObj["time"];

    // "cancel" button closes the menu, not saving any changes made

    // TODO: These event listeners need to be removed after either 'cancel' or 'save' is used
    // once clicked, all of the listeners go off and the values are saved to everything that has ever been edited.
    editCancel.addEventListener("click", (e) => {
        e.preventDefault();
        cancelEdit();
    }, { once: true });
    editCancel.addEventListener("keydown", (e) => {
        e.preventDefault();
        if (e.key="enter") { cancelEdit(); }
    }, { once: true });
    editSave.addEventListener("click", (e) => { 
        e.preventDefault();
        saveEdit(trIndex); 
    }, { once: true });
    editSave.addEventListener("keydown", (e) => { 
        e.preventDefault();
        if (e.key="enter") { saveEdit(trIndex); }
    }, { once: true });
}

function cancelEdit(){
    editForm.style.display = "none";
    newForm.style.display = "flex";
    // remove edit save button event listener, so it can't be used while

    editCancel.removeEventListener("click", () => { cancelEdit(); });
}

// after a user edits a transaction and clicks "save", this saves the new values to the object and array. 
function saveEdit(trIndex){
    trArray[trIndex] = {
        "name" : editForm.name.value,
        "amount" : editForm.amount.value,
        "date" : editForm.date.value,
        "time" : editForm.time.value
    }
    updateTrList(trArray);
    editForm.style.display = "none";
    newForm.style.display = "flex";
}

function exportTrList(){

}

/* const hasFileRadio = document.getElementById("has-file");
const fileInput = document.getElementById("file-input");

// if hasFileRadio is checked, set the file-input display to not none
// when a file is successfully uploaded (and data-validated for expected input), show the tool menu
*/