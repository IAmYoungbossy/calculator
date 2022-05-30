/*Caching DOM*/
const screen = document.querySelector('#screen1');
const screen2 = document.querySelector('#screen2');
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
let zeroDefault = [];
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
function assignOperator(operate) {//formerly getOperatorTwo
    storedValue.push(parseFloat(screen.textContent));
    screen.textContent = '';
    result = operate((storedValue[storedValue.length-2]), (storedValue[storedValue.length-1]));
    screen.textContent = result;
    storedValue.push(parseFloat(screen.textContent));
    storedValue.push('clear');
    storedOperator = [];
}
/*Function to check operator type and assign type operator function*/
function getOperator() {//formerly getOperatorFunction
    if (storedOperator[storedOperator.length-1] === '+') {
            assignOperator(add);
    } else if (storedOperator[storedOperator.length-1] === '-') {
            assignOperator(subtract);
    } else if (storedOperator[storedOperator.length-1] === '×') {
            assignOperator(multiply);
    } else if (storedOperator[storedOperator.length-1] === '÷') {
            assignOperator(divide);
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
function getAnswer(e) {//formerly populateScreen
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
        getAnswer(e);
    } else {
        if (e.target.textContent === a) {
            screen.textContent += e.target.textContent;
            calcDisplay.textContent += e.target.textContent;
            screenLength.push(screen.textContent);
            zeroDefault.push(a)
            countScreenLength();

        }
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
            zeroDefault.unshift('.');
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
        zeroDefault.pop();
        if (zeroDefault.length < 1) {
            screen2.textContent = '0';
        }
		backspace = [];
		screenDisplay = []; //
		backspace = [...screen.textContent+'']//.map(n=>+n)
		screenDisplay = [...calcDisplay.textContent+'']; //
		backspace.pop(backspace[backspace.length-1]);
		screenDisplay.pop(screenDisplay[screenDisplay.length-1]); //
		result = backspace.toString();
		displayResult = screenDisplay.toString(); //
		toString = result.replace(/,/g, '');
		displayToStrings = displayResult.replace(/,/g, ''); //
		screen.textContent = '';
		calcDisplay.textContent = ''; //
		screen.textContent = toString;
		calcDisplay.textContent = displayToStrings;
    }
}

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
			result = findFactorial(parseInt(storedValue[storedValue.length-1]));
			screen.textContent = result;
			storedValue.push(parseFloat(screen.textContent));
			storedValue.push('-');
		}
	} else if (e.target.value === '=') {
        calcDisplay.textContent += ' Answer ';
        display.push('=');
        getOperator();
    }

    /*Button action*/
    let i = 0;
    for(; i < 10; i++){
        numberBtn(e, `${i}`);
    }
    numberBtn(e, `${i}`);

    /*For floating number*/
    addDecimal(e);

    if (zeroDefault.length > 0) {
        screen2.textContent = '';
    }
    if (e.target.textContent === '.') {
        zeroDefault.push('.')
        screen2.textContent = '';
    }

    /*Clears each digit on button click*/
    clearNumber(e);
}

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


/*Event listeners*/
buttonContainer.addEventListener('click', operator);
clearButton.addEventListener('click', () => {
    clearAll();
});