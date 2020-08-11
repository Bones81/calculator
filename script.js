//grab all buttons and display and store in variables
const equals = document.getElementById('equals');
const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');
const decimalBtn = document.getElementById('decimal');
const clearBtn = document.getElementById('clear');
const allClearBtn = document.getElementById('all-clear');

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
const maxDispLength = 15;

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
        case operand1Set && disp.textContent === 'NaN' || disp.textContent === 'ERROR,DIVby0' || operationComplete:
            operationComplete = false;
            operand1Set = false;
            disp.textContent = e.target.textContent;
            console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
            break;
        case !operand1Set && disp.textContent === '0':
            disp.textContent = e.target.textContent;
            console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
            break;
        case !operand1Set && disp.textContent !== '0':
            disp.textContent += e.target.textContent;
            console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
            break;
        case operand1Set && !operand2Begun:
            disp.textContent = e.target.textContent;    
            operand2Begun = true;
            console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);

            break;
        case operand1Set && operand2Begun:
            disp.textContent += e.target.textContent;    
            console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
            break;
        default: 
            return;    
    }
}
//how to ensure disp length is not exceeded
function fixLength(num) {
    const fixed = Number(num.toString().slice(0,maxDispLength));
    return fixed;
}
//operator/equals button responses
const operators = document.querySelectorAll('.operator');
const opsArray = Array.from(operators);
for (i=0; i<opsArray.length; i++) {
    opsArray[i].addEventListener('click', pressOperator);
}
function pressOperator(e) {
    //what happens when you press an operator button to start an expression
    if (operator === undefined)  {
        operand1 = disp.textContent;
        operand1Set = true;
        operator = e.target.textContent;
        console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
    //this is what happens when you press an operator after pressing the equals button
    } else if (operationComplete) {
        operationComplete = false;
        operand2Set = false;
        operand2Begun = false;
        operator = e.target.textContent;
        console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);

    } else if (operator !== undefined) {
        operator = e.target.textContent;
        operand2Begun = false;
        console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);

    } else if (operator !== undefined && !operationComplete) {
        
    } else {
        operand2 = disp.textContent;
        console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
        operate(operand1, operand2);
        //operand1 = disp.textContent;
        operator = e.target.textContent;
        console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
        //eval expression and set operand1 = resulting disp.textContent
        //then set operator = e.target.textContent
        //set operand1 to disp.textContent and run existing operator on same operand2 as before

    }
}

equals.addEventListener('click', operate);

function operate(e) {
    let res;
    if (operand1Set && !operand2Set) {
        operand2 = Number(disp.textContent);
        operand2Set = true;
        console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
    } else if (!operand1Set && operand2Set) {
        operand1 = Number(disp.textContent);
        operand1Set = true;
        console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
    } else if (!operand1Set && !operand2Set) {
        operationComplete = true;
        console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
        return;
    }
    let a = Number(operand1);
    let b = Number(operand2);
    switch(operator) {
        case '+': 
            res = add(a,b);
            console.log(res);
            break;
        case '-':
            res = subtract(a,b);
            console.log(res);
            break;
        case '*':
            res = multiply(a,b);
            console.log(res);
            break;
        case '/':
            res = divide(a,b);
            console.log(res);
            break;
        default:
            return;            
    }
    //if result is too long AND has a decimal AND is NOT scientific notation
    if (res.toString().length > maxDispLength && res.toString().indexOf('.') !== -1 && 
        res.toString().indexOf('e') === -1) {
            const separatedRes = res.toString().split('.');
            const numB4Dec = separatedRes[0];
            const desiredDigAftDec = maxDispLength - (numB4Dec.length + 1);
            res = +res.toFixed(desiredDigAftDec);
            //res = fixLength(res);
    //result is too long and IS scientific notation
    //means we need to shorten the length of res but keep everything from the e to the end of res
    //so, we need to res.toString(), excise a number of digits before e (splice?), and join the two fragments of the stringified res
    } else if (res.toString().length > maxDispLength && 
    res.toString().indexOf('e') !== -1) {

    }
    if (res > 999999999999999 || res < -999999999999999) {
        disp.textContent = "EXTREME";
    } else {
    disp.textContent = res;
    }

    if (!operationComplete) {
        operationComplete = true;
        console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
    } 
    operand1 = res;
    console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);

}
// //how to remove commas from display 
// function convertDisplay() {
//     commasRmvd = Number(disp.textContent.replace(/,/g,''));
//     return commasRmvd;
// }

//how to chain operations

//when to enable/disable decimal button function
decimalBtn.addEventListener('click', placeDecimal);
function placeDecimal() {
    if (operationComplete) {
        operationComplete = false;
        operand1Set = false;
        disp.textContent = 0;
    } else if (!operand2Set && operand2Begun) {
        if (disp.textContent.indexOf('.') === -1) {
            disp.textContent = disp.textContent.concat('.'); 
        }
    }
    if (operator !== undefined && !operand2Begun) {
        disp.textContent = 0;
        disp.textContent = disp.textContent.concat('.'); 
        operand2Set = false;
        operand2Begun = true;
    }
    if (disp.textContent.indexOf('.') === -1) {
        disp.textContent = disp.textContent.concat('.');    
    }
    console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
}
//simpleClear function on 'C' key
clearBtn.addEventListener('click', simpleClear);
function simpleClear() {
    disp.textContent = 0;
    if (operand2Begun) {
        operand2Begun = false;
    }
    //operand1 = 0;
    console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
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
    console.log(`op1: ${operand1}, op2: ${operand2}, op: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
}


//if display.length > however many spaces are available, then {round it to nearest appropriate decimal}

//place commas every three digits in display, if necessary. 

//before grabbing number, must remove any commas, using split/join/toNumber on the string in the display field?