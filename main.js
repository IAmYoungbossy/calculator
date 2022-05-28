/*Caching DOM*/
const screen = document.querySelector('#screen');
const buttonContainer = document.querySelector('.buttoncontainer');
const numberButtons = buttonContainer.querySelectorAll('.btn');
const btnOperator = buttonContainer.querySelectorAll('.btn-operator');
const clearButton = buttonContainer.querySelector('#clear');
const calcDisplay = document.querySelector('#calculator-display');
/*Variable declaration*/
let storedValue = [];
let storedOperator = [];
let screenLength = [];
let display = [];
let result;
let displayResult;
let backspace;
let screenDisplay;
let toStrings;
let displayToStrings;

/*Operator Functions*/
function add(a,b) {
    if (Number.isFinite(parseFloat(a)) === false || Number.isFinite(parseFloat(b)) === false) {
        return screen.textContent = storedValue[0];
    } else {
        return a+b;
    }
}
function subtract(a,b) {
    if (Number.isFinite(parseFloat(a)) === false || Number.isFinite(parseFloat(b)) === false) {
        return screen.textContent = storedValue[0];
    } else {
        return a-b;
    }
}
function multiply(a,b) {
    if (Number.isFinite(parseFloat(a)) === false || Number.isFinite(parseFloat(b)) === false) {
        return screen.textContent = storedValue[0];
    } else {
        return a*b;
    }
}
function divide(a,b) {
    if (Number.isFinite(parseFloat(a)) === false || Number.isFinite(parseFloat(b)) === false) {
        return screen.textContent = storedValue[0];
    } else if (b === 0) {
        return screen.textContent = 'Error!';
    } else {
        return a/b;
    }
}
function findFactorial(factorial) {
    let multiply = 1;
	if ((factorial > 150) || (Number.isFinite(factorial) === false)) {
		return screen.textContent = 'Large Number';
	} else if (typeof factorial !== 'number') {
		return screen.textContent = storedValue[0];
	} else {
		for (; factorial !== 0; factorial--) {
			multiply *= factorial;
		}
		return ((multiply)*10)/10;
	}
}
/*Function calls operator function*/
function getOperatorTwo(operatorFunction) {
    storedValue.push(parseFloat(screen.textContent));
    screen.textContent = '';
    result = operatorFunction((storedValue[storedValue.length-2]), (storedValue[storedValue.length-1]));
    screen.textContent = result;
    storedValue.push(parseFloat(screen.textContent));
    storedValue.push('clear');
    storedOperator = [];
}

/*Function to check operator type and assign type operator function*/
function getOperatorFunction() {
    if (storedOperator[storedOperator.length-1] === '+') {
            getOperatorTwo(add);
    } else if (storedOperator[storedOperator.length-1] === '-') {
            getOperatorTwo(subtract);
    } else if (storedOperator[storedOperator.length-1] === '×') {
            getOperatorTwo(multiply);
    } else if (storedOperator[storedOperator.length-1] === '÷') {
            getOperatorTwo(divide);
    } else {
        if (storedOperator[storedOperator.length-1] !== 'string') {
            return;
        }
    }
}
/*Function push screen display number and operator type to array*/
function pushOperator(symbol) {
    storedValue.push(parseFloat(screen.textContent));
    storedValue.push(symbol);
    storedOperator.push(symbol);
}
/*Function to populate screen with numbers from buttons*/
function populateScreen(e) {
    if (display[display.length-1] === '=' || display[display.length-1] === '!n') {
		calcDisplay.textContent = '';
	}
    display.pop();
    screen.textContent = '';
    storedValue.pop();
    screen.textContent += e.target.textContent;
    calcDisplay.textContent += e.target.textContent;
    screenLength.push(screen.textContent);
	countScreenLength();
}
/*Button function to respond under certain conditions*/
function numberBtn(e,a){
    if (e.target.textContent === a && typeof storedValue[storedValue.length-1] === 'string') {
        populateScreen(e);
    } else {
        if (e.target.textContent === a) {
            screen.textContent += e.target.textContent;
            calcDisplay.textContent += e.target.textContent;
            screenLength.push(screen.textContent);
            countScreenLength();

        }
    }
}
/*This is just to remove repeated code*/
function operatorAction(symbol) {
    calcDisplay.textContent += symbol;
    display.push(symbol);
    getOperatorFunction();
    storedValue = [];
    pushOperator(symbol);
}
/*For operating numbers with decimals*/
function addDecimal(e) {
    if (e.target.textContent === '.' && typeof storedValue[storedValue.length-1] === 'string') {
		screen.textContent = '0';
		storedValue.pop();
		screen.textContent += e.target.textContent;
		calcDisplay.textContent += e.target.textContent;
	} else if (e.target.textContent === '.' && (screen.textContent).indexOf('.') >= 0) {
		return;
	} else {
		if (e.target.textContent === '.' && screen.textContent !== '') {
			screen.textContent += e.target.textContent;
			calcDisplay.textContent += e.target.textContent;
		} else if (e.target.textContent === '.' && screen.textContent === '') {
			screen.textContent = '0';
			calcDisplay.textContent = '0';
			screen.textContent += e.target.textContent;
			calcDisplay.textContent += e.target.textContent;
		}
	}
}
/*Backspace function to clear each number*/
function clearNumber(e) {
    if (e.target.textContent === 'Delete') {
        screenLength.pop();
        backspace = [];
        backspace = [...screen.textContent+''];//push numbers on screen to array
        backspace.pop(backspace[backspace.length-1]);
        result = backspace.toString();
        toStrings = result.replace(/,/g, '');
        screen.textContent = '';
        screen.textContent = toStrings;
    }
}

function countScreenLength() {
	if (screenLength.length > 20) {
		screenLength.pop();
		screen.textContent = 'Large Number';
		setTimeout(function() {
			let display = screenLength[screenLength.length-1];
			screen.textContent = display;
		}, 1500);
	}
}

/*Operator function uses all the above function for its logic*/
function operator(e) {
    /*Operator action*/
    if (e.target.value === '-') {
        operatorAction('-');
    } else if (e.target.value === '+') {
        operatorAction('+');
    } else if (e.target.value === '÷') {
        operatorAction('÷');
    } else if (e.target.value === '×') {
        operatorAction('×');
    } else if (e.target.value === '!n') {
        calcDisplay.textContent += ' !n ';
		display.push('!n');
		if (screen.textContent === 'Infinity' || screen.textContent === 'Large Number' || screen.textContent === 'Syntax Error' || screen.textContent === NaN) {
			return screen.textContent = 'Syntax Error';
		} else {
			storedValue.push(parseFloat(screen.textContent));
			screen.textContent = '';
			result = findFactorial(storedValue[storedValue.length-1]);
			screen.textContent = result;
			storedValue.push(parseFloat(screen.textContent));
			storedValue.push('-');
		}
	} else if (e.target.value === '=') {
        calcDisplay.textContent += ' Answer ';
        display.push('=');
        getOperatorFunction();
    }
    /*For floating number*/
    addDecimal(e);

    /*Button action*/
    numberBtn(e,'1');
    numberBtn(e,'2');
    numberBtn(e,'3');
    numberBtn(e,'4');
    numberBtn(e,'5');
    numberBtn(e,'6');
    numberBtn(e,'7');
    numberBtn(e,'8');
    numberBtn(e,'9');
    numberBtn(e,'0');

    /*Clears each digit on button click*/
    clearNumber(e);
}
/*Event listeners*/
buttonContainer.addEventListener('click', operator);
clearButton.addEventListener('click', () => {
    screen.textContent = '';
    storedValue = [];
    storedOperator = [];
    screenLength = [];
});