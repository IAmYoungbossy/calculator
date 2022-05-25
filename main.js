/*Caching DOM*/
const screen = document.querySelector('#screen');
const buttonContainer = document.querySelector('.buttoncontainer');
const numberButtons = buttonContainer.querySelectorAll('btn');
const btnOperator = buttonContainer.querySelectorAll('.btn-operator');
const clearButton = buttonContainer.querySelector('btn-clear');
/*Variable declaration*/
let storedValue = [];
let storedOperator = [];
let result;
let backspace;
let toString;

/*Operator Functions*/
function add(a,b) {
    return a+b;
}
function subtract(a,b) {
    return a-b;
}
function multiply(a,b) {
    return a*b;
}
function divide(a,b) {
    return a/b;
}
function findFactorial(factorial) {
    let multiply = 1;
    for (; factorial !== 0; factorial--) {
        multiply *= factorial;
    }
    return multiply;
}

/*Function to check operator type and assign type operator function*/
function getOperatorFunction() {
    if (storedOperator[storedOperator.length-1] === '+') {
        storedValue.push(+screen.textContent);
        screen.textContent = '';
        result = add((storedValue[storedValue.length-2]), (storedValue[storedValue.length-1]));
        screen.textContent = result;
        storedValue.push(+screen.textContent);
        storedValue.push('clear');
    } else if (storedOperator[storedOperator.length-1] === '-') {
        storedValue.push(+screen.textContent);
        screen.textContent = '';
        result = subtract((storedValue[storedValue.length-2]), (storedValue[storedValue.length-1]));
        screen.textContent = result;
        storedValue.push(+screen.textContent);
        storedValue.push('clear');
    } else if (storedOperator[storedOperator.length-1] === '*') {
        storedValue.push(+screen.textContent);
        screen.textContent = '';
        result = multiply((storedValue[storedValue.length-2]), (storedValue[storedValue.length-1]));
        screen.textContent = result;
        storedValue.push(+screen.textContent);
        storedValue.push('clear');
    } else if (storedOperator[storedOperator.length-1] === '/') {
        storedValue.push(+screen.textContent);
        screen.textContent = '';
        result = divide((storedValue[storedValue.length-2]), (storedValue[storedValue.length-1]));
        screen.textContent = result;
        storedValue.push(+screen.textContent);
        storedValue.push('clear');
    } else {
        if (storedOperator[storedOperator.length-1] !== 'string') {
            return;
        }
    }
}