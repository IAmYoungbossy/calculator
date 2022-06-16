const screen = document.querySelector('#screen1');
const screen2 = document.querySelector('#screen2');
const calcContainer = document.querySelector('.calc-container');
const numberButtons = calcContainer.querySelectorAll('.btn');
const clearButton = calcContainer.querySelector('#clear');
const historyDisplay = document.querySelector('#calculator-display');
const powerButton = document.querySelector('.fa');
let storedValue = [], storedOperator = [], screenLength = [],
clearScreen = [], backspace = [], screenDisplay;

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
		setTimeout(() => clearAllNumbers(), 500);
	} else return math(a, b, Math.round((a/b)*1000)/1000);
}

function operator(e) {
    checkOperatorType(e.target.value);
    for(let i = 0; i < 10; i++) numberBtn(e.target.value, `${i}`);
    addDecimal(e.target.textContent);
    clearDefaultZero();
    deleteRecentNumber(e.target.value);
}

function operatorKeyboard(e) {
    checkOperatorType(e.key);
    for(let i = 0; i < 10; i++) numberBtn(e.key, `${i}`);
    addDecimal(e.key);
    clearDefaultZero();
    deleteRecentNumber(e.key);
}

function checkOperatorType(target) {
	if (target === '-') checkForOperand('-');
	else if (target === '+') checkForOperand('+');
	else if (target === '/') checkForOperand('÷');
	else if (target === '*') checkForOperand('×');
	else if (target === '%') checkForOperand('%');
	else if (target === '^') checkForOperand('^');
	else if (target === '=') {
		if (backspace.length < 1) return;
		else {
			clearScreen.push('=');
			backspace = [...historyDisplay.textContent];
			checkOperatorAndAssign();
			historyDisplay.textContent = backspace.toString().replace(/,/g, '');
			backspace.push(+screen.textContent);
			screenLength = [];
		}
	}
}

function checkForOperand(symbol) {
	if(clearScreen[clearScreen.length-1] == '=') historyDisplay.textContent = screen.textContent;
	if (backspace.length < 1) return;
	else {
		clearScreen.push(symbol);
		checkOperatorAndAssign();
		storedValue = [];
		pushOperatorToArray(symbol);
		historyDisplay.textContent += symbol;
	}
}

function checkOperatorAndAssign() {
    (storedOperator[storedOperator.length-1] === '+')? assignMathFunction(add):
    (storedOperator[storedOperator.length-1] === '-')? assignMathFunction(subtract):
    (storedOperator[storedOperator.length-1] === '×')? assignMathFunction(multiply):
    (storedOperator[storedOperator.length-1] === '÷')? assignMathFunction(divide):
    (storedOperator[storedOperator.length-1] === '%')? assignMathFunction(modulo):
    (storedOperator[storedOperator.length-1] === '^')? assignMathFunction(power): false;
}

function assignMathFunction(operate) {
    storedValue.push(parseFloat(screen.textContent));
    if (isNaN(operate((storedValue[storedValue.length-2]),
	(storedValue[storedValue.length-1]))) === true)
        screen2.textContent = '', screen.textContent = 'Error!';
    else {
		let result = operate((storedValue[storedValue.length-2]),
		(storedValue[storedValue.length-1]));
		if(result > 999999999999999) screen.textContent = 'Out of Bounds',
		setTimeout(() => clearAllNumbers(), 500);
        else {
			screen.textContent = result;
        	historyDisplay.textContent = screen.textContent;
        	storedValue.push(parseFloat(screen.textContent));
        	storedValue.push('clear');
        	storedOperator = [];
		}
    }
}

function pushOperatorToArray(symbol) {
	screenLength = [], backspace = [];
	storedValue.push(parseFloat(screen.textContent));
	backspace.push(parseFloat(screen.textContent));
	storedValue.push(symbol), storedOperator.push(symbol), backspace.push(symbol);
}

function numberBtn(target,number){
    if (target === number && typeof storedValue[storedValue.length-1] === 'string')
    clearScreenForNewCalculation(target), backspace.push(parseInt(number));
    else if (target === number) {
    screen.textContent += target, historyDisplay.textContent += target;
    screenLength.push(number), backspace.push(parseInt(number));
    countScreenLength();
    }
}

function countScreenLength() {
	if (screenLength.indexOf('.') > 0 && 
	screenLength.length > (parseFloat(screenLength.indexOf('.'))+5))
		setTimeoutFunction('Max: 4 dec. places');
	else if (screenLength.length > 20) setTimeoutFunction('Large Number')
}

function setTimeoutFunction(errorMsg){
	screenLength.pop();
	screen.textContent = errorMsg;
	setTimeout(function() {
		let display = screenLength.join().replace(/,/g, '');
		screen.textContent = display;
		historyDisplay.textContent = display;
	}, 500);
}

function clearScreenForNewCalculation(target) {
    if (clearScreen[clearScreen.length-1] === '=') historyDisplay.textContent = '';
    clearScreen.pop();
    screen.textContent = '';
    storedValue.pop();
    screen.textContent += target, historyDisplay.textContent += target;
    screenLength.push(screen.textContent);
	countScreenLength();
}

function addDecimal(target) {
	if (target === '.' && typeof storedValue[storedValue.length-1] === 'string') {
			historyDisplay.textContent = '0', screen.textContent = '0';
			storedValue.pop();
			screen.textContent += target, historyDisplay.textContent += target;
			screenLength.push('0'), screenLength.push('.');
	} else if (target === '.' && (screen.textContent).indexOf('.') >= 0) return;
	else {
		if (target === '.' && screen.textContent !== '') {
			screen.textContent += target, historyDisplay.textContent += target;
			screenLength.push('.');
		} else if (target === '.' && screen.textContent === '') {
			screen.textContent = '0', historyDisplay.textContent = '0';
			screen.textContent += target, historyDisplay.textContent += target;
			screenLength.push('0'), screenLength.push('.');
		}
	}
}

function clearDefaultZero() {
    if (screenLength.length > 0) screen2.textContent = '';
}

function deleteRecentNumber(target) {
    if (target === 'Delete') {
		screenLength.pop();
        if (screenLength.length < 1 ) screen2.textContent = '0';
		backspace = [], screenDisplay = [];
		backspace = [...screen.textContent], screenDisplay = [...historyDisplay.textContent];
		backspace.pop(), screenDisplay.pop();
		screen.textContent = historyDisplay.textContent = '';
		screen.textContent = backspace.toString().replace(/,/g, '');
		historyDisplay.textContent = screenDisplay.toString().replace(/,/g, '');
    }
}

function clearAllNumbers() {
    screen.textContent = historyDisplay.textContent = '';
    storedValue = [], storedOperator = [], screenLength = [], backspace = [];
    if (screenLength.length < 1) screen2.textContent = '0';
}

function powerOffOn(e) {
    numberButtons.forEach(btn => btn.classList.toggle('btn-show'));
    powerButton.classList.toggle('show');
    screen2.classList.toggle('screen2-toggle');
    if (e.target.classList[2] == 'show') {
        calcContainer.addEventListener('click', operator);
        window.addEventListener('keypress', operatorKeyboard);
    } else if (e.target.classList[0] == 'fa') {
        calcContainer.removeEventListener('click', operator);
        window.removeEventListener('keypress', operatorKeyboard);
        clearAllNumbers();
    }
}
powerButton.addEventListener('click', powerOffOn);
clearButton.addEventListener('click', () => clearAllNumbers());