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

// const countryName = "united States of America"

// Countries REST API

// function getCurrency(countryCurrency) {
//     object
// }

function countryData(apiData) {
    commonName.textContent = apiData['name']['common'];
    officialName.textContent = apiData['name']['official'];

    // const borders = apiData['borders'];
    // if (borders) {
    //     borderCountries.textContent = `${objectValue(borders)}`
    // } else {
    //     borderCountries.textContent = 'None';
    // }


    capitalName.textContent = apiData['capital'][0];
    console.log(apiData['capital'][0])
    continent.textContent = apiData['continents'][0];
    const currency = apiData['currencies'];

    Object.keys(currency).forEach(key => {
        currencies.textContent = currency[key].name;
        // console.log(name)
    })
    // console.log(`${objectValue(currency)}`)
    // const flag = apiData['flags']["png"];
    countryFlag.src = apiData['flags']['png']
    countryFlag.alt = apiData['flags']['alt']
    // const languages = apiData['languages'];
    language.textContent = `${objectValue(apiData['languages'])}`;
    // Object.keys(languages).forEach(language => {
    //     const languageName = languages[language];
    //     console.log(languageName)
    // })
    // console.log(`${objectValue(apiData['languages'])}`)

    // const population = apiData['population'];
    const rawPopulation = apiData['population'];
    population.textContent = new Intl.NumberFormat('en-US').format(rawPopulation);

    if (apiData['coatOfArms']['png']) {
        coatOfArms.src = apiData['coatOfArms']['png'];
        coatOfArms.alt = `Coat of Arms of ${apiData['name']['official']}`;
    } else {
        coatOfArms.src = apiData['flags']['png']
        coatOfArms.alt = `Coat of Arms of ${apiData['name']['official']}`;
    }


    // console.log(countryName)
    // console.log(officialName)
    // // console.log(countryBorders)
    // console.log(capital)
    // console.log(continents)
    // // console.log(currency)
    // // getCurrency(currency)
    // console.log(flag)
    // // console.log(languages)
    // console.log(population)

}

function fetchBorderCountriesCode(apiData) {
    const borders = apiData['borders'];
    // let borderCodes = '';
    // if (borders) {
    //     borderCodes = `${objectValue(borders)}`
    // } else {
    //     borderCodes = 'None';
    //     console.log(`This is failed : ${borderCodes}`)
    // }
    // return borderCodes;
    return borders ? `${objectValue(borders)}` : 'None'
}

function objectValue(object) {
    const valueArray = [];
    Object.keys(object).forEach(key => {
        valueArray.push(object[key]);
    })
    return valueArray;
}


//
// let countryNameSearch = 'name';
//
// searchBtn.addEventListener('click', () => {
//     countryNameSearch = countryToSearch.value;
//     // console.log(`${countryNameSearch} this is  em`);
//     return countryNameSearch;
// })
//
// console.log(`${countryNameSearch} this is  em`);


