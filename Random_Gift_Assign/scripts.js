const addPersonBtn = document.getElementById('add-person-btn');
const assignGiftBtn = document.getElementById('assign-gift-btn');
const shuffleGiftBtn = document.getElementById('shuffle-gift-btn');
const resetGiftBtn = document.getElementById('reset-gift-btn');
const personNameInput = document.getElementById('input-field');
const personContainerField = document.querySelector('.person-container');

const gifts = ['Visa Gift Card', 'Money', 'Toys', 'Wine', 'Starbucks Gift Card', 'Roblox Gift Card', 'Clothes',
    'Art And Craft', 'Yarns'];

let isBtnClicked = false;

addPersonBtn.addEventListener('click', function () {
    let personName = personNameInput.value;
    addPerson(personName);
    console.log(personName)
})

// Add Person Function
function addPerson(personName) {
    const personNameContainer = document.createElement('p');
    personNameContainer.classList.add('person-name')
    const giftPlaceHolder = document.createElement('span');
    giftPlaceHolder.classList.add('gift-class');
    giftPlaceHolder.textContent = 'No Gift Assign';
    personNameContainer.textContent = `${personName} - `;
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'remove-btn');
    removeBtn.textContent = 'Remove';
    personContainerField.appendChild(personNameContainer);
    personNameContainer.appendChild(giftPlaceHolder);
    personNameContainer.appendChild(removeBtn);
}

assignGiftBtn.addEventListener('click', function () {
    isBtnClicked = !isBtnClicked;
    if (isBtnClicked) {
        assignRandomGift();
    } else {
        alert('Gift is already assigned.');
    }
})

// Give person random gift
function assignRandomGift() {
    // const getPersonName = document.querySelectorAll('.person-name');
    const personGift = document.querySelectorAll('.gift-class');
    for (let i = 0; i < personGift.length; i++) {
        personGift[i].textContent = `Gift: ${giveGift(gifts)}`;
    }
}

shuffleGiftBtn.addEventListener('click', function () {
    if (isBtnClicked) {
        assignRandomGift();
    } else {
        alert('You have to assign gift first.');
    }
})

function resetGifts() {
    // const getPersonName = document.querySelectorAll('.person-name');
    const personGift = document.querySelectorAll('.gift-class');
    for (let i = 0; i < personGift.length; i++) {
        personGift[i].textContent = 'No Gift Assign';
    }
}

resetGiftBtn.addEventListener('click', function () {
    resetGifts();
})

// Return random gift from list
const giveGift = function (giftList) {
    // Math.floor(Math.random() * 10) is inclusive meaning it will only give 0 - 10, 10 will not be included
    let randomIndex = Math.floor(Math.random() * giftList.length);
    return giftList[randomIndex];
}

personContainerField.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-btn')) {
        const personParentElement = event.target.parentElement;
        personParentElement.remove();
    }
})
