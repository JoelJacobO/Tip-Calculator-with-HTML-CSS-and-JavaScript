//Btn  Variables
const buttons = document.querySelectorAll(".select-tip-button");
const resetBtn = document.getElementById("reset");

// Dom variable
const tipAmount = document.querySelector(".tip__amount");
const totalAmount = document.querySelector(".total__amount");
const inputError = document.querySelector(".error");

// Input Variables
const bill = document.getElementById("bill");
const people = document.getElementById("people");
const form = document.querySelector(".custom__form");
const x = window.matchMedia("(hover: none)");
let func = true;

function init() {
  // Caltip and total Function
  function calcTip(value, numOfPeople) {
    const billValue = parseFloat(bill.value);

    const tip = (billValue * value) / numOfPeople;
    const total = billValue / numOfPeople + tip;

    updateDom(tip, total);
  }

  // render result to the dom
  function updateDom(tip, total) {
    tipAmount.textContent = `${tip.toFixed(2)}`;
    totalAmount.textContent = `${total.toFixed(2)}`;
  }

  // % buttons
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (func) {
        const numOfPeople = +people.value;
        let messages = [];
        if (numOfPeople === 0) {
          messages.push("Can't be zero");
        }
        if (messages.length > 0) {
          inputError.textContent = messages.join(",");

          people.style.borderColor = "hsl(13, 70%, 60%)";
        } else {
          func = false;
          inputError.textContent = " ";
          people.style.borderColor = "transparent ";
          button.style.backgroundColor = "hsl(172, 67%, 45%)";
          resetBtn.style.backgroundColor = "hsl(172, 67%, 45%)";
          button.style.color = "hsl(183, 85%, 21%)";
          calcTip(button.value, numOfPeople);
        }
      }
    });
  });

  // % custom input
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const customEl = document.getElementById("custom");
    const customPercentValue = parseFloat(customEl.value) / 100;
    const numOfPeople = +people.value;
    let messages = [];
    if (numOfPeople === 0) {
      messages.push("Can't be zero");
    }
    if (messages.length > 0) {
      inputError.textContent = messages.join(",");
      people.style.borderColor = "hsl(13, 70%, 60%)";
    } else {
      func = false;
      inputError.textContent = " ";
      people.style.borderColor = "transparent ";

      resetBtn.style.backgroundColor = "hsl(172, 67%, 45%)";

      calcTip(customPercentValue, numOfPeople);
    }
  });

  // Reset

  resetBtn.addEventListener("click", () => {
    func = true;
    buttons.forEach((button) => {
      button.style.backgroundColor = "hsl(183, 100%, 15%)";
      button.style.color = "#fff";
    });

    if (x.matches) {
      resetBtn.style.backgroundColor = "hsl(185, 41%, 84%)";
      resetBtn.style.color = "hsl(183, 100%, 15%)";
    } else {
      resetBtn.style.backgroundColor = "hsl(180, 18%, 40%)";
      resetBtn.style.color = "hsl(183, 85%, 21%)";
    }

    totalAmount.textContent = "0.00";
    tipAmount.textContent = "0.00";
    bill.value = people.value = "";
    document.getElementById("custom").value = "";
    inputError.textContent = "";
    people.style.borderColor = "";

    resetBtn.addEventListener("mouseover", () => {
      resetBtn.style.backgroundColor = "hsl(185, 41%, 84%)";
      resetBtn.style.color = "hsl(183, 100%, 15%)";
    });
    resetBtn.addEventListener("mouseout", () => {
      resetBtn.style.backgroundColor = "hsl(180, 18%, 40%)";
      resetBtn.style.color = "hsl(183, 85%, 21%)";
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
