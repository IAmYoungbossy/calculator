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