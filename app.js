const billAmountInput = document.querySelector("#bill");
const tipSelectorGrid = document.querySelector(".grid");
const peopleSelectorInput = document.querySelector("#people");
const customTipInput = document.querySelector("#custom");
const billH = document.querySelector("#billPerPerson");
const tipH = document.querySelector("#tipPerPerson");
const resetBtn = document.querySelector("#reset");
const billError = document.querySelector("#bill-error");
const tipError = document.querySelector("#tip-error");
const peopleError = document.querySelector("#pople-error");
const containLetter = "Can't contain letters";
const zero = "Can't be 0";

let bill;
let tip;
let people;

billAmountInput.addEventListener("input", changeBillAmount);
tipSelectorGrid.addEventListener("click", changeTipForBtn);
customTipInput.addEventListener("input", changeTipForInput);
peopleSelectorInput.addEventListener("input", changePeopleAmount);
resetBtn.addEventListener("click", resetAll);

function changeBillAmount() {
  let billAmount = billAmountInput.value;
  let ok = true;

  if (billAmount !== "") {
    for (let i = 0; i < billAmount.length; i++) {
      let c;

      if (billAmount[i] !== ".") {
        c = parseInt(billAmount[i]);

        if (isNaN(c)) ok = false;
      }
    }

    if (ok === true) {
      billAmount = parseFloat(billAmount);
      if (billAmount !== 0) {
        bill = billAmount;
        removeErrors(billError);
        calculateTipAndBill();
      } else {
        addErrors(billError, zero);
      }
    } else {
      addErrors(billError, containLetter);
    }
  }
}

function changeTipForBtn(e) {
  let tipPercentage = e.target;
  resetSelected();

  if (tipPercentage.classList[1] === "tip__btn") {
    tip = tipPercentage.dataset.percent;
    tipPercentage.classList.add("selected");
    calculateTipAndBill();
  }
}

function changeTipForInput() {
  let tipPercentage = customTipInput.value;
  let ok = true;

  if (tipPercentage !== "") {
    for (let i = 0; i < tipPercentage.length; i++) {
      let c;

      if (tipPercentage[i] !== "." && tipPercentage !== "%") {
        c = parseInt(tipPercentage[i]);

        if (isNaN(c)) ok = false;
      }
    }

    if (ok === true) {
      tipPercentage = parseFloat(tipPercentage);
      tip = tipPercentage;
      removeErrors(tipError);
      calculateTipAndBill();
    } else {
      addErrors(tipError, containLetter);
    }
  }
}

function changePeopleAmount() {
  let peopleAmount = peopleSelectorInput.value;
  let ok = true;

  if (peopleAmount !== "") {
    for (let i = 0; i < peopleAmount.length; i++) {
      let c;
      c = parseInt(peopleAmount[i]);
      if (isNaN(c)) ok = false;
    }

    if (ok === true) {
      peopleAmount = parseInt(peopleAmount);
      if (peopleAmount !== 0) {
        people = peopleAmount;
        removeErrors(peopleError);
        calculateTipAndBill();
      } else {
        addErrors(peopleError, zero);
      }
    } else {
      addErrors(peopleError, containLetter);
    }
  }
}

function calculateTipAndBill() {
  if (bill !== 0 && people !== 0) {
    let tipValue = bill * (tip / 100);
    let tipPerPerson = tipValue / people;
    let billPerPerson = (bill + tipValue) / people;

    if (!isNaN(tipPerPerson) && !isNaN(billPerPerson)) {
      updateNumbers(tipPerPerson, billPerPerson);
    }
  }
}

function updateNumbers(tip, bill) {
  tipH.innerHTML = "$" + tip.toString();
  billH.innerHTML = "$" + bill.toString();
}

function addErrors(location, error) {
  location.innerHTML = error;
}

function removeErrors(location) {
  location.innerHTML = "";
}

function resetAll(e) {
  e.preventDefault();
  billAmountInput.value = "";
  peopleSelectorInput.value = "";
  customTipInput.value = "";
  tipH.innerHTML = "$0.00";
  billH.innerHTML = "$0.00";
  bill = undefined;
  tip = undefined;
  people = undefined;
}

function resetSelected() {
  const tipBtns = document.querySelectorAll(".tip__btn");

  tipBtns.forEach((tipBtn) => tipBtn.classList.remove("selected"));
}
