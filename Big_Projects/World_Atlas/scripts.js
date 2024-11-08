// html elements
const countryToSearch = document.getElementById('search-input');
const searchBtn = document.querySelector('.search-btn');
// let countryNameSearch = 'united States of America';

const commonName = document.getElementById('common-name');
const officialName = document.getElementById('official-name');
const capitalName = document.getElementById('capital');
const continent = document.getElementById('continent');
const currencies = document.getElementById('currency');
const borderCountries = document.getElementById('border-countries');
const population = document.getElementById('population');
const language = document.getElementById('language');
const countryFlag = document.getElementById('country-flag');
const coatOfArms = document.getElementById('coat-of-arms');


// FAQ Section
const questionBlock = document.querySelectorAll('.questions');

function fetchCountry(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network error');
            }
            return response.json()
        })
        .then(data => {
            // console.log(data)
            console.log(data)
            countryData(data[0])
            const codesArray = fetchBorderCountriesCode(data[0])
            console.log(codesArray)
            if (codesArray === 'None') {
                borderCountries.textContent = codesArray;
            } else {
                promiseFetchResult(codesArray).then(borderCodeCountries => {
                    // console.log(borderCodeCountries);
                    borderCountries.textContent = borderCodeCountries.toString();
                }).catch(error => {
                    console.log('Error fetching country codes : ', error)
                })
            }


        })
        .catch(error => {
            console.log('Error : ', error)
        })
}

window.onload = () => {
    const preLoadCountry = 'United States of America';
    fetchCountry(preLoadCountry);
}

function promiseFetchResult(stringOfCodes) {
    return fetchCountryCode(stringOfCodes).then(fetchResult => {
        let borderCountries = '';
        console.log(`The length is: ${fetchResult.length}`);
        for (let i = 0; i < fetchResult.length; i++) {
            borderCountries += fetchResult[i] + ', ';
        }

        return borderCountries.slice(0, -2);
    }).catch(error => {
        console.log('Error fetching country codes : ', error)
    })


}

function fetchCountryCode(countryCodes) {
    const splitCountryCodes = countryCodes.split(',');
    console.log(splitCountryCodes);
    const countryCodeNames = []

    const fetchCodePromise = splitCountryCodes.map(code => {
        const codeApiUrl = `https://restcountries.com/v3.1/alpha/${code}`
        return fetch(codeApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Cannot retrieve code API');
                }
                return response.json()
            })
            .then(data => {
                countryCodeNames.push(data[0]['name']['common'])
            })
            .catch(error => {
                console.log('Error : ', error)
            })
    })

    return Promise.all(fetchCodePromise).then(() => countryCodeNames);
}

searchBtn.addEventListener('click', () => {
    const countryNameSearch = countryToSearch.value;
    fetchCountry(countryNameSearch)

})

function countryData(apiData) {
    commonName.textContent = apiData['name']['common'];
    officialName.textContent = apiData['name']['official'];
    capitalName.textContent = apiData['capital'][0];
    console.log(apiData['capital'][0])
    continent.textContent = apiData['continents'][0];
    const currency = apiData['currencies'];

    Object.keys(currency).forEach(key => {
        currencies.textContent = currency[key].name;
    })
    countryFlag.src = apiData['flags']['png']
    countryFlag.alt = apiData['flags']['alt']
    language.textContent = `${objectValue(apiData['languages'])}`;

    const rawPopulation = apiData['population'];
    population.textContent = new Intl.NumberFormat('en-US').format(rawPopulation);

    if (apiData['coatOfArms']['png']) {
        coatOfArms.src = apiData['coatOfArms']['png'];
        coatOfArms.alt = `Coat of Arms of ${apiData['name']['official']}`;
    } else {
        coatOfArms.src = apiData['flags']['png']
        coatOfArms.alt = `Coat of Arms of ${apiData['name']['official']}`;
    }
}

function fetchBorderCountriesCode(apiData) {
    const borders = apiData['borders'];
    return borders ? `${objectValue(borders)}` : 'None'
}

function objectValue(object) {
    const valueArray = [];
    Object.keys(object).forEach(key => {
        valueArray.push(object[key]);
    })
    return valueArray;
}

questionBlock.forEach((question) => {
    question.addEventListener('click', () => {
        console.log('this is test');
        let parentContainer = question.closest('.faq');
        let answerContainer = parentContainer.querySelector('.faq-answer');
        answerContainer.classList.toggle('hide');
    })
})
