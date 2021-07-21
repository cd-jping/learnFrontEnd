const keyboardContainer = document.querySelector('.number-area','.operational-area');
 
const screen = document.querySelector('#screen').value
 

let previousNumber = '', currentNumber = '', sign = '';

keyboardContainer.addEventListener('click', e => {
    const type = e.target.dataset.type
    console.log(type);

    if (type === 'equal') {
        calculate()
    } else if (type === 'operate') {
        const text = e.target.textContent
        operate(text)
    } else if (type === 'clear') {
        clear()
    } else {
        const text = e.target.textContent
        pushNumber(text)
    }
    updateDisplay()
})

function updateDisplay() {
    document.getElementById('screen').value = currentNumber;
}

function pushNumber(num) {
    currentNumber = currentNumber + num;
}

function operate(text) {
    if (currentNumber === '0') return
    sign = text;
    previousNumber = currentNumber;
    // currentNumber = '';
    switch (sign) {
      
        case '+':
            result = previous + current;
            break;
     }


}
function calculate() {
    let result = 0;
    const previous = Number(previousNumber);
    const current = Number(currentNumber);
    switch (sign) {
      
        case '+':
            result = previous + current;
            break;
        default:
            return;

    }
    currentNumber = result;
    sign = ''; 
}
