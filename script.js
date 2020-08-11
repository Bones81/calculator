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
const maxDispLength = 16;

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
//if divide by 0, display = error msg
    if(b === 0) {
        return 'ERROR, DIV BY 0';
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
        case operand1Set && disp.textContent === 'NaN' || disp.textContent === 'ERROR, DIV BY 0' || operationComplete:
            operationComplete = false;
            operand1Set = false;
            disp.textContent = e.target.textContent;
            console.log(disp.textContent, operand1, operand2, operand1Set, operand2Set, operationComplete);
            break;
        case !operand1Set && disp.textContent === '0':
            disp.textContent = e.target.textContent;
            console.log(disp.textContent);
            break;
        case !operand1Set && disp.textContent !== '0':
            disp.textContent += e.target.textContent;
            console.log(disp.textContent);
            break;
        case operand1Set && !operand2Begun:
            disp.textContent = e.target.textContent;    
            operand2Begun = true;
            console.log(operand1, operator, disp.textContent, operand2Begun);
            break;
        case operand1Set && operand2Begun:
            disp.textContent += e.target.textContent;    
            console.log(operand1, operator, disp.textContent, operand2Begun);
            break;
        default: 
            return;    
    }
}
//how to ensure disp length is not exceeded
function fixLength(num) {
    const fixed = Number(num.toString().slice(0,13));
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
    console.log(operator);
    if (operator === undefined)  {
        operand1 = disp.textContent;
        operand1Set = true;
        operator = e.target.textContent;
        console.log(`op1: ${operand1}, op2: ${operand2}, operator: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
    //this is what happens when you press an operator after pressing the equals button
    } else if (operationComplete) {
        operationComplete = false;
        operand2Set = false;
        operand2Begun = false;
        operator = e.target.textContent;
        console.log(`op1: ${operand1}, op2: ${operand2}, operator: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);

    } else if (operator !== undefined) {
        operator = e.target.textContent;
        operand2Begun = false;
        console.log(`op1: ${operand1}, op2: ${operand2}, operator: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);

    } else if (operator !== undefined && !operationComplete) {
        
    } else {
        operand2 = disp.textContent;
        console.log(`op1: ${operand1}, op2: ${operand2}, operator: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
        operate(operand1, operand2);
        //operand1 = disp.textContent;
        operator = e.target.textContent;
        console.log(`op1: ${operand1}, op2: ${operand2}, operator: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
        //eval expression and set operand1 = resulting disp.textContent
        //then set operator = e.target.textContent
        //set operand1 to disp.textContent and run existing operator on same operand2 as before

    }
}

equals.addEventListener('click', operate);

function operate(e) {
    let res;
    if(operand1Set && !operand2Set) {
        operand2 = Number(disp.textContent);
        operand2Set = true;
        console.log('op1:' + operand1 +', op2:' + operand2);
    } else if (!operand1Set && operand2Set) {
        operand1 = Number(disp.textContent);
        operand1Set = true;
        console.log(operand1, operand2, operator)
    } else if (!operand1Set && !operand2Set) {
        operationComplete = true;
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
    if (res.toString().length > maxDispLength && res.toString().indexOf('.') !== -1) {
        res = fixLength(res);
    }
    

    disp.textContent = res;
    if (!operationComplete) {
        operationComplete = true;
        console.log(operand1, operand2, operator);
    } 
    operand1 = res;
    console.log(`op1: ${operand1}, op2: ${operand2}, operator: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);

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
    }
    if(disp.textContent.indexOf('.') === -1) {
        disp.textContent = disp.textContent.concat('.');    
    }
    console.log(disp.textContent);
}
//simpleClear function on 'C' key
clearBtn.addEventListener('click', simpleClear);
function simpleClear() {
    disp.textContent = 0;
    operand1 = 0;
    console.log(`op1: ${operand1}, op2: ${operand2}, operator: ${operator}, op1Set?: ${operand1Set}, op2Set? ${operand2Set}, op2Begun: ${operand2Begun}, opComplete?: ${operationComplete}`);
}
//full clear on AC button
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
    console.log(disp.textContent);
}

//pressing equals button applies appropriate function to operands

//pressing equals button multiple times repeats last operator and operand2 on newly assigned operand1

//if display.length > however many spaces are available, then {round it to nearest appropriate decimal}

//place commas every three digits in display, if necessary. 

//before grabbing number, must remove any commas, using split/join/toNumber on the string in the display field?

/* Example 
When someone presses '2', '+', '7', '=', '-', '3', '=', '=', 'AC', '=' what should happen?

First, '2':
    Display should replace default value ('0') with '2'. 
    
Next, '+':
    '2' should be stored as operand1.
    Display should stay on '2'.
    Store 'add' as 'operator'.    

Next, '7':
    Display should change to '7'.
    Store '7' as operand2.

Next, '=':

    switch case (operator === 'add')
        Add function should be run with operand1 ('2') and operand2 ('7') as arguments.
        function should return 9.
    Display should change to 9.
    '9' should then be stored as operand1. 

Next, '-' :
    operand1 = Number(disp.textContent). Should become 9 in this case.
    Display should still show '9'
    Store 'subtract' as operator

Next, '3' :
    Display should change to '3'
    Store '3' as operand2.

Next, '=' :
    switch(operator) {}
        case 'subtract' 
            run subtract function(9,3)
            return 9-3;
            break;
        }
    disp should change to '6'
    '6' should then be stored as operand1.

Next, '=' again : 
    switch(operator) {
        case 'subtract': 
            run subtract (6,3)
            return 6-3;
            break;
    }
    disp should change to '3'.
    3 should then be stored as operand1.
        
Next, 'AC' :
    operand1 = "";
    operand2 = "";
    operator = "";
    disp.textContent = '0';    
*/