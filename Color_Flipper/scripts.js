const colorJsonFile = 'color_lists_v1.json'
const clickMeBtn = document.getElementById('click-me-btn');
const bodyElement = document.body;
const colorName = document.querySelector('.color-name-container');
const colorHaxValue = document.querySelector('.hex-value-container');

fetch(colorJsonFile)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network Error');
        }
        return response.json();
    })
    .then(data => {

        window.onload = () => {
            console.log("hello world")
            changeBackgroundColor(data)
        }

        clickMeBtn.addEventListener('click', () => {
            changeBackgroundColor(data)
        })
    })
    .catch(error => {
        console.log('Error : ', error)
    })

function countColorList(colorList) {
    const colorKeysArray = []
    for (const key in colorList) {
        colorKeysArray.push(key)
    }
    console.log(colorKeysArray.length)
    return colorKeysArray;
}

clickMeBtn.addEventListener('mouseover', (event) => {
    const positionX = (event.pageX - clickMeBtn.offsetLeft);
    const positionY = (event.pageY - clickMeBtn.offsetTop);
    clickMeBtn.style.setProperty('--x-pos', positionX + 'px');
    clickMeBtn.style.setProperty('--y-pos', positionY + 'px');
})

function changeBackgroundColor(jsonData) {
    const colorArray = countColorList(jsonData);
    const randomColorKey = Math.floor(Math.random() * colorArray.length);
    const colorKeyHaxValue = jsonData[randomColorKey]["hex_value"];
    const colorKeyName = jsonData[randomColorKey]["color_name"];
    bodyElement.style.backgroundColor = colorKeyHaxValue;
    colorName.textContent = colorKeyName;
    colorHaxValue.textContent = colorKeyHaxValue;
    console.log(colorKeyHaxValue);
    console.log(colorKeyName);
}

