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