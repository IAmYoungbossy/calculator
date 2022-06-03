/*Caching DOM*/
const screen = document.querySelector('#screen1');
const screen2 = document.querySelector('#screen2');
const buttonContainer = document.querySelector('.buttoncontainer');
const numberButtons = buttonContainer.querySelectorAll('.btn');
const clearButton = buttonContainer.querySelector('#clear');
const calcDisplay = document.querySelector('#calculator-display');
const powerButton = document.querySelector('.fa');
/*Variable declaration*/
let storedValue = [], storedOperator = [], screenLength = [],
display = [], zeroDefault = [], backspace, screenDisplay;

/*Math Functions*/
function math(a,b,answer){
    if (Number.isFinite(parseFloat(a)) === false || Number.isFinite(parseFloat(b)) === false)
    return screen.textContent = storedValue[0];
    else return answer;
}
function add(a,b) {return math(a,b,(a+b));}
function subtract(a,b) {return math(a,b,(a-b));}
function multiply(a,b) {return math(a,b,(a*b));}
function modulo(a,b) {return math(a,b,(a%b));}
function divide(a,b) { return (b === 0)? screen.textContent = 'Error!': math(a,b,(a/b));}

/*Operator function uses all the functions for operation of the calculator*/
function operator(e) {
        calculate(e.target.value);
        for(let i = 0; i < 10; i++) numberBtn(e.target.value, `${i}`);
        addDecimal(e.target.textContent);
        clearDefaultZero(e.target.value);
        clearNumber(e.target.value);
}
/*This is same function as above but for keyboard*/
function operatorKey(e) {
        calculate(e.key);
        for(let i = 0; i < 10; i++) numberBtn(e.key, `${i}`);
        addDecimal(e.key);
        clearDefaultZero(e.key);
        clearNumber(e.key);
}
/*Assigns math functions for calculation*/
function calculate(target) {
    /*Condition for calling math functions*/
    if (target === '-') operatorAction('-');
     else if (target === '+') operatorAction('+');
     else if (target === '/') operatorAction('÷');
     else if (target === '*') operatorAction('×');
     else if (target === '%') operatorAction('%');
	 else if (target === '~') {//Used '~' here for -/+ symbole as keyboards have no such key.
        storedValue.push(parseFloat(-1*screen.textContent));
		screen.textContent = storedValue[storedValue.length-1];
        calcDisplay.textContent = storedValue[storedValue.length-1];
        storedValue.pop();
    } else if (target === '=') {
        calcDisplay.textContent += ' Answer ';
        display.push('=');
        getOperator();
    }
}
/*This is just to remove repeated code from calculate() function*/
function operatorAction(symbol) {
    calcDisplay.textContent += symbol;
    display.push(symbol);
    getOperator();
    storedValue = [];
    pushOperator(symbol);
}
/*Function to check operator type and assign appropriate math function*/
function getOperator() {
    (storedOperator[storedOperator.length-1] === '+')? assignOperator(add):
    (storedOperator[storedOperator.length-1] === '-')? assignOperator(subtract):
    (storedOperator[storedOperator.length-1] === '×')? assignOperator(multiply):
    (storedOperator[storedOperator.length-1] === '÷')? assignOperator(divide):
    (storedOperator[storedOperator.length-1] === '%')? assignOperator(modulo): false;
}
/*This function applies the math function and returns result to screen*/
function assignOperator(operate) {
    storedValue.push(parseFloat(screen.textContent));
    if (isNaN(operate((storedValue[storedValue.length-2]),(storedValue[storedValue.length-1]))) === true)
        screen.textContent = 'Error!';
    else {
        screen.textContent = operate((storedValue[storedValue.length-2]),(storedValue[storedValue.length-1]));
        storedValue.push(parseFloat(screen.textContent));
        storedValue.push('clear');
        storedOperator = [];
    }
}
/*Function pushes screen display number and operator type to their respective array*/
function pushOperator(symbol) {
    storedValue.push(parseFloat(screen.textContent));
    storedValue.push(symbol), storedOperator.push(symbol);
}
/*Button function gets value of the number button or keyboard value for calculation*/
function numberBtn(target,number){
    if (target === number && typeof storedValue[storedValue.length-1] === 'string') clearScreen(target);
    else if (target === number) {
    screen.textContent += target, calcDisplay.textContent += target;
    screenLength.push(screen.textContent);
    zeroDefault.push(number)
    countScreenLength();
    }
}
/*This function makes sure total digits doesn't exceed 20 on the result screen*/
function countScreenLength() {
	if (screenLength.length > 20) {
		screenLength.pop();
		screen.textContent = 'Large Number';
		setTimeout(function() {
			let display = screenLength[screenLength.length-1];
			screen.textContent = display, calcDisplay.textContent = display;
		}, 500);
	}
}
/*This function clears the screen for new calculation once '=' has been used*/
function clearScreen(target) {
    if (display[display.length-1] === '=') calcDisplay.textContent = '';
    display.pop();
    screen.textContent = '';
    storedValue.pop();
    screen.textContent += target, calcDisplay.textContent += target;
    screenLength.push(screen.textContent);
	countScreenLength();
}
/*Function makes sure once a decimal is already in a number it can't be entered again*/
function addDecimal(target) {
    if (target === '.' && typeof storedValue[storedValue.length-1] === 'string') {
		screen.textContent = '0';
		storedValue.pop();
		screen.textContent += target, calcDisplay.textContent += target;
	} else if (target === '.' && (screen.textContent).indexOf('.') >= 0) {return;}
	else {
        if (target === '.' && screen.textContent !== '') {
		    screen.textContent += target, calcDisplay.textContent += target;
		} else if (target === '.' && screen.textContent === '') {
            zeroDefault.unshift('.');
		    screen.textContent = '0', calcDisplay.textContent = '0';
		    screen.textContent += target, calcDisplay.textContent += target;
		}
	}
}
/*This function clears the default zero once a number is entered*/
function clearDefaultZero(target) {
    if (zeroDefault.length > 0) screen2.textContent = '';
    if (target === '.') {
        zeroDefault.push('.');
        screen2.textContent = '';
    }
}
/*Backspace function to clear each number*/
function clearNumber(target) {
    if (target === 'Delete') {
		screenLength.pop(), zeroDefault.pop();
        if (zeroDefault.length < 1 || screenLength.length < 1) screen2.textContent = '0';
		backspace = [], screenDisplay = [];
		backspace = [...screen.textContent+''], screenDisplay = [...calcDisplay.textContent+''];
		backspace.pop(), screenDisplay.pop();
		screen.textContent = calcDisplay.textContent = '';
		screen.textContent = backspace.toString().replace(/,/g, '');
		calcDisplay.textContent = screenDisplay.toString().replace(/,/g, '');
    }
}
/*This function clears everything on the screen and stored numbers in arrays*/
function clearAll() {
    screen.textContent = calcDisplay.textContent = '';
    storedValue = [], storedOperator = [], screenLength = [], zeroDefault = [];
    if (zeroDefault.length < 1) screen2.textContent = '0';
}
/*Function toggles screen and calculator on and off*/
function powerOffOn(e) {
    numberButtons.forEach(btn => btn.classList.toggle('btn-show'));
    powerButton.classList.toggle('show');
    screen2.classList.toggle('screen2-toggle');
    if (e.target.className == 'fa fa-power-off show') {
        buttonContainer.addEventListener('click', operator);
        window.addEventListener('keypress', operatorKey);
    } else if (e.target.className == 'fa fa-power-off') {
        buttonContainer.removeEventListener('click', operator);
        clearAll();
    }
}
/*Event listeners*/
powerButton.addEventListener('click', powerOffOn);
clearButton.addEventListener('click', () => {
    clearAll();
});