// Write add, subtract, multiply, and divide as simple functions.

const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a, b) => {
  if (b === 0) return 'Error!'; // Handle division by zero
  return a / b;
};


let firstNumber = null;
let operator = null;
let secondNumber = null;


function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return null; 
    }
}

const buttons = document.querySelectorAll('button');
const display = document.querySelector('input');

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Listen for keyboard input
document.addEventListener('keydown', handleKeyboardInput)


let clearDisplayOnNextInput = false; 
let hasDecimal = false;


function handleButtonClick(event) {
    const value = event.target.innerText;
    processInput(value);
}

function processInput(value) {
    if (!isNaN(value)) { 
        if (clearDisplayOnNextInput) {
            display.value = ''; 
            clearDisplayOnNextInput = false; 
        }
        display.value += value; 
    } else if (value === 'C'){
        firstNumber = null; 
        operator = null; 
        secondNumber = null; 
        display.value = '';
        hasDecimal = false; 
    } else if (value === '=') { 
        if (firstNumber !== null && operator !== null) {
            secondNumber = parseFloat(display.value); 
            const result = operate(operator, firstNumber, secondNumber)
            display.value = result; 
            firstNumber = result;
            operator = null; 
            clearDisplayOnNextInput = true; 
            hasDecimal = false;
        }
    } else if (value === '.') {
    
    if (!hasDecimal) {
        display.value += value; 
        hasDecimal = true;
    }
    return; 
    }else if( value === '←'){
        display.value = display.value.slice(0, -1);
         // Check if the last character was a decimal and reset the hasDecimal flag
    if (display.value[display.value.length - 1] === '.') {
        hasDecimal = false; // Reset the flag since decimal is removed
    }

    // Reset hasDecimal if display is empty
    if (display.value.length === 0) {
        hasDecimal = false; // Ensure no decimals are falsely indicated
    }
    }else {
        if (firstNumber !== null && operator !== null) { 
            secondNumber = parseFloat(display.value); 
            const result = operate(operator, firstNumber, secondNumber); 
            display.value = result; 
            firstNumber = result; 
            hasDecimal = false; 
        } else {
            firstNumber = parseFloat(display.value); 
        }
        operator = value; 
        clearDisplayOnNextInput = true; 
    }
}

function handleKeyboardInput(event) {
    const key = event.key;

    // Mapping keys to calculator inputs
    const keyMap = {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '+': '+',
        '-': '-',
        '*': '*', // You may also use the `x` character
        '/': '/',
        'Enter' : '=',
        'Backspace': '←',
        'C': 'C',
        '.': '.',
    };

    // Check if the pressed key is in the key map
    if (keyMap[key]) {
        processInput(keyMap[key]);
    }
}