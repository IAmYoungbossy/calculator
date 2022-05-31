/*Caching DOM*/
const screen = document.querySelector('#screen1');
const screen2 = document.querySelector('#screen2');
const buttonContainer = document.querySelector('.buttoncontainer');
const numberButtons = buttonContainer.querySelectorAll('.btn');
const btnOperator = buttonContainer.querySelectorAll('.btn-operator');
const clearButton = buttonContainer.querySelector('#clear');
const calcDisplay = document.querySelector('#calculator-display');
const powerButton = document.querySelector('.fa');
/*Variable declaration*/
let storedValue = [];
let storedOperator = [];
let screenLength = [];
let display = [];
let zeroDefault = [];
let result;
let displayResult;
let backspace;
let screenDisplay;
let toStrings;
let displayToStrings;

/*Operator Functions*/
function add(a,b) {
        return (a+b);
}
function subtract(a,b) {
        return (a-b);
}
function multiply(a,b) {
        return (a*b);
}
function divide(a,b) {
    if (b === 0) {
        return screen.textContent = 'Error!';
    } else {
        return (a/b);
    }
}
function modulo(a,b) {
		return (a%b);
}
/*Operator function uses all the functions for operation of the calculator*/
function operator(e) {
    /*Assigns operator functions depending on your entry*/
    calculate(e.target.value);

    /*This takes value of the number button for calculation*/
    let i = 0;
    for(; i < 10; i++){
        numberBtn(e.target.value, `${i}`);
    }
    numberBtn(e.target.value, `${i}`);

    /*For floating number*/
    addDecimal(e.target.value);

    /*Clears default zero*/
    clearDefaultZero(e.target.value);

    /*Clears each digit on button click*/
    clearNumber(e.target.value);
}
/*This is same function as above but for keyboard support*/
function operatorKey(e) {
    /*Assigns operator function depending on your entry*/
    calculate(e.key);

    /*This takes value of the keybord number keys for calculation*/
    let i = 0;
    for(; i < 10; i++){
        numberBtn(e.key, `${i}`);
    }
    numberBtn(e.key, `${i}`);

    /*For floating number*/
    addDecimal(e.key);

    /*Clears default zero*/
    clearDefaultZero(e.key);

    /*Clears each digit on button click*/
    clearNumber(e.key);
}
/*function assigns operator functions for calculation*/
function calculate(target) {
    /*Condition for calling operators*/
    if (target === '-') {
        operatorAction('-');
    } else if (target === '+') {
        operatorAction('+');
    } else if (target === '/') {
        operatorAction('÷');
    } else if (target === '*') {
        operatorAction('×');
    } else if (target === '%') {
        operatorAction('%');
	} else if (target === '~') {
        storedValue.push(parseFloat(screen.textContent));
		screen.textContent = '';
		result = (storedValue[storedValue.length-1])*-1;
		screen.textContent = result;
        calcDisplay.textContent = result;
    } else if (target === '=') {
        calcDisplay.textContent += ' Answer ';
        display.push('=');
        getOperator();
    }
}
/*This is just to remove repeated code*/
function operatorAction(symbol) {
    calcDisplay.textContent += symbol;
    display.push(symbol);
    getOperator();
    storedValue = [];
    pushOperator(symbol);
}
/*Function to check operator type and assign type operator function*/
function getOperator() {
    if (storedOperator[storedOperator.length-1] === '+') {
            assignOperator(add);
    } else if (storedOperator[storedOperator.length-1] === '-') {
            assignOperator(subtract);
    } else if (storedOperator[storedOperator.length-1] === '×') {
            assignOperator(multiply);
    } else if (storedOperator[storedOperator.length-1] === '÷') {
            assignOperator(divide);
    } else if (storedOperator[storedOperator.length-1] === '%') {
            assignOperator(modulo);
    } else {
        if (storedOperator[storedOperator.length-1] !== 'string') {
            return;
        }
    }
}
/*Function calls operator function*/
function assignOperator(operate) {
    storedValue.push(parseFloat(screen.textContent));
    screen.textContent = '';
    result = operate((storedValue[storedValue.length-2]), (storedValue[storedValue.length-1]));
    screen.textContent = result;
    storedValue.push(parseFloat(screen.textContent));
    storedValue.push('clear');
    storedOperator = [];
}
/*Function pushes screen display number and operator type to array*/
function pushOperator(symbol) {
    storedValue.push(parseFloat(screen.textContent));
    storedValue.push(symbol);
    storedOperator.push(symbol);
}
/*Button function gets value of the number button or keyboard value for calculation*/
function numberBtn(target,a){
    if (target === a && typeof storedValue[storedValue.length-1] === 'string') {
        clearScreen(target);
    } else {//The variable 'a' represents the entered number.
        if (target === a) {
            screen.textContent += target;
            calcDisplay.textContent += target;
            screenLength.push(screen.textContent);
            zeroDefault.push(a)
            countScreenLength();

        }
    }
}
/*This function makes sure total digits doesn't exceed 20 on the result screen*/
function countScreenLength() {
	if (screenLength.length > 20) {
		screenLength.pop();
		screen.textContent = 'Large Number';
		setTimeout(function() {
			let display = screenLength[screenLength.length-1];
			screen.textContent = display;
            calcDisplay.textContent = display;
		}, 500);
	}
}
/*This function clears the screen for new calculation once '=' or '%' has been used*/
function clearScreen(target) {
    if (display[display.length-1] === '=' || display[display.length-1] === '%') {
		calcDisplay.textContent = '';
	}
    display.pop();
    screen.textContent = '';
    storedValue.pop();
    screen.textContent += target;
    calcDisplay.textContent += target;
    screenLength.push(screen.textContent);
	countScreenLength();
}
/*Function makes sure once a decimal is already in a number it can't be entered again*/
function addDecimal(target) {
    if (target === '.' && typeof storedValue[storedValue.length-1] === 'string') {
		screen.textContent = '0';
		storedValue.pop();
		screen.textContent += target;
		calcDisplay.textContent += target;
	} else if (target === '.' && (screen.textContent).indexOf('.') >= 0) {
		return;
	} else {
		if (target === '.' && screen.textContent !== '') {
			screen.textContent += target;
			calcDisplay.textContent += target;
		} else if (target === '.' && screen.textContent === '') {
            zeroDefault.unshift('.');
			screen.textContent = '0';
			calcDisplay.textContent = '0';
			screen.textContent += target;
			calcDisplay.textContent += target;
		}
	}
}
/*This function clears the default zero once a number is entered*/
function clearDefaultZero(target) {
    if (zeroDefault.length > 0) {
        screen2.textContent = '';
    }
    if (target === '.') {
        zeroDefault.push('.')
        screen2.textContent = '';
    }
}
/*Backspace function to clear each number*/
function clearNumber(target) {
    if (target === 'Delete') {
		screenLength.pop();
        zeroDefault.pop();
        if (zeroDefault.length < 1) {
            screen2.textContent = '0';
        }
		backspace = [];
		screenDisplay = [];
		backspace = [...screen.textContent+''];
		screenDisplay = [...calcDisplay.textContent+''];
		backspace.pop(backspace[backspace.length-1]);
		screenDisplay.pop(screenDisplay[screenDisplay.length-1]);
		result = backspace.toString();
		displayResult = screenDisplay.toString();
		toString = result.replace(/,/g, '');
		displayToStrings = displayResult.replace(/,/g, '');
		screen.textContent = '';
		calcDisplay.textContent = '';
		screen.textContent = toString;
		calcDisplay.textContent = displayToStrings;
    }
}
/*This function clears everything on the screen and stored numbers in arrays*/
function clearAll() {
    screen.textContent = '';
    calcDisplay.textContent = '';
    storedValue = [];
    storedOperator = [];
    screenLength = [];
    zeroDefault = [];
    if (zeroDefault.length < 1) {
        screen2.textContent = '0';
    }
}
/*Function toggles screen and calculator on and off*/
function powerOffOn(e) {
    numberButtons.forEach(btn => {
        btn.classList.toggle('btn-show');
    });
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