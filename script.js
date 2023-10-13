const buttons = document.querySelectorAll('.btn');
let btns = ["Enter", "Backspace", "*"];
[...buttons].forEach((btn) => btns.push(btn.textContent));
console.log(btns)

// Add numbers to the screen with keys
window.addEventListener("keydown", (e) => { 
    console.log(e.key)
    if(btns.includes(e.key)) {
        if(e.key == "Enter") { 
            document.querySelector('.equal-btn').click(); 
            return;
        }
        if(e.key == "Backspace") {
            document.querySelector('.clear-btn').click();
            return;
        }
        if(e.key == "*") {
            document.querySelector('.multiply-btn').click();
            return;
        }
        buttons.forEach((btn) => {
            if(btn.textContent == e.key) {
                btn.click();
            }
        })        
    }
})


// Add buttons to the screen on click
buttons.forEach((btn) => {
    let btnValue = btn.textContent;
    if(btnValue == "=") { return; }
    
    btn.addEventListener('click', () => {
        
        const screenResultValue = document.querySelector('.screen-result').textContent;
        const screenResult = document.querySelector('.screen-result');
        if(screenResultValue.length == 16 || screenResultValue.length > 38) {
            let operation = screenResultValue.split(" ");
            console.log(screenResultValue.length);
            console.log(operation[0].length)
            if(!(isNaN(btnValue) && operation[0].length >= 16 || screenResultValue >= 38)) { return; } 
        }
        if(document.querySelector('.screen-result').textContent == 0 && !(isNaN(btnValue)) && !(screenResultValue.includes("."))) { document.querySelector('.screen-result').textContent = btnValue; return;}

        if(isNaN(btnValue)) {
            if(screenResultValue == "-") { return; }
            let operation = screenResultValue.split(" ");
            if(btnValue == ".") {
                if(operation.length < 2 && operation[0].includes(".")) { return ;}
                if(operation.length >2 && operation[2].includes(".")) { return; }
                screenResult.textContent += ".";
                return;
            }
            

            if(btnValue == "-") {
                if(screenResultValue == "-" || operation.length > 2 && operation[2].includes("-")) { return; }
                if(operation.length < 2 && screenResultValue == 0) { 
                    screenResult.textContent = "-"; 
                    return;
                }
                
                if(operation.length >=2 && operation[2].length == 0) {
                    screenResult.textContent += "-";
                    return;
                }
            }

            if(operation.length > 2 && btnValue != ".") {
                let num1 = operation[0];
                let num2 = operation[2];
                let operator = operation[1];
                screenResult.textContent = doTheMath(num1, num2, operator);
            }

            if(screenResult.textContent == 0) { return; }
            
            let operator = screenResultValue[screenResultValue.length-2];
            if(isNaN(operator) && operator != "." && operation.length >= 2) { 
                let newDisplayScreen = screenResultValue.replace(operator, btnValue);
                screenResult.textContent = newDisplayScreen;
                return;
            }

            screenResult.textContent += ` ${btnValue} `; 
            return; 
        }

        document.querySelector('.screen-result').textContent += btnValue;

    })
})


document.querySelector('.equal-btn').addEventListener('click', () => {
    let operation = document.querySelector('.screen-result').textContent.split(" ");
    let num1= operation[0];
    let num2 = operation[2];
    let operator = operation[1];

    if(operation.length < 3) { return; }
    let result = doTheMath(num1, num2, operator);
    document.querySelector('.screen-result').textContent = result;
})

const doTheMath = (num1, num2, operator) => {
    num1 = Number(num1);
    num2 = Number(num2);
    switch(operator) {
        case "+":
            return num1+num2;;
        case "-":
            return num1-num2;
        case "x":
            return num1 * num2;
        case "/":
            if(num1 == 0 || num2 == 0) {
                return 0;
            }
            return num1 / num2;
    }
}


document.querySelector('.del-btn').addEventListener('click', () => {
    document.querySelector('.screen-result').textContent = "0";
});

document.querySelector('.clear-btn').addEventListener('click', () => {
    let screenResult = document.querySelector('.screen-result');
    if(screenResult.textContent.length <= 1) { 
        screenResult.textContent = '0';
        return;
     }

     let lastChar = screenResult.textContent[screenResult.textContent.length - 2];

     if(isNaN(lastChar) && lastChar != ".") {
        screenResult.textContent = screenResult.textContent.slice(0, -3);
        return;
     }
     
     screenResult.textContent = screenResult.textContent.slice(0, -1);
})