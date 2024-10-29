const currentNumber = document.getElementById('number-holder');
const decreaseBtn = document.getElementById('decrease-btn');
const resetBtn = document.getElementById('reset-btn');
const increaseBtn = document.getElementById('increase-btn');

increaseBtn.addEventListener('click', () => {
    let newNumber = Number(currentNumber.textContent);
    newNumber = newNumber + 1;
    currentNumber.textContent = newNumber.toString();
    colorChange(newNumber);
})

decreaseBtn.addEventListener('click', () => {
    let newNumber = Number(currentNumber.textContent);
    newNumber = newNumber - 1;
    currentNumber.textContent = newNumber.toString();
    colorChange(newNumber);
})

resetBtn.addEventListener('click', () => {
    currentNumber.textContent = '0';
    currentNumber.style.color = "#000";
})

function colorChange(currentNum) {
    if (currentNum > 0) {
        currentNumber.style.color = "#43e5a0";
    } else if (currentNum < 0) {
        currentNumber.style.color = "#fc6e51";
    } else {
        currentNumber.style.color = "#000";
    }
}