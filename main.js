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
display = [], zeroDefault = [], backspace = [], screenDisplay;

/*Math Functions*/
function math(a,b,answer){
    if (Number.isFinite(parseFloat(a)) === false || Number.isFinite(parseFloat(b)) === false)
    return screen.textContent = storedValue[0];
    else return answer;
}

const add = (a, b) => math(a, b, Math.round((a+b)*1000)/1000);
const subtract = (a, b) => math(a, b, Math.round((a-b)*1000)/1000);
const multiply = (a, b) => math(a, b, Math.round((a*b)*1000)/1000);
const modulo = (a, b) => math(a, b, Math.round((a%b)*1000)/1000);
const power = (a, b) => math(a, b, Math.round((a**b)*1000)/1000);
function divide(a, b) {
	if (b === 0) {
		storedValue.push('Error'), screen.textContent = 'Error';
		return;
	} else {
		return math(a, b, Math.round((a/b)*1000)/1000);
	}
}

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
	else if (target === '^') operatorAction('^');
	else if (target === '=') {
		if (backspace.length < 1) return;
		else {
			display.push('=');
			backspace = [...calcDisplay.textContent];
			getOperator();
			calcDisplay.textContent = backspace.toString().replace(/,/g, '');
			backspace.push(+screen.textContent);
		}
	}
}
/*This is just to remove repeated code from calculate() function*/
function operatorAction(symbol) {
	if (screen.textContent == 'Error') {
		storedValue = [], backspace = [];
		storedValue.push('clear');
		return;
	}
	if (backspace.length < 1) return;
	else {
		display.push(symbol);
		getOperator();
		storedValue = [];
		pushOperator(symbol);
		ans.push(symbol);
		calcDisplay.textContent += symbol;
	}
}
/*Function to check operator type and assign appropriate math function*/
function getOperator() {
    (storedOperator[storedOperator.length-1] === '+')? assignOperator(add):
    (storedOperator[storedOperator.length-1] === '-')? assignOperator(subtract):
    (storedOperator[storedOperator.length-1] === '×')? assignOperator(multiply):
    (storedOperator[storedOperator.length-1] === '÷')? assignOperator(divide):
    (storedOperator[storedOperator.length-1] === '%')? assignOperator(modulo):
    (storedOperator[storedOperator.length-1] === '^')? assignOperator(power): false;
}
/*This function applies the math function and returns result to screen*/
function assignOperator(operate) {
    storedValue.push(parseFloat(screen.textContent));
    if (isNaN(operate((storedValue[storedValue.length-2]),(storedValue[storedValue.length-1]))) === true)
        screen2.textContent = '', screen.textContent = 'Error!';
    else {
        screen.textContent = operate((storedValue[storedValue.length-2]),(storedValue[storedValue.length-1]));
        calcDisplay.textContent = screen.textContent;
        storedValue.push(parseFloat(screen.textContent));
        storedValue.push('clear');
        storedOperator = [];
    }
}
/*Function pushes screen display number and operator type to their respective array*/
function pushOperator(symbol) {
	screenLength = [], backspace = [];
	storedValue.push(parseFloat(screen.textContent));
	backspace.push(parseFloat(screen.textContent));
	storedValue.push(symbol), storedOperator.push(symbol);
	backspace.push(symbol);
}
/*Button function gets value of the number button or keyboard value for calculation*/
function numberBtn(target,number){
    if (target === number && typeof storedValue[storedValue.length-1] === 'string')
    clearScreen(target), backspace.push(parseInt(number));
    else if (target === number) {
    screen.textContent += target, calcDisplay.textContent += target;
    screenLength.push(number), backspace.push(parseInt(number));
    zeroDefault.push(number)
    countScreenLength();
    }
}
/*This function makes sure total digits doesn't exceed 20 on the result screen*/
function countScreenLength() {
	if (screenLength.indexOf('.') > 0 && screenLength.length > (parseFloat(screenLength.indexOf('.'))+5)) {
		screenLength.pop();
		screen.textContent = 'Max: 4 dec. places';
		setTimeout(function() {
			let display = screenLength.join().replace(/,/g, '');
			screen.textContent = display;
			calcDisplay.textContent = display;
		}, 500);
	} else if (screenLength.length > 20) {
		screenLength.pop();
		screen.textContent = 'Large Number';
		setTimeout(function() {
			let display = screenLength.join().replace(/,/g, '');
			screen.textContent = display;
			calcDisplay.textContent = display;
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
		if (storedValue[storedValue.length-1] === 'Error') {
			calcDisplay.textContent = '';
			screen.textContent = '0', calcDisplay.textContent = '0';
			screen.textContent += target, calcDisplay.textContent += target;
			storedValue = [];
			screenLength.push('.');
		} else {
			calcDisplay.textContent = '0', screen.textContent = '0';
			storedValue.pop();
			screen.textContent += target, calcDisplay.textContent += target;
			screenLength.push('.');
		}
	} else if (target === '.' && (screen.textContent).indexOf('.') >= 0) return;
	else {
		if (target === '.' && screen.textContent !== '') {
			screen.textContent += target, calcDisplay.textContent += target;
			screenLength.push('.');
		} else if (target === '.' && screen.textContent === '') {
			zeroDefault.unshift('.');
			screen.textContent = '0', calcDisplay.textContent = '0';
			screen.textContent += target, calcDisplay.textContent += target;
			screenLength.push('0'), screenLength.push('.');
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
		backspace = [...screen.textContent], screenDisplay = [...calcDisplay.textContent];
		backspace.pop(), screenDisplay.pop();
		screen.textContent = calcDisplay.textContent = '';
		screen.textContent = backspace.toString().replace(/,/g, '');
		calcDisplay.textContent = screenDisplay.toString().replace(/,/g, '');
    }
}
/*This function clears everything on the screen and stored numbers in arrays*/
function clearAll() {
    screen.textContent = calcDisplay.textContent = '';
    storedValue = [], storedOperator = [], screenLength = [], zeroDefault = [],
    backspace = [], ans = [];
    if (zeroDefault.length < 1) screen2.textContent = '0';
}
/*Function toggles screen and calculator on and off*/
function powerOffOn(e) {
    numberButtons.forEach(btn => btn.classList.toggle('btn-show'));
    powerButton.classList.toggle('show');
    screen2.classList.toggle('screen2-toggle');
    if (e.target.classList[2] == 'show') {
        buttonContainer.addEventListener('click', operator);
        window.addEventListener('keypress', operatorKey);
    } else if (e.target.classList[0] == 'fa') {
        buttonContainer.removeEventListener('click', operator);
        window.removeEventListener('keypress', operatorKey);
        clearAll();
    }
}
/*Event listeners*/
powerButton.addEventListener('click', powerOffOn);
clearButton.addEventListener('click', () => clearAll());