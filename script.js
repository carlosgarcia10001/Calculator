const equation = {
    numbers: [],
    operators: [],
    inputNumber: ''
}
const screenValue = document.querySelector('#screenValue');
const numbers = document.getElementsByClassName('number');
const operators = document.getElementsByClassName('operator');
const cleared = document.querySelector('#clear');
const equals = document.getElementById('operate');
const backSpace = document.getElementById('backSpace');
const decimal = document.querySelector('#decimal');
function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

/*
Step 1: Locate which operator to evaluate first using order of operations
Step 2: Preform evaluation on the number that is held within the same index, and the index following it. 
Save value within the first index and delete the 2nd index used
Step 3: Repeat until operator array is empty
*/
function findMultiplyOrDivide(element, index, array){
    return element == '*' || element == '/';
}
function findAddOrSubtract(element, index, array){
    return element == '+' || element == '-'
}
function operate(){
    decimal.disabled=false;
    if(equation.inputNumber!=''){
        if(equation.operators.length==0){
            equation.numbers.pop();   
        }
        equation.numbers.push(Number(equation.inputNumber));
        equation.inputNumber='';
    }
    while(equation.operators.length!=0)
    {
        let value;
        const hasMultiplicationOrDivison = equation.operators.findIndex(findMultiplyOrDivide);
        const hasAdditionOrSubtraction = equation.operators.findIndex(findAddOrSubtract);
        if(hasMultiplicationOrDivison!=-1){
            switch(equation.operators[hasMultiplicationOrDivison]){
                case '*':
                    value = multiply(equation.numbers[hasMultiplicationOrDivison],equation.numbers[hasMultiplicationOrDivison+1]);
                    break;
                case '/':
                    if(equation.numbers[hasMultiplicationOrDivison+1]==0){
                        screenValue.textContent = 'ERROR';
                        backEndClear();
                        return;
                    }
                    else{
                        value = divide(equation.numbers[hasMultiplicationOrDivison],equation.numbers[hasMultiplicationOrDivison+1]);         
                    }
                    break;
            }
            equation.numbers[hasMultiplicationOrDivison]=value;
            equation.numbers.splice(hasMultiplicationOrDivison+1,1);
            equation.operators.splice(hasMultiplicationOrDivison,1);
        }
        else if(hasAdditionOrSubtraction!=-1){
            switch(equation.operators[hasAdditionOrSubtraction]){
                case '+':
                    value = add(equation.numbers[hasAdditionOrSubtraction],equation.numbers[hasAdditionOrSubtraction+1]);
                    break;
                case '-':
                    value = subtract(equation.numbers[hasAdditionOrSubtraction],equation.numbers[hasAdditionOrSubtraction+1]);
                    break;
            }
            equation.numbers[hasAdditionOrSubtraction]=value;
            equation.numbers.splice(hasAdditionOrSubtraction+1,1);
            equation.operators.splice(hasAdditionOrSubtraction,1);
        }
    }
    
    if(!isNaN(equation.numbers[0])){
        if(equation.numbers[0]!=equation.numbers[0].toFixed(4))
        {
            equation.numbers[0]=Number(equation.numbers[0].toFixed(4));
        }
        screenValue.textContent=equation.numbers[0];
    }
    else{
        screenValue.textContent="ERROR";
        backEndClear();
    }
}
function parseNumberAndOperator(e){
    if(equation.inputNumber!=''){
    equation.numbers.push(Number(equation.inputNumber));
    }
    equation.operators.push(e.target.textContent);
    console.log("Operators: " + equation.operators); 
    console.log("Numbers: " + equation.numbers);  
    equation.inputNumber=''; 
    decimal.disabled=false;
}

function parseNumberAndOperatorKey(e){
    switch(e.key){
    case '*':
    case '/':
    case '+':
    case '-': 
        if(equation.inputNumber!=''){
            equation.numbers.push(Number(equation.inputNumber));
        }
            equation.operators.push(e.key);
            console.log("Operators: " + equation.operators); 
            console.log("Numbers: " + equation.numbers);  
            equation.inputNumber=''; 
            decimal.disabled=false;    
            break;
    case '=':
    case 'Enter':
        console.log(e.key);
        operate();
        break;
    }    
}

function inputNumber(e){
    if(equation.operators.length==0 && equation.numbers.length==1 && equation.inputNumber!=''){
        equation.numbers.pop();
    }
    if(e.target.textContent=='.'){
        decimal.disabled=true;
    }
    equation.inputNumber+=e.target.textContent;
    screenValue.textContent=equation.inputNumber;
}
function inputNumberKey(e){
    if(decimal.disabled==true && e.key=='.'){
        return;
    }
    if(equation.operators.length==0 && equation.numbers.length==1 && equation.inputNumber!=''){
        equation.numbers.pop();
    }
    if(e.key=='.'){
        decimal.disabled=true;
    }
    else if(isNaN(e.key)){
        return;
    }
    if(e.code!='Space'){
        equation.inputNumber+=e.key;
        screenValue.textContent=equation.inputNumber;
    }
}
function backEndClear(){
    equation.numbers = [];
    equation.operators = [];
    equation.inputNumber = '';
    decimal.disabled=false;
}
function fullClear(){
    backEndClear();
    screenValue.textContent=0;
}
function back(){
    equation.inputNumber = equation.inputNumber.substring(0,equation.inputNumber.length-1);
    if(equation.inputNumber.indexOf('')==-1){
        decimal.disabled=false;
    }
    if(equation.inputNumber==''){
        fullClear();
    }
    else{
    screenValue.textContent=equation.inputNumber;
    }    
}
cleared.addEventListener('click',fullClear);
for(let i = 0; i < operators.length;i++){
    operators[i].addEventListener('click',parseNumberAndOperator);
}
for(let i = 0; i < numbers.length;i++){
    numbers[i].addEventListener('click',inputNumber);
}
equals.addEventListener('click',operate);
backSpace.addEventListener('click',back);
decimal.addEventListener('click',inputNumber);
document.addEventListener('keypress',inputNumberKey);
document.addEventListener('keypress',parseNumberAndOperatorKey);