const screenSection = document.getElementById("screen-section");
const numberButtons = document.querySelectorAll(".number");
const equals = document.getElementById("equals");
const allOperators = document.querySelectorAll(".operator");

let operation = [];

for (btn of numberButtons) {
  btn.addEventListener("click", function () {
    if (screenSection.textContent === "0" || screenSection.textContent === "00") { // on click, the starting 0 will dissapear
      screenSection.textContent = "";
    }
    screenSection.textContent += this.textContent;

    console.log(operation);
  });
}

for (operator of allOperators) {
  operator.addEventListener("click", function () {
    operation.push(+screenSection.textContent);

    screenSection.textContent = "";
    operation.push(this.textContent);

    console.log(operation);
  });
}