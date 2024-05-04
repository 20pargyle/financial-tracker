const trForm = document.getElementById("new-transaction-form");
const trSubmit = document.getElementById("new-transaction-submit");
const trList = document.getElementById("transaction-list");
const errorDiv = document.getElementById("error-div");
const trArray = [];

trSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (trForm.name.value == "" || trForm.amount.value <= 0) {
        errorDiv.textContent = "Error; invalid input";
        setTimeout(() => { errorDiv.textContent = "" }, 1200);
    }
    else {
        trArray.push({
            "name" : trForm.name.value,
            "amount" : trForm.amount.value,
            "date" : trForm.date.value,
            "time" : trForm.time.value
        });

        const parentItem = document.createElement("li");
        const trName = document.createElement("h5");
        const trAmount = document.createElement("div");
        trName.textContent = trForm.name.value;
        trAmount.textContent = "$" + trForm.amount.value;

        parentItem.setAttribute("tabindex","0");
        trName.classList.add("tr-name");
        trAmount.classList.add("tr-amount");

        parentItem.appendChild(trName);
        parentItem.appendChild(trAmount);
        trList.appendChild(parentItem);
    }
});


/* const hasFileRadio = document.getElementById("has-file");
const fileInput = document.getElementById("file-input");

// if hasFileRadio is checked, set the file-input display to not none
// when a file is successfully uploaded (and data-validated for expected input), show the tool menu
*/