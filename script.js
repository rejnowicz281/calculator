const screenSection = document.getElementById("screen-section");
const numberButtons = document.querySelectorAll(".number");

let operation = [];

for (btn of numberButtons) {
  btn.addEventListener("click", function () {
    if (screenSection.textContent === "0" || screenSection.textContent === "00") { // on click, the starting 0 will dissapear
      screenSection.textContent = "";
    }
    screenSection.textContent += this.textContent;
  });
}