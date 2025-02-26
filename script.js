const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let currentInput = "";
let previousInput = "";
let operator = null;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "." && currentInput.includes(".")) return; // Prevent multiple dots
    currentInput += value;
    updateDisplay(currentInput);
  });
});

clearButton.addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay("0");
});

equalsButton.addEventListener("click", () => {
  if (!previousInput || !currentInput || !operator) return;

  const result = calculate(
    parseFloat(previousInput),
    parseFloat(currentInput),
    operator
  );
  currentInput = result.toString();
  previousInput = "";
  operator = null;
  updateDisplay(currentInput);
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentInput === "") return;

    if (previousInput) {
      const result = calculate(
        parseFloat(previousInput),
        parseFloat(currentInput),
        operator
      );
      currentInput = "";
      previousInput = result.toString();
      updateDisplay(previousInput);
    } else {
      previousInput = currentInput;
      currentInput = "";
    }
    operator = button.getAttribute("data-value");
  });
});

function updateDisplay(value) {
  display.textContent = value;
}
function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Error";
    default:
      return b;
  }
}
