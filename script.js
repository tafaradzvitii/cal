const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.dataset.number;
        const op = button.dataset.operator;

        if (button.id === 'clear') {
            currentInput = '';
            operator = '';
            previousInput = '';
            display.textContent = '0';
        } 
        else if (button.id === 'equals') {
            if (currentInput && previousInput && operator) {
                let result;
                const prev = parseFloat(previousInput);
                const curr = parseFloat(currentInput);

                switch(operator) {
                    case '+': result = prev + curr; break;
                    case '-': result = prev - curr; break;
                    case '*': result = prev * curr; break;
                    case '/': result = prev / curr; break;
                }

                display.textContent = result;
                currentInput = result;
                operator = '';
                previousInput = '';
            }
        } 
        else if (op) {
            if (currentInput === '') return; // prevent operator first
            if (previousInput !== '') {
                // calculate intermediate result
                let result;
                const prev = parseFloat(previousInput);
                const curr = parseFloat(currentInput);
                switch(operator) {
                    case '+': result = prev + curr; break;
                    case '-': result = prev - curr; break;
                    case '*': result = prev * curr; break;
                    case '/': result = prev / curr; break;
                }
                previousInput = result;
                display.textContent = result;
            } else {
                previousInput = currentInput;
            }
            currentInput = '';
            operator = op;
        } 
        else if (number) {
            if (number === '.' && currentInput.includes('.')) return; // prevent multiple dots
            currentInput += number;
            display.textContent = currentInput;
        }
    });
});
