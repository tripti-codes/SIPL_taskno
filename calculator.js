const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (value === "C") {
            currentInput = "";
            display.textContent = "0";
            return;
        }

        if (value === "DEL") {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || "0";
            return;
        }

        if (value === "=") {
            calculateResult();
            return;
        }

        if (value === ".") {
            const numbers = currentInput.split(/[+\-*/%]/);
            const lastNumber = numbers[numbers.length - 1];

            if (lastNumber.includes(".")) {
                return;
            }
        }

        currentInput += value;
        display.textContent = currentInput;
    });
});

function calculateResult() {
    if (currentInput === "") {
        return;
    }

    try {
        const result = Function('"use strict"; return (' + currentInput + ')')();

        if (!Number.isFinite(result)) {
            display.textContent = "Error";
            currentInput = "";
            return;
        }

        display.textContent = result;
        currentInput = result.toString();
    } catch (error) {
        display.textContent = "Error";
        currentInput = "";
    }
}