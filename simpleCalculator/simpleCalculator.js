class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }
    
    

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return; // Do nothing if there's no current operand
        if (this.previousOperand !== '') {
            this.compute(); // Perform computation if there's already a previous operand and operation
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay(); // Update the display to show the previous operand and the operation symbol
    }
    
    

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
    
        if (isNaN(prev) || isNaN(current)) return;
    
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    computation = 'Error'; // Division by zero
                } else {
                    computation = prev / current;
                }
                break;
            default:
                return;
        }
    
        this.previousOperand = `${prev} ${this.operation} ${current}`; // Update previousOperand with the expression
        this.currentOperand = computation.toString(); // Update currentOperand with the result
        this.operation = undefined; // Clear operation
        this.updateDisplay(); // Update the display
    }
    
    
    
    

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
}
);


allClearButton.addEventListener('click', button => {
    calculator.clear();
}
);

deleteButton.addEventListener('click', button => {
    calculator.delete();
}
);