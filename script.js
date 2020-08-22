//grab all buttons and display and store in variables
const equals = document.getElementById('equals');
const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');
const decimalBtn = document.getElementById('decimal');
const clearBtn = document.getElementById('clear');
const allClearBtn = document.getElementById('all-clear');
const polarityBtn = document.getElementById('+/-');
const btn0 = document.getElementById('0');
const btn1 = document.getElementById('1');
const btn2 = document.getElementById('2');
const btn3 = document.getElementById('3');
const btn4 = document.getElementById('4');
const btn5 = document.getElementById('5');
const btn6 = document.getElementById('6');
const btn7 = document.getElementById('7');
const btn8 = document.getElementById('8');
const btn9 = document.getElementById('9');
const disp = document.getElementById('display');
disp.textContent = '0';
const maxDispLength = 14;

// Initialize operands and operator
let operand1;
let operand2;
let operator;
let operand1Set = false;
let operand2Set = false;
let operand2Begun = false;
let operationComplete = false;

//all the operations as functions
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
    if(b === 0) {
        return 'ERROR,DIVby0';
    } else {
        return a/b; 
    }
}
//limit length of result with rounding/length restriction 

//Digit button responses
const digits = document.querySelectorAll('.digit-btn');
const digitsArray = Array.from(digits);

for (i=0; i<digitsArray.length; i++) {
    digitsArray[i].addEventListener('click', pressDigit);
}

function pressDigit(e) {
    switch(true) {
        case disp.textContent.length >= maxDispLength && !operand1Set:
            break;
        case operand1Set && disp.textContent === 'NaN' || disp.textContent === 'ERROR,DIVby0' || operationComplete:
            operationComplete = false;
            operand1Set = false;
            disp.textContent = e.target.textContent;
            break;  
        case !operand1Set && disp.textContent === '0':
            disp.textContent = e.target.textContent;
            break;
        case !operand1Set && disp.textContent !== '0':
            disp.textContent += e.target.textContent;
            break;
        case operand1Set && !operand2Begun:
            disp.textContent = e.target.textContent;    
            operand2Begun = true;
            break;
        case operand1Set && operand2Begun:
            if (disp.textContent.length >= maxDispLength) {
                break;
            } else {
                disp.textContent += e.target.textContent;    
            }
            break;
        default: 
            return;    
    }
}

//how to ensure disp length is not exceeded
// function fixLength(num) {
    //     const fixed = Number(num.toString().slice(0,maxDispLength));
    //     return fixed;
    // }
    //operator/equals button responses
const operators = document.querySelectorAll('.operator');
const opsArray = Array.from(operators);
    for (i=0; i<opsArray.length; i++) {
        opsArray[i].addEventListener('click', pressOperator);
    }
function pressOperator(e) {
    if (operator === undefined)  {
    //what happens when you press an operator button to start an expression
        operand1 = disp.textContent;
        operand1Set = true;
        operator = e.target.textContent;
    } else if (operator !== undefined && !operationComplete && !operand2Begun) {
    //what happens when you press an operator immediately after pressing an operator (hitting plus twice or hitting plus when you meant minus)
        operator = e.target.textContent;
    } else if (operator !== undefined && !operationComplete && !operand1Set 
        && operand2Begun) {
      
        operand1 = disp.textContent;
        operand1Set = true;
        operator = e.target.textContent;
        operand2Begun = false;
        operand2Set = false;

    } else if (operator !== undefined && !operationComplete && operand1Set 
        && operand2Begun) {
        //what happens when you have typed in a number, an operator, and another number then press another operator. Chaining of operations.  
            operand2 = disp.textContent;
            operand2Set = true;
            operate(operand1, operand2);
            operand2Begun = false;
            operand2Set = false;
    } else if (operator !== undefined && operationComplete) {
    //what happens when you press an operator immediately after pressing equals    
        operationComplete = false;
        operator = e.target.textContent;
        operand2Begun = false;
        operand2Set = false;
    } else if (operationComplete) {
        operationComplete = false;
        operand2Begun = false;
        operand2Set = false;
        operator = e.target.textContent;
    } else {
        console.log('THIS SCENARIO NEEDS ATTENTION');
    }
}

equals.addEventListener('click', operate);

function operate(e) {
    let res;
    if (operand1Set && !operand2Set) {
        operand2 = Number(disp.textContent);
        operand2Begun = true;
        operand2Set = true;
    } else if (!operand1Set && operand2Set) {
        operand1 = Number(disp.textContent);
        operand1Set = true;
    } else if (!operand1Set && !operand2Set) {
        operationComplete = true;
        return;
    }
    let a = Number(operand1);
    let b = Number(operand2);
    switch(operator) {
        case '+': 
            res = add(a,b);
            break;
        case '-':
            res = subtract(a,b);
            break;
        case '*':
            res = multiply(a,b);
            break;
        case '/':
            res = divide(a,b);
            break;
        default:
            return;            
    }
    //if result is too long AND has a decimal AND is NOT scientific notation
    if (res.toString().length > maxDispLength && res.toString().indexOf('.') !== -1 && 
    res.toString().indexOf('e') === -1) {
        const separatedRes = res.toString().split('.');
        const numB4Dec = separatedRes[0];
        const desiredDigAftDec = maxDispLength - (numB4Dec.length + 1); //the +1 accounts for the decimal taking up one index space
        if (desiredDigAftDec < 0) {
            res = res.toExponential(8);
        } else {
            res = +res.toFixed(desiredDigAftDec);
        }
        //result is too long and IS scientific notation
    } else if (res.toString().length > maxDispLength && 
    res.toString().indexOf('e') !== -1) {
        res = res.toExponential(8);
    }
    if (res.toString().length > maxDispLength && res >= (1*(10**maxDispLength)-1) || res <= -(1*10**(maxDispLength - 1)+1)) {
        //convert res to sci notation
        res = res.toExponential(8);
    }
    disp.textContent = res;
    operand1 = res;
}

equals.addEventListener('click', completeOperation);
function completeOperation(e) {
    if (!operationComplete) {
        operationComplete = true;
    } 
}

polarityBtn.addEventListener('click', revPolarity);
function revPolarity(e) {
    if (disp.textContent.indexOf('e') !== -1) {
        disp.textContent = Number(0 - disp.textContent).toExponential();
    } else {
        disp.textContent = 0 - disp.textContent;        
    }
    //Change operand1 or operand2 to be the modified disp.textContent, depending on which one was changed by reversing polarity
    if (operand1Set) {
        operand2 = disp.textContent;
        operand2Set = false;        
    }
}

decimalBtn.addEventListener('click', placeDecimal);
function placeDecimal() {
    if (operationComplete) {
        operationComplete = false;
        operand1Set = false;
        disp.textContent = 0;
    } else if (operand1Set && !operand2Begun) {
        disp.textContent = 0;
        disp.textContent = disp.textContent.concat('.'); 
        operand2Begun = true;
    } else if (operand2Begun && !operand2Set) {
        if (disp.textContent.indexOf('.') === -1) {
            disp.textContent = disp.textContent.concat('.'); 
        }
    }
    if (operator !== undefined && !operand2Begun) {
        disp.textContent = 0;
        disp.textContent = disp.textContent.concat('.'); 
        operand2Begun = true;
    }
    if (disp.textContent.indexOf('.') === -1) {
        disp.textContent = disp.textContent.concat('.');    
    }
}

clearBtn.addEventListener('click', simpleClear);
function simpleClear() {
    disp.textContent = 0;
    if (operand2Begun) {
        operand2Begun = false;
    }
    //operand1 = 0;
}

allClearBtn.addEventListener('click', fullClear);
function fullClear() {
    disp.textContent = '0';
    operand1 = '';
    operand2 = '';
    operator = undefined;
    operand1Set = false;
    operand2Set = false;
    operand2Begun = false;
    operationComplete = false;
}

document.onkeyup = function(e) {
    console.log(e);
    switch(e.key) {
        case 'Enter':
        case '=':  
            e.preventDefault();
            equals.click();
            break;
        case '+':
            addBtn.click();
            break;
        case '-':
            subtractBtn.click();
            break;
        case '*':
            multiplyBtn.click();
            break;
        case '/':
            divideBtn.click();
            break;
        case '0':
            btn0.click();
            break;
        case '1':
            btn1.click();
            break;  
        case '2':
            btn2.click();
            break;
        case '3':
            btn3.click();
            break;                      
        case '4':
            btn4.click();
            break;
        case '5':
            btn5.click();
            break; 
        case '6':
            btn6.click();
            break;
        case '7':
            btn7.click();
            break;
        case '8':
            btn8.click();
            break;
        case '9':
            btn9.click();
            break;                         
        case 'Backspace':
        case 'c':
            e.preventDefault();
            clearBtn.click();
            break;
        case 'Escape':
        case 'a':
            e.preventDefault();
            allClearBtn.click();
            break;
        case '.':
            decimalBtn.click();
            break;
        case '~':
            polarityBtn.click();
            break;        
        default:
            return;    
    }
  };