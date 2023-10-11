const buttons = document.querySelectorAll('.btn');


// Add buttons to the screen on click
buttons.forEach((btn) => {
    let btnValue = btn.textContent;
    if(btnValue == "=") { return; }
    btn.addEventListener('click', () => {
      
        const screenResultValue = document.querySelector('.screen-result').textContent;
        const screenResult = document.querySelector('.screen-result');

        if(isNaN(btnValue)) {
        let operation = screenResultValue.split(" ");
        console.log(operation)
        if(operation.length > 2 && btnValue != ".") {
            let num1 = operation[0];
            let num2 = operation[2];
            let operator = operation[1];
            console.log(num2.slice(-1))
            screenResult.textContent = doTheMath(num1, num2, operator);
        }
        }
        console.log(isNaN(btnValue));
        if(isNaN(btnValue)) { 
            console.log(screenResultValue);
            if(screenResultValue == 0) { return; }
            if(btnValue == ".") { 
                screenResult.textContent += "."; 
                return; 
            }

            let operator = screenResultValue[screenResultValue.length-2];
            if(isNaN(operator) && operator != ".") { 
                let newDisplayScreen = screenResultValue.replace(operator, btnValue);
                console.log("olha só: " + newDisplayScreen)
                screenResult.textContent = newDisplayScreen;
                return;
            }
            screenResult.textContent += ` ${btnValue} `; 
            return 
        }
        if(screenResultValue == 0) { document.querySelector('.screen-result').textContent = btnValue; return;}
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
            return num1 / num2;
    }
}

let str = "babidi";
console.log(str[-1])
