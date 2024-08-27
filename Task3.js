// script.js

// Get elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Variables to store the current and previous inputs
let currentInput = '';
let previousInput = '';
let operator = '';

// Update display
function updateDisplay() {
    display.textContent = currentInput;
}

// Clear everything
document.getElementById('clear').addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
});

// Handle digit and decimal input
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;

        if (!isNaN(value) || value === '.') {
            if (currentInput.includes('.') && value === '.') return;
            currentInput += value;
            updateDisplay();
        }
    });
});

// Handle operator input
document.querySelectorAll('#add, #subtract, #multiply, #divide').forEach(button => {
    button.addEventListener('click', (e) => {
        if (currentInput === '') return;
        if (previousInput !== '') calculate();
        operator = e.target.textContent;
        previousInput = currentInput;
        currentInput = '';
    });
});

// Handle equals button
document.getElementById('equals').addEventListener('click', calculate);

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}
