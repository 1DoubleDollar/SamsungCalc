const input = document.querySelectorAll('input');
input.forEach((e)=>{e.addEventListener('click',() => {
    if(e.id === 'equalTo')
    {   e.style.backgroundColor = "rgb(0,251,0)";
        e.style.transform = "scale(0.9)";
        setTimeout(() => {
            e.style.transform= "scale(1)";
            e.style.backgroundColor = "rgb(0, 202, 0)";
        }, 100);
    }
    else if(e.id=== 'backspace')
    {  
        e.style.backgroundColor = "#4e4e4e";

        e.style.transform = "scale(0.9)";
        setTimeout(() => {
            e.style.background = "transparent";
            e.style.transform= "scale(1)";
        }, 100);
    }
    else if(e.id === 'evalution')
    {
        e.background= "black";
        
    }
    else
    {   e.style.backgroundColor = "#4e4e4e";
        e.style.transform = "scale(0.9)";
        setTimeout(() => {
            e.style.transform= "scale(1)";
            e.style.backgroundColor = "#212121";
        }, 100);
    }
    })
});

// functioning code starts from here

let firstOperand = ''
let secondOperand = ''
let currentOperation =null
let resetScreens = false
let lastOperation = true;
let stop = false

const numberButtons = document.querySelectorAll("[data-number]")
const operatorButtons = document.querySelectorAll("[data-operator]")
const equalButton = document.getElementById('equalTo')
const pointButton = document.getElementById('decimal')
const clearButton = document.getElementById('clear')
const deleteButton = document.getElementById('backspace')
const evaluationScreen = document.getElementById('evalution')
const currentAnswerScreen = document.getElementById('current-answer')

window.addEventListener("keydown",handleKey)
equalButton.addEventListener("click",show)
deleteButton.addEventListener("click",backspace)
clearButton.addEventListener("click",clear)
pointButton.addEventListener("click",appendPoint)
numberButtons.forEach((button)=>{
    button.addEventListener("click",(button)=>{
        appendNumber(button.target.value)
    })
})
operatorButtons.forEach((button)=>{
    button.addEventListener("click",(button)=>{setOperation(button.target.value)})
})

function appendNumber(value)
{   if(resetScreens)
    {   resetScreens =false
        evaluationScreen.style.color = 'white';
        clear()
    }
    evaluationScreen.textContent+=value
    lastOperation =false;
    if(evaluationScreen.textContent!= '')
        evaluate()
}
function clear(){
    evaluationScreen.textContent=''
    currentAnswerScreen.textContent=''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}
function backspace(){

    evaluationScreen.style.color = 'white';
    evaluationScreen.textContent = evaluationScreen.textContent.slice(0,-1)
    if(evaluationScreen.textContent!= '')
        {  evaluate()}
    else
        {currentAnswerScreen.textContent= ''}
}
function setOperation(value){
    if(resetScreens)
    {   resetScreens =false
        evaluationScreen.style.color = 'white';
    }
    if(evaluationScreen.textContent == '')
        alert("Invalid format");
    else if(lastOperation)
    {
        backspace()
        evaluationScreen.textContent+=value
    }
    else{
        currentOperation = value
        evaluationScreen.textContent+=value
        lastOperation = true;
    }   
}
function appendPoint(){
    if(evaluationScreen.textContent=='' || evaluationScreen.textContent.at(-1) == currentOperation){
        evaluationScreen.textContent+='0.'}
    else{
        let i = -1;
        let check = false;
        while(evaluationScreen.textContent.at(i) != currentOperation )
        {
            if(evaluationScreen.textContent.at(i)=='.'){
                console.log("Invalid point")
                check=true;
                break;
            }
            i--;
        }
        if(!check){
            evaluationScreen.textContent+='.'
        }
    }
}
function show(){
    if(!stop && currentOperation != null){
        setTimeout(()=>{
            evaluationScreen.textContent=currentAnswerScreen.textContent
            currentAnswerScreen.textContent=''
            currentOperation = null
            stop=true;
            evaluationScreen.style.color = 'rgb(0, 202, 0)';
            resetScreens=true;
            currentAnswerScreen.classList.remove('animate')
        },100)
        currentAnswerScreen.classList.add('animate')
    }
    else
    stop =false;
}

function evaluate(){
    if(currentOperation == '%' )
    {   evaluationScreen.textContent.replace('%','*0.01*')
        currentAnswerScreen.textContent=eval(evaluationScreen.textContent)
    }
    else if(currentOperation != null && !lastOperation)
        currentAnswerScreen.textContent=eval(evaluationScreen.textContent)

}

function handleKey(e){
    if(e.key>=0 && e.key<=9)
        appendNumber(e.key)
    if(e.key== '+' || e.key== '-' || e.key== '*' || e.key== '/'|| e.key == '%')
        setOperation(e.key)
    if(e.key== '.')
        appendPoint()
    if(e.key=== 'Backspace')
        backspace()
    if(e.key == 'Enter')
        show()
    if(e.key== 'Escape')
        clear()
    if(e.key== '.')
        appendPoint()
}